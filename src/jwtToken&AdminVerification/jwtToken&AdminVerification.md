## How to implement jwt token verification and admin verification

### Install JSON web token

```javascript
npm install jsonwebtoken
```

### Open jwt route file 

Go to the server code. Open a file name jwtRotes.js. Paste following initial code

```javascript
require('dotenv').config();
const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();


module.exports = router;
```

### Adjust in index.js file

In the index.js file import and set up necessary files as follows

```javascript

// Your other codes
const jwt = require('jsonwebtoken')
require('dotenv').config()
require('dotenv').config()
// Your other codes

const jwtRoutes = require('./jwtRoutes')

// Your other codes

 app.use('/api/v1', jwtRoutes);

// Your other codes
 
// Home route 
app.get('/', (req, res) => {
  res.send('Avengers web server is running!')
})

// Server listening
app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`)
})

```

### Create token secret

- Open the terminal and type node and press enter.

- Write following code in the terminal and press enter

```javascript
require('crypto').randomBytes(64).toString('hex')
```
- You will see a code in the terminal. Copy the code.

### Create environment file

- In the root create a file name .env

- write TOKEN_SECRET=

- Paste the code copied from the terminal to the env file as a value of the TOKEN_SECRET. 

### Creating api route

- Go to the jwtRoutes.js file and paste following code

```javascript
router.post('/jwt', async(req, res) => {
  console.log('jwt route hit')
  const email = req.query.email
  const payload = {email}
  console.log('user object', email, payload)
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:'1h'})
  console.log('user token', token)
  res.send({token})
})
```
- Your full code should be something like as follows

```javascript

require('dotenv').config();
const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();


router.post('/jwt', async(req, res) => {
  console.log('jwt route hit')
  const email = req.query.email
  const payload = {email}
  console.log('user object', email, payload)
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:'1h'})
  console.log('user token', token)
  res.send({token})
})

module.exports = router;
```
### Calling jwt api from front-end

- Token should be set when the user entered into the website at the first time. 

- User can enter into the website in several ways. e.g. from signin page (using signin with email password, or social signin e.g. google, facebook, github etc), from register page after successful completion of registration. 

- We can call jwt api at each entry point or at a central point.

- If we user firebase authentication then one central point would be inside onAuthStateChange in the authProvider file. So that the whole application can access it. 

- In my project i am not using firebase for authentication and i have only one entry point in my website. So i will call jwt api at that entry point. 

### Code for jwt api call from front end

- In the signin page we can call jwt api using following code. 

  ```javascript
  
  import { useContext, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { loginUser } from "../lib/getfunction";
  import useAuth from "../hooks/useAuth";
  import axios from "axios";

  const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false)

  const {  setUser } =  useAuth()

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email && password) {
      try {
        const result = await loginUser(email, password);

        setUser(result.data.userInfo)

        if (result.data.message === "Login Successful") {
          const serverData = result.data.userInfo;
          sessionStorage.setItem("userInfo", JSON.stringify(serverData));

          setLoading(false);

          const email = result.data.userInfo.email;
       
          try {
            const res = await axios.post(`http://localhost:5000/api/v1/jwt?email=${email}`)

            if(res.data.token){
              const token = res?.data?.token
              sessionStorage.setItem("token", token)
            }
          } catch (error) {
            console.log('Error in jwt route', error)
          }

        } 
    } else {
      toast.warning("Please Fill all the fields!");
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-orange-500 to-pink-500 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="shadow-xl p-6 md:p-12 rounded-xl min-h-[600px] max-w-[600px] bg-white bg-opacity-25 backdrop-blur-md mx-auto">
          <form
            className="w-full flex flex-col gap-y-4"
            onSubmit={handleLoginSubmit}
          >
            <h3 className="accent-color text-3xl text-center font-bold capitalize my-6">
              Enter your login details
            </h3>
            <input
              type="text"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500 rounded-md"
            />
            <div className="relative">
                         
            </div>
            <button
              type="submit"
              className={`bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-6 w-full rounded-md uppercase duration-300 leading-none font-bold `}
            >
              Log In
            </button>
           </form>
         
        </div>
      </div>
    </section>
  );
  };

  export default Login;

  ```
- Our key point is as follows

```javascript 
  // Imports

  const Login = () => {
  
   //  Other code

  const {  setUser } =  useAuth()

  const handleLoginSubmit = async (e) => {
   
   //  Other code

   if (email && password) {
      try {
        const result = await loginUser(email, password);

        setUser(result.data.userInfo)

        if (result.data.message === "Login Successful") {
          //  Other code

           const email = result.data.userInfo.email;

             try {
            const res = await axios.post(`http://localhost:5000/api/v1/jwt?email=${email}`)

            if(res.data.token){
              const token = res?.data?.token
              sessionStorage.setItem("token", token)
            }
          } catch (error) {
            console.log('Error in jwt route', error)
          }}}}}}

```
- After successful login we collect the email address of the user in the email variable.

- Then we called jwt api and sent email as a query params. 

- When we received the token from jwt route we set it to the session storage. You can set it to the local storage also. 


### Keep a system for token removal

- Implement a token removal system from storage once user is null or logged out. 

- You can do it when logout function is called. 

- You should also keep a system so that if user is becomes null without logout then should also remove the token. This can be done using observer at the authProvider. 

- If you use firebase you can set the token removal function once the user is null. 

### Check whether the token implemented properly

- Go to the browser. 

- Login.

- Open the application tab.

- Go to session/local storage and check whether token is set after login. 

### Sending token to the server when secure route is hit

- If we set token in the cookies then at the time of api call the token would automatically sent to the server. 

- If token kept at local storage, session storage, memory or redux then it has to sent manually at the time of api call. 

- We can send the token as follows:

```javascript 

const res = axios.get(`http://localhost:5000/api/v1/allUsers?email=${email}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      return res.data;
```
- In this api call user email is collected from the user login information. 
- It is used to verify whether user is admin on not.
- If you don't want to check whether the user is admin or not then you do not need to send the email as query params. Just send the headers. 
- If you set token at the local storage then get it from local storage. 

### Verify token at the server

- At server token verification is usually done through a middleware to avoid duplication. 

- We can work it in the middleware.js file

- The code would be as follows

```javascript
// Other import
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Lead, User, Caller, Developer } = require('./model');


const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000']

const corsOptions = {
  // Your code
}

const verifyToken = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).send({message: 'Unauthorized access'})
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if(err){
      console.log('error token', err)
      return res.status(401).send({message: 'Unauthorized access'})
    }
    req.decoded = decoded;
    next()
  })
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong")
}

module.exports = {
  corsOptions, errorHandler, verifyToken
}
```
- Our code concern is as follows:

```javascript
const verifyToken = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).send({message: 'Unauthorized access'})
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if(err){
      console.log('error token', err)
      return res.status(401).send({message: 'Unauthorized access'})
    }
    req.decoded = decoded;
    next()
  })
}
```
- The verifyToken function is created
- If the request headers does not contain authorization then it will return with 401 status and Unauthorize access message. 
- req.headers.authorization contains two things. The words Bearer and token. 
- As we only need token so req.headers.authorization is split based on empty space and the second portion is token.
- After separating token from req.headers.authorization we put it inside token variable. 
- Then token is verified using jwt.verify function. 
- If there is any error in token verification then it will return with 401 status and Unauthorize access message.
- If everything is ok and token verification passed then at req.decoded variable the decoded is kept for future use.
- next function is called after successful token verification so that remaining tasks can be done by the server. 

### Applying verifyToken in the route

- We will apply token verification in the userRoutes.js file in the allUsers and developer routes.

- First we have to import verifyToken from middleware file and dotenv as follows

```javascript
  const {verifyToken} = require('./middleware')
  require('dotenv').config();
``` 
- After route path we should put the verifyToken as follows:

```javascript

// DEVELOPER GET ROUTE
router.get('/developer',verifyToken, async(req, res) => {
  try {
    const result = await User.find({role:{$in:['Developer', 'NewUser']}}).sort({role:1}) 
    res.send(result)
  } catch (error) {
  //  Other Code
  }
})

// LEAD COLLECTOR AND CALLER GET ROUTE
router.get('/allUsers', verifyToken, async(req, res) => {
  try{
    const result = await User.find({role:{$nin:['marketingAdmin', 'developmentAdmin', 'Developer']}}, {password: 0, __v:0}).sort({role:-1})
    res.send(result)
  }catch(error){
   //  Other Code
  }
})
```
- If user has valid token the data will be sent to the frontend otherwise it will not.

### Verifying admin theory

- Verify admin is an additional security that is implemented at the backend. 

- When we want secure some route from the normal user and keep available only for admin, that time we implement verifyAdmin.

- For this we get requested user email from the frontend. 

- At the backend when user want to access an admin route we check whether the requested user email hold an admin role at the database.

- If the user has admin role he/she can access the data of the admin route otherwise he/she will be rejected. 

- verify admin is also done using a middleware in order to avoid code duplication.


### For Verify admin frontend api call

- Call the api from the frontend using following code

```javascript
const res = axios.get(`http://localhost:5000/api/v1/allUsers?email=${email}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      return res.data;
```
- Make sure to send user email as a query params.

### Middleware for verify admin

- At the server go to the middleware.js page. 

- Paste the following code after verify token

```javascript
const verifyAdmin = async (req, res, next) => {
  const email = req.query.email
  if(email !== req.decoded.email){
    return res.status(403).send({message: "Unauthorized Access"})
  }

  const findUser = await User.find({email:email})
  const user = findUser[0]
  const isAdmin = user?.role === 'marketingAdmin' || user?.role === 'developmentAdmin';
  console.log("is admin", isAdmin)
  
  if(!isAdmin) {
    return res.status(403).send({message: 'Forbidden Access'})
  }
  next()
}
```
- At first user email is kept in the email variable from the query params.
- Then it is matched with the email used to signin. It is accessed from the req.decoded.email that is produced at verifyToken middleware.
- If email doesn't matched then the user is send back with 403 status and unauthorize access message.
- If email matched then data feteched from the database using the email.
- After data fetching the database role is checked to ensure that the email address is belong to and admin. 
- If he doesn't has admin role then then the user is send back with 403 status and unauthorize access message.
- If he has admin role then next function is called so that server can proceed with remaining functionality.

### Applying verifyAdmin middleware to the protected route.

- We will apply verifyAdmin middleware in the userRoutes.js file in allUsers and developer routes. 

- The code will be as follows

```javascript
  // DEVELOPER GET ROUTE
router.get('/developer',verifyToken, verifyAdmin, async(req, res) => {
  try {
    const result = await User.find({role:{$in:['Developer', 'NewUser']}}).sort({role:1}) 
    res.send(result)
  } catch (error) {
    // Your code
  }
})

// LEAD COLLECTOR AND CALLER GET ROUTE
router.get('/allUsers', verifyToken, verifyAdmin,  async(req, res) => {
  try{
    const result = await User.find({role:{$nin:['marketingAdmin', 'developmentAdmin', 'Developer']}}, {password: 0, __v:0}).sort({role:-1})
    res.send(result)
  }catch(error){
    // Your code
  }
})

```
- Make sure to use verifyToken middleware before verifyAdmin middleware.
### Additional protection at the front end.
- At the front end apply private/protected route. You can do several protected route.
- Some pages can be accessed by anybody without requiring login.
- Some pages should be protected so that only loggedin user can access otherwise redirected to the login page.
- Some pages should be protected so that not only public but also general user cannot access. They can be access by the user who is admin. 

## Private route

- An example of private route is as follows

```javascript
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const {user, loading} = useAuth()

  if(loading){
    return <p>Loading.......</p>
  }
  const userRoles = user && user.role ? [user.role] : []
  return (
   userRoles?.find((role) => allowedRoles?.includes(role))
    ? <>{children}</>
    :
    <Navigate to={'/'} state={{from: location}} replace/>
  )
};
export default PrivateRoute;
```

- This component will get two props from where it is called. children and allowedRoles.
- It used two hooks.
- useLocation() hook is provided by react to get the location of the user.
- useAuth hook is a custom made hook to get the user and loading from the global context. 
- userRoles is a variable that hold and array. 
- If there is an user and also the user has a role then the role is kept at the array. 
- If there is no user or user does not has any role then the array will be empty. 

- Inside the return statement a find operation is done on userRoles variable. It takes each role in the userRoles array and matched it with the allowedRoles props received. 
- If role in props and role in userRoles matches then it return the children.
- If role in props and role in userRoles does not matches then it navigate the user to the login page. 

## Applying private/protected route

- Our routes are kept at router.jsx file. So we will apply the PrivateRoute in this file.
- The code is as follows:
```javascript
import { createBrowserRouter } from 'react-router-dom';
// Imports 

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
  // marketing routes
  {
    path: '/marketing',
    element: <MarketingLayout />,
    children: [
      {
        path: '/marketing',
        element: (
          <PrivateRoute allowedRoles={['marketingAdmin']}>
          <MarketingAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: '/marketing/lead-collector',
        element: (
           <PrivateRoute allowedRoles={['LeadCollector']}>
            <LeadCollector />
           </PrivateRoute>
        ),
      },
    ],
  },
  // development routes
  {
    path: '/development',
    element: <DevelopmentLayout />,
    children: [
      {
        path: '/development',
        element: (
          <PrivateRoute allowedRoles={['developmentAdmin']}>
          <DevelopmentAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: '/development/developer',
        element: (
           <PrivateRoute allowedRoles={['Developer']}>
            <SingleDeveloper />
           </PrivateRoute>
        ),
      },
      {
        path: '/development/developer/edit/:id',
        element: (
          <PrivateRoute allowedRoles={['Developer']}>
          <DeveloperEdit />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

```

- The routes that i wanted to protect kept inside the PrivateRoute.
- I passed the role as a props. 
- If the person who wants to access the page has same role as props then he/she can see the page otherwise will be redirected to the login page. 