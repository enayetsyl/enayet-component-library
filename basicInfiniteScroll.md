==> Front end code. GO TO COMPONENT WHERE YOU WANT TO APPLY INFINITE SCROLL. IN OUR CASE WE ARE DOING IT IN HOME.JS. PASTE FOLLOWING CODE IN THE COMPONENT

```javascript

import { useEffect } from "react";
import { useState } from "react";


const Home = () => {
  const [product, setProduct] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true)

  const getProductData = async () => {
    const url = `http://localhost:5000/api/v1/allproducts?_limit=9&_page=${page}`;
    try {
      const res = await fetch(url);
  
      const data = await res.json();
      setProduct((prev) => [...prev, ...data]);
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
    getProductData()
  },[page])

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll)
    return() => window.removeEventListener('scroll', handleInfiniteScroll)
  },[])


  return (
    <div>
        <h1>product number: {product.length}</h1>
        <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {
            product && product.map((data, idx) => {
              return(
                <div
                className="bg-slate-200 p-2 border rounded" key={idx}
                > 
                  <img src={data.image} alt="" />
                  <p>{data.productTitle}</p>
                  <p>{data.regularPrice}</p>
                  <p>{data.currentPrice}</p>
                </div>
              )
            })
          }
        </div> 
        {loading && <p> Loading ...............</p>}
    </div>
  );
};

export default Home;

```

- line 5 & 6 import useEffect and useState from react which will be used later.

- line 10 create a useState to store product.
- line 11 create a useState to store page number.
- line 12 create a useState to store loading state.

- line 14-28 is an asyncrionous function. 
- line 15 is the url. It has two query parameter. _limit = 9 set the number of data will be fetched each time. YOU WILL SET YOUR OWN LIMIT HERE. _page provide a dynamic page param to server. 
 
- line 20 set the fetched data to the product state. Here spread operator is used to keep the previous loaded data as well as new fetched data.

- line 21 set the loading state false as we fetched data so no need to loading.

- line 23 will console log any error in fetching data. 

- line 27-36 is an async function to set the page number which will be sent to the server for further data load.

- line 29 check a condition which inner height of viewer window + height to scroll top + 1 is greater than or equal to total scroll height of the document 

- line 30 set loading state true if line 29 condition is true

- line 31 set the page state where 1 added with previous page state value. 

- line 34 console log any error executing the function.

- line 38-40 is an useEffect which call the function written in line 14 and takes a dependency of page state. Whenever the value of page is changed the getProductData function will call. 

- line 42-45 is another useEffect which attache an event listener and inside it call handleInfiniteScroll function of line 27.

- line 44 remove the event listener using a function.

- line 52-65 show the data of product array.

- line 67 show a message if loading state is true. 
