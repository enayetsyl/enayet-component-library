# Infinite scroll using tanstack query.

## ClientSide code with explanation.

- We will use tanstack query and react-infinite-scroll-component for this.
- first install following two packages. 

```javascript
npm i @tanstack/react-query
npm install --save react-infinite-scroll-component
```

- Insert the following code in the component where you want to apply pagination.

```javascript
import { useInfiniteQuery } from "@tanstack/react-query"
import InfiniteScroll from "react-infinite-scroll-component"

const getCards = async ({pageParam = 0}) => {
  const res = await fetch(`http://localhost:5000/api/v1/allproducts?limit=9&offset=${pageParam}`)
  const data = await res.json()
  return { ...data, prevOffset: pageParam}
}

function App() {
  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['card'],
    queryFn: getCards,
    getNextPageParam: (lastPage) => {
      if(lastPage.prevOffset + 9 > lastPage.productCount) {
        return false;
      }
      return lastPage.prevOffset + 1
    }
  })

    const products = data?.pages.reduce((acc,page) => {
      return [...acc, ...page.products]
    },[])

  return (
    <>
    Hello
    <InfiniteScroll
    dataLength={products ? products.length : 0}
    next={() => fetchNextPage()}
    hasMore={hasNextPage}
    loader={<h1 className="text-5xl">Loading...........</h1>}
    endMessage={<p className="text-3xl font-bold">This is the end</p>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          products && products.map((product, index) => (
           <div key={index}
           className="border border-solid border-red-500 space-y-6 flex flex-col justify-center items-center p-5"
           >
             <img src={product.image} alt="" />
             <h1>{product.productTitle }</h1>
            <p>{product.regularPrice}</p>
           </div>
          ))
        }
      </div>
    </InfiniteScroll>
    </>
  )
}

export default App
```

- Line 1 and 2 import necessary items.
- getCards is a async callback function that takes pageParam as a parameter and initially it's value is set to 0. Inside it data is fetch from server which send two query params. First one is limit that set how many data will be fetched each time. In the example it is set to 9. You can change the number as per you requirement. Offset query send the pageParam that tell the server number of pages the user is scrolling and server will send data accordingly. Then using spread operator is used to keep the previous data as well as new fetched data. Also in the prevOffset property the pageParam is also returned.

- Inside the app function there is useInfiniteQuery function. It is initially destructured to get three properties. They are data, fetchNextPage, hasNextPage. They will be later used for data fetching and showing. 
- Inside the useInifinteQuery there is an object that has three property.
- First property is queryKey. Make sure the key is unique and use different key for infinite scroll.
- Second property is queryFn. Its value is getCards function that we wrote earlier. 
- Third property is getNextPageParam. It's value is a callback function. It takes next page as an argument. It check a condition which in brief whether the user reached at the last page. If user does not reach the last page it increment the page number in simple. 

- Data received from the server is stored in products variable. First the reduce function is used to spread the data and then store in the products variable. 

- Inside return InfiniteScroll tag is used. It has lots of attribute. Here we used five. First one is dataLength. It set the length of the data.This will unlock the subsequent calls to next. Second is next attribute. It is a function which must be called after reaching the bottom. It must trigger some sort of action which fetches the next data. The data is passed as children to the InfiniteScroll component and the data should contain previous items too. e.g. Initial data = [1, 2, 3] and then next load of data should be [1, 2, 3, 4, 5, 6]. Third one is hasMore attribute. Its a boolean. It tells the InfiniteScroll component on whether to call next function on reaching the bottom and shows an endMessage to the user. Fourth one is the loader attribute. You can send a loader component to show while the component waits for the next load of data. e.g. <h3>Loading...</h3> or any fancy loader element. Last one is endMessage. This message is shown to the user when he has seen all the records which means he's at the bottom and hasMore is false.

## ServerSide code with explanation.

```javascript
router.get('/allproducts', async (req, res) => {
  const page = req.query.offset;
  const limit = req.query.limit;
  try {
    const [products, productCount] = await Promise.all([
      Product.find().limit(parseInt(limit)).skip((page) * limit),
      Product.countDocuments(), // Count total number of products
    ]);

    res.send({
      products,
      productCount,
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
```

- page and limit variable store the value received from the query params.
- Products and productCount store products data received from database and number of data in the database.
- res.send send data in an object with two property which are products and productCount.
- catch block show and send errors. 