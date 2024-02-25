import {
  createBrowserRouter
} from "react-router-dom";
// 
import MainLayout from "../Layout/MainLayout";
import Error from "../Pages/ErrorPage/Error";
import Home from "../Pages/Home/Home";
import AddJob from "../Pages/AddJob/AddJob";
import UpdateJob from "../Pages/UpdateJob/UpdateJob";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import MyJob from "../Pages/Myjob/MyJob";
import AllJob from "../Pages/AllJob/AllJob";
import AppliedJob from "../Pages/AppliedJob/AppliedJob";
import Blogs from "../Pages/Blogs/Blogs";
import PrivateRoute from "./PrivateRoute";
import JobDetails from "../Pages/JobDetails/JobDetails";
import DynamicTitle from "../Component/DynamicTitle";
 
// 
 const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    <DynamicTitle />
    <MainLayout></MainLayout>
    </>,
    errorElement: <Error></Error>,
    children:[
      {
        path: '/',
        element:<Home></Home>
      },
      // {
      //   path: '/addjob',
      //   element:<PrivateRoute><AddJob></AddJob></PrivateRoute>
      // },
      // {
      //   path: '/updatejob/:id',
      //   element:<PrivateRoute><UpdateJob></UpdateJob></PrivateRoute>,
      //   loader: ({params}) => fetch(`http://localhost:5000/api/v1/jobs/${params.id}`)
      // },
      // {
      //   path: '/login',
      //   element:<Login></Login>
      // },
      // {
      //   path: '/register',
      //   element:<Register></Register>
      // },
      // {
      //   path: '/alljob',
      //   element:<AllJob></AllJob>,
      //   loader:() => fetch('http://localhost:5000/api/v1/jobs')
      // },
    ]
  },
]);

export default router;

// change the path, element and loader as per your requirement