import { Link, useRouteError } from "react-router-dom";
import errorImage from '../../assets/404.gif'

const Error = () => {
  const error = useRouteError();
  return (
    <div id="error-page" className="flex flex-col justify-center items-center h-screen space-y-10 bg-green-600 w-full">
      <Link to={'/'}><button className="btn bg-gray-500">Go Home</button></Link>
      <div className="w-full h-[90vh]">
      <img src={errorImage} alt="" className="w-full object-cover" />
      </div>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
export default Error;

// import the necessary image
// change the image name inside src of img tag
// check the file name in the route.jsx folder
