import { BsGoogle } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import backgroundPhoto from '../../assets/loginPhoto.jpg'
import { AuthContext } from '../../Provider/AuthProvider';
import swal from 'sweetalert';
import { useContext } from "react";

const Login = () => {

  const { signInUser, googleSignIn, setUserName, setUserPhoto} = useContext(AuthContext)  //import necessary item here.
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = e =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
    .then(result => {
      if(result.user){
        swal("Congratulation!", "Your login successful!", "success")
        navigate(location?.state ? location.state : '/');
      }
    })
    .catch(error => {
      if(error){
        swal("Sorry!", `${error.message}`, "error");
      }
    })
  }

  const handleGoogleSignIn = e => {
    e.preventDefault();
    googleSignIn()
    .then(result => {
      if(result.user){
        swal("Congratulation!", "Your login successful!", "success");
        setUserName(result.user.displayName)   //keep it or remove it if necessary
        setUserPhoto(result.user.photoURL)   //keep it or remove it if necessary
        navigate(location?.state ? location.state : '/');
      }
    })
    .catch(error => {
      if(error){
        swal("Sorry!", `${error.message}`, "error");
      }
    })
  }

  return (
    <div 
    style={{backgroundImage: `url(${backgroundPhoto})`}}
    className="min-h-[82vh] flex items-center justify-center p-5">    {/* you can keep background image or remove style attribute from here */}
      <div className="bg-[#ffffff] p-8 rounded-lg shadow-lg w-96">   {/* this is the card container design  */}
        <h1 className="text-3xl font-bold mb-6 text-center text-[#333333]">Login</h1>
        <form onSubmit={handleLogin}>   {/* make sure the event name should be same.  */}
      
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#333333]">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-[#dddddd] rounded-lg focus:outline-none focus:border-[#dddddd]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#333333]">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-[#dddddd] rounded-lg focus:outline-none focus:border-[#dddddd]"
              required
            />
          </div>
          <div className="text-center mt-6">
            <button className="bg-[#007ACC] text-white py-2 px-4 rounded-lg hover:bg-[#007ACC]">
              Login
            </button>
          </div>
        </form>
        <p className="text-sm mt-4 text-center">
          Do not have an account?
          <span className="text-[#007ACC] pl-2 font-semibold">
            <Link to="/register">Register</Link>
          </span>
        </p>
        <hr />
        <div className="text-center pt-1">
          <h1 className="pb-1 font-bold">Or</h1>
          <div className="bg-[#007ACC] text-white py-3 rounded-lg mb-5 flex items-center justify-center gap-2">
          <BsGoogle /> <button onClick={handleGoogleSignIn}>    {/* make sure the event name should be same.  */}
             Sign in with Google
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// you have to install react-icons, sweetalert
// you have to import an image for the background image.
// you have to change the image name inside the img tag
// if you use custom hook for useContext and AuthContext then remove useContext and put hook name instead
// import necessary item in useContext
// for google login if you want to keep user name and photo then in the AuthProvider file create two useState named userName and userPhoto. otherwise remove setUserName and setUserPhoto from handleGoogleSignIn event handler
