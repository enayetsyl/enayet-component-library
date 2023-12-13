## Frontend code with explanation

- Go to the component where you want to apply infinite scroll and write following code

```javascript

const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
  
    const getProductData = async (page) => {
      const url = `http://localhost:5000/api/v1/allproducts?_limit=9&_page=${page}`;
      try {
        const res = await fetch(url);
    
        const data = await res.json();
        setProductData((prev) => [...prev, ...data]);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
  
    const handleInfiniteScroll = async () => {
      try{
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
          setLoading(true)
          setPage((prev) => prev + 1)
        }
      } catch(error){
        console.log(error)
      }
    }
  
    useEffect(() => {
      getProductData(page)
    },[page])
  
    useEffect(() => {
      window.addEventListener('scroll', handleInfiniteScroll)
      return() => window.removeEventListener('scroll', handleInfiniteScroll)
    },[])
 
```

- Line on is a state that will store data received from the server. Initially it is an empty array.
- Line 2 will hold page number that will be send to the server. Initially its value is set to 1.
- Line 3 is loading state.

- Line 4 is an async function that take page as a parameter and used for loading data from server.
- Line 5 is the url for fetching. It pass two query first one is the limit that tell the server how many data it will send at each request. Second query is the page number. It inform the server the number of page the user is scrolling.
-Line 6 fetch data
- Line 7 make the convert json data received from server.
-Line 8 set data received from server to the productData state. It is used a function to make sure that productData hold earlier data as well as new page data. It is used spread operator to do it. 
- Line 9 make loading state false.
- Line 10 catch any error in data fetching.
- LIne 11 show error in data fetching in console.
- Line 12 is an async callback function that is brief check whether user scroll down to the bottom of the page(not screen). If its true then it makes loading state true and set page number using a function where 1 added with the earlier value in the page state. 
- Line 13 catch error in the process
- Line 14 show error in console log.
- Line 15 is useEffect hook that takes page state as dependency. Each time the value of page state changes the useEffect hook call getProductData function so that new data is fetched from the server. 
- Line 16 is another useEffect hook that employ an event listener and call handleInfiniteScroll function
- Line 17 is a call back function that remove the event listener. 

```javascript

  {
        productData?.map((p, idx) => (
          <Grid 
          key={idx}
          item xs={12} sm={6} md={4} lg={4}>
               <ProductCard2 p={p}/>
      </Grid>
        ))
      }
```

- In the above code the productData state is mapped to show the inner data to the user. 

## Backend code with explanation

```javascript
// FOR ALL PRODUCTS

router.get('/allproducts', async (req, res) => {
  const page = req.query._page || 1;
  const limit = req.query._limit || 9
  try {
    const result = await Product.find() 
    .limit(parseInt(limit))
    .skip((page ) * limit);
    res.send(result);
  } catch (error) {
    console.error('Error fetching produts:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
```
- Now we have to setup backend so send scrolling data to the frontend. 

- this is a get route for all products. 
- Line 2 store page number in page variable. Page number is received from query params. 
- Line 3 is limit variable that store number of data to be sent to the frontend. 
- Line 4 find all data in product collection.
- Line 5 set the limit parameter. In our case it is 9. 
- Line 6 skip the data by multiplying page to limit.
- Line 7 send data to the frontend.
- Line 8 catch any error.
- Line 9 show error in console log.
- Line 10 send error status in front end.