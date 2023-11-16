import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import loadingimage from '../assets/loading.gif'

const PrivateRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext);
  const location = useLocation();

  if (loading){
    return <img src={loadingimage} alt="" className="h-screen flex justify-center items-center"/>
  }
  if(user){
    return children;
  }
  return <Navigate state={location.pathname} to={'/login'} replace></Navigate>;
};

export default PrivateRoute;

// change the path name of loading image
// change the src of img tag
// change the path of to in the Navigate tag
// change the use context if you use custom hook