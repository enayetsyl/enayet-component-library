1. create a jsx file inside MainLayout folder and name it DashboardLayout.
2. You can design it like drawer or like navbar as you wish. The page will be divided in two div. one div will show navbar or drawer and another will show outlet.
3. go to router.jsx. Create another object inside createBrowserRouter array. So mainly there will be two object. One will show mainLayout in '/' path and another will show dashboard layout in 'dashboard' path. it will be like as follows

```javascript
  export const router = createBrowserRouter([
    {
      path:'/',
      element:<MainLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'aboutus',
          element:<About/>
        }
      ]
    },
    {
      path:'dashboard',
      element: <DashboardLayout/>,
      children: [
        {
          path: 'addproduct',
          element:<AddProduct/>
        },
        {
          path: 'allproduct',
          element:<AllProduct/>
        },
        {
          path: 'editproduct',
          element:<EditProduct/>
        }
      ]
    }
  ])

```
4. Now you can create elements page (AllProduct, AddProduct, EditProduct) and add in the router page as like above.

5. In the DashboardLayout component you have set up navbar/drawer for navigating to the children component and and an outlet from react-router-dom to show the output as like MainLayout. An example is given below
```javascript
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="">
      <div className="pt-5 flex flex-row gap-5 items-center justify-center">
        <Link to={'/dashboard/admin/add-product'}>
        <button className="bg-yellow-500 p-5 font-bold text-white">Add Product</button>
        </Link>
        <Link to={'/dashboard/admin/all-products'}>
        <button className="bg-yellow-500 p-5 font-bold text-white">All Products</button>
        </Link>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
```
