import { useContext } from 'react';
import backgroundPhoto from '../../assets/registerPhoto.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Provider/AuthProvider';
import swal from 'sweetalert';
import { getAuth, updateProfile } from 'firebase/auth';

const auth = getAuth();


const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
const {createUser, setUserName, setUserPhoto} = useContext(AuthContext)   // if you use custom hook for useContext and AuthContext then change it in here. import necessary items here


  const handleRegister = e =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const userName = form.name.value;  // if you want to get user name then use it otherwise remove it
    const userPhoto = form.photo.value;   // if you want to get user photo then use it otherwise remove it
   
    if(password.length < 6 ){
      swal("Sorry!", "Your password must have atleast 6 characters.", "error")
      return;
    }else if(!/[A-Z]/.test(password)){
      swal("Sorry!", "Your password must have atleast 1 capital letter.", "error")
      return;
    } else if (!/[!@#$%^&*()\-_=+\[\]{}|\\;:'"<>,.?/]/.test(password)){
      swal("Sorry!", "Your password must have atleast 1 special character.", "error");
      return;
    }

    createUser(email, password)  //it is imported from authProvider
    .then(result => {
      if (result.user) {
        setUserName(userName);  //if you want to get/use this information for later use you can set it otherwise delete it
        setUserPhoto(userPhoto);  //if you want to get/use this information for later use you can set it otherwise delete it
        
        updateProfile(auth.currentUser, {
          displayName: userName,
          photoURL: userPhoto
        })  // this used to put the name and photo in the state for showing user name and photo in the navbar 
        .then(() => {
          // Handle success
          swal("Congratulation!", "Your Registration Complete!", "success");

          // if you want to save the user information in the database then use following otherwise just navigate user using (navigate(location?.state ? location.state : '/');)
          fetch('https://brand-shop-server-35jjqg4co-md-enayetur-rahmans-projects.vercel.app/register',{
          method:'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            name: userName,
            email,
          })
        } )
        .then(res => res.json())
        .then(data =>{
          console.log(data)
          navigate(location?.state ? location.state : '/');
        })
        // if you want to save the user information in the database then use above otherwise delete above and  just navigate user using (navigate(location?.state ? location.state : '/');)
        })
        .catch(error => {
          console.log(error);
        }); // this error will come out if user profile is not updated properly
      }
    })
    .catch(error => {
      console.log(error);
      if (error) {
        swal("Sorry!", `${error.message}`, "error");
      }
    }); // this error will come out if user profile is not created properly
  }

   

    return (
      //
    <div 
    style={{
    backgroundImage: `url(${backgroundPhoto})`
    }}  className="min-h-[80vh] flex items-center justify-center p-5">
      {/* you can keep or remove the background image */}
      <div className="bg-[#ffffff] border border-solid border-[#dddddd] p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#333333]">Register</h1>
        <form onSubmit={handleRegister}> {/* keep the name of onSubmit handler same */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#333333]">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-[#dddddd] rounded-lg focus:outline-none focus:border-[#dddddd]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#333333]">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Put photo URL"
              className="w-full px-3 py-2 border border-[#dddddd] rounded-lg focus:outline-none focus:border-[#dddddd]"
              required
            />
          </div>
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
              Register
            </button> {/* change the button design if necessary */}
          </div>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account?
          <span className="text-[#007ACC] pl-2 font-semibold">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;

// import background photo 
// if you change the name of background photo in the import then change it in style tag also
// import swal from sweetalert
// import the getAuth and updateProfile from firebase/auth
// if you use custom hook for useContext and AuthContext then change it in the variable option
// three types of password validation used here (1. minimum length should be 6 characters, 2. at least one capital letter, 3. at least one special character)