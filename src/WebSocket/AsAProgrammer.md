# Real Time Chat App with React and Node.js | JWT, Socket.io, MongoDB 

### Parent folder added

- Create a folder where you want to add your project and open it in vs code.

- Create two folder with the name of frontend and backend. 

### Creating a react project

- Open terminal and cd to frontend folder.

- Type following in the terminal and hit enter

```javascript 
npm create vite@latest .
```
- It will start creating a react project in the inside the frontend folder. The dot indicate that the installation will be in the same folder.

- They will ask some question, select React as a framework and select Javascript as a variant.

- Type following in the terminal and hit enter

```javascript 
npm i
```
- Then after installation complete type following in the terminal and hit enter
```javascript 
npm run dev
```
- Open the link in the browser. 

### Creating a node project

- We will install the node in the root folder not inside the backend folder. It will help us in deployment. We can run both frontend and backend from the root easily.

- So in the terminal type following and hit enter
```javascript 
cd ..
```

- It will take us to the root folder from the frontend folder. Then type following and hit enter

```javascript 
npm init -y
```

- Open the package.json folder and change the value of main property from index.js to server.js. Then inside the backend folder create a file name server.js

### Installing necessary packages for the server

- Open the terminal and check that you are in the root of your project. Then type following and hit enter.

```javascript 
npm i express dotenv cookie-parser bcrypt mongoose socket.io jsonwebtoken nodemon
```
- Express will be used to create server.

- dotenv will be used for reading the .env file data.

- cookie-parser will be used for reading the information from cookie.

- bcrypt will be used for password hashing

- mongoose will be used for database connection and model creation.

- socket.io will be used for chat app

- jsonwebtoken will be used for generating token.

- nodemon will start server whenever there is any change in the server.js file.

- Go to the package.json file and change following
```javascript 
"scripts": {
    "server": "nodemon backend/server.js"
  },
  "type": "module",
```
- First one will make sure when you write "npm run server" in the terminal the server.js file inside the backend folder should open.

- The second one will convert the system from common.js to es6. So you can now use "import" word rather than "require" word. ALWAYS MAKE SURE TO WRITE FILE EXTENSION AFTER THE PATH/

### Creating an express server

- Inside the server.js file type following 

```javascript 
import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello Enayet")
})

app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`))
```
- In the root create a file name .env and paste the following code in it.

```javascript 
  PORT = 5000
```
### Creating routes folder and auth routes file.

- Inside the backend folder create a folder with the name of routes. Inside it create a file name auth.routes.js. You can name it anything. But naming should be made in such a way so that by seeing it anyone can understand what the file is about. Here anyone can understand that this file is about auth and more specifically auth related routes. 

- Inside this file paste following code 
```javascript 
import express from "express"

const router = express.Router()

router.get("/login", (req, res) => {
  res.send("Login route")
})
  export default router;
```
- Now go to the server.js file and paste following two lines

```javascript 
import authRoutes from "./routes/auth.routes.js"

app.use("/api/auth", authRoutes)
```
- So the explanation is as follows
 
  - In the auth.routes.js file we imported express then initiated router function from the server. 
  - Then we created a get route with the name of login and a callback function. Later we will move the callback function to another file. 
  - At last we export the router so it can be used in other file. We will use it in server.js file now.
  - In the server.js file we imported the authRoutes from auth.routes.js file and a middleware function is used here. 
  - In the browser the full route will be http://localhost:5000/api/auth/login
  - If we create more route inside the auth.routes.js file then then the api/auth will automatically prefixed with it. 
  - Inside the auth.routes.js we can create get,post, patch, put, delete routes if necessary. 

### Creating a controller folder and file

- For maintaining clean code, scalability and understandability we will separate the callback function of the route path that we watched earlier. 

- Inside the backend folder create a folder with the name of "controllers" and inside it create a file name auth.controller.js. This name will help us to understand that the file contains auth related controller(callback function) code. 

- Write the following code inside it

```javascript 
  export const login = (req, res) => {
    res.send("Enayet login controller")
  }
```
- Then go to the auth.routes.js file and paste the following code

```javascript 
  import {login} from "../controllers/auth.controller.js"
  router.get("/login", login)
```
- The code explanation is as follows
  - Inside the auth.controller.js file we created a function with the name of login. At present inside it we send a message but later we will write full functionality inside it. 
  - Then we import the login function inside the auth.route.js file and inside the router.get we used callback function earlier now we put the login function here. So our functionality will remain same but code will be more readable. 

### Creating workspace in postman

  - Open the postman app.
  - Click the workspace button then click Create Workspace button. Then click next button and then type the name of the project and click Create button.
  - Create a new collection and name it "AUTH".
  - Beside the collection name you will see three ... click it, a dropdown list will appear. Click Add Request. Rename it to SIGNUP. By default you see the GET method. Change it to POST method.
  - In the url link put the following url
http://localhost:5000/api/auth/signup
  - Click the Body tab and select raw radio tab and select JSON from the dropdown. 
  - The setup is finished for now. 

### Creating mongodb connection

- Go to your mongodb account and create a user id and password and paste it in the .env file.
- Copy the connection string from Database => Connect => Drivers. It will look like as follows
```javascript 
mongodb+srv://<username>:<password>@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority
```

- Paste it in the .env file as a value of MONGO_DB_URI property and replace the username and password with your username and password. 

- In the connection string after .net/ write your database name. 

- The code in the .env file could look like as follow

```javascript 
mongodb+srv://FandFChat:qFy5dtjq25upW8qs@cluster0.ktgpsav.mongodb.net/FandFChat?retryWrites=true&w=majority
```

- Inside the backend folder create a folder with the name of db and inside that create a file with the name of connectToMongoDb.js and paste the following code inside it.

```javascript 
  import mongoose from "mongoose"
  const connectToMongoDb = async () => {
    try{
      await mongoose.connect(process.env.MONGO_DB_URI)
      console.log("Connected to MongoDB")
    } catch(error){
      console.log("Error connecting to MongoDB", error.message)
    }
  }
  export default connectToMongoDb
```
- Here we imported mongoose. The create a function to connect with mongoDB. 

- Then go to the server.js file and import connectToMongoDb function and call it inside the callback function of app.listen function. Your code will be look like as follows

```javascript 
import connectToMongoDb from "./db/connectToMongoDb"

app.listen(PORT, () => {
  connectToMongoDb()
  console.log(`Server Running on port${PORT}`)
})
```

### Creating model for user

- Inside the backend folder create a folder with the name of models and inside that create a file with the name of user.model.js. We will use that file for creating model for user.

- Paste the following code inside that file.

```javascript 
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true, 
  },
  username: {
    type: String,
    required: true, 
    unique:true,
  },
  password: {
    type: String,
    required: true, 
    minlength: 6,
  },
  gender: {
    type: String,
    required: true, 
    enum:["male", "female"],
  },
  profilePic: {
    type: String,
    default: "",
  },
}, {timestamps: true})

const User = mongoose.model("User", userSchema)
export default User
```
- We imported mongoose.

- We created userSchema and put our fields inside it. 

- For username property we made it unique.

- For password we put condition that it must be minimum 6 characters. 

- For gender we have two certain values male and female so we used enum field. You can use it when you know earlier that you have some certain values. 

- For profilePic we have default value of empty string so that if user does not provide picture link there is no problem. 

### Middleware to extract json data

- Go to server.js file and type following middleware code inside it.

```javascript 
app.use(express.json())
```
- It will parse data from json payload (which is req.body). 

### Getting image based on user name

- Go to the following link

https://avatar-placeholder.iran.liara.run/

- Go to document section and over there go to "Avatar image based on username" 

- Copy the following link from it

https://avatar.iran.liara.run/public/boy?username=[value]

- You can use this website for generating different types of avatar. 

- The link we copied will be used in the later section.

### Writing the signup function for signup route

- Go to the auth.controller.js file and inside it paste the following code.

```javascript 
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

			if(newUser){
  await newUser.save()

  res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    username: newUser.username,
    profilePic: newUser.profilePic,
  });
 } else{
  res.status(400).json({error: "Invalid User data"})
 }
	
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
```
- I imported bcrypt for password hash and User model. 

- I destructured { fullName, username, password, confirmPassword, gender } from request body that will be send from the frontend. 

- Then i confirmed the password with the confirmPassword so if the frontend it compromised then it will be catch here and return from here.

- Then i search our database based on username field.

- If user already exist that means he want to signup for second time so return him from here.

- If no user exist then i start processing of saving user information in the database.

- I hashed the user password.

- Then i adjust the username in the  link so that each user get a unique avatar image all time. 

- Then using mongoose model i created a newUser object for saving in the database.

- In the new user object i added fullName, username, gender received from the frontend and in the place of password i added the hashed password instead of plain password and for profilePic i used conditional adding.

- Then i saved the newUser object in the database.

- At last i send response to the frontend with 201 status code and _id, fullName, username and profilePic in an object. 

- Inside the catch block i console log the error message and sent 500 error code together with Internal Server Error message in the front end. 

- Now using postman you can send a post request and check whether the route is working. 

### Generating token to verify user

- Go to the backend folder and create a new folder with the name of utils and inside it create a file name generateToken.js

- Open the terminal and paste following code and hit enter

```javascript 
openssl rand -base64 32
```
- You will get a new code in the terminal. Copy it and paste it inside the .env file with the name of JWT_SECRET

- Go to the generateToken.js and paste the following code inside it.

```javascript 
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		
	});
};

export default generateTokenAndSetCookie;
```
- I imported jwt from jsonwebtoken.

- I created a function and passed userId and res to it as argument.

- Then i generating a token using userId, JWT_SECRET and kept it expire limit 15 days. You can increase or decrease it. 

- Then i set it inside cookies for maximum 15 days, and applied some security features to protect it from outside attack. 

### Using token in the signup function

- Go to the auth.controller.js file and inside the signup function call the token function inside the if(newUser) block. 

Your code will be as follows

```javascript 
  import generateTokenAndSetCookie from "../utils/generateToken.js";


  if(newUser){
    generateTokenAndSetCookie(newUser._id, res)
  await newUser.save()

  res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    username: newUser.username,
    profilePic: newUser.profilePic,
  });
 } else{
  res.status(400).json({error: "Invalid User data"})
 }
```
- Now using postman you can check whether the token is setting in cookie or not.

### Creating login route

- Go to the authRoute.js file and create a new route for login using following code

```javascript 
import { signup, login } from "../controllers/auth.controller.js"

router.post("/login", login)
```

### Creating login Controller

- Go to the auth.controller.js file and after the signup function paste the following code

```javascript 
export const login = async (req, res) => {
  try {
    const {username, password} = req.body;

    const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
  } catch (error) {
    console.log("Error in login controller:", error.message)
    res.status(500).json({error:"Internal Server Error"})
  }
}
```
- I create a asynchronous login function. 
 
- I parsed username and password from req.body.

- Then i searched the username in the database.

- Then i matched the user password with the database password using bcrypt.

- Then i checked whether user is null or password does not match. If any one happen i return from here.

- If everything is ok then i generate token and set it to cookie. 

- At last i returned userId, fullName, username and profilePic as a response.

- If there is any error i console log it and send Internal Server Error to the front end. 

- Using the postman you can check whether you can login or not.

### Logout functionality

- Go to the auth.routes.js file and create a new route for logout. It will look like as follows

```javascript 
import { login, logout, signup } from "../controllers/auth.controller.js";

router.post("/logout", logout);
```
- Then go to the auth.controller.js file and paste the following code. 

```javascript 
export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
```

- I created a logout function. 

- It set the maxAge of token to 0. 

- It also send a message to frontend that logout is successful.

- In the catch block if there is any error is console log it and send error message to the frontend.

- Check it using postman.

### Creating message model

- Go to the models folder and create a new file with the name of message.model.js. Paste following code to create a message model

```javascript 
import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String, 
    required: true, 
  }
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema)

export default Message

```

### Creating conversation schema

```javascript 
import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: [],
    }
  ]
}, {timestamp: true})

const Conversation = mongoose.model("Conversation", conversationSchema)

export default Conversation
```

### Creating message and conversation route

- Go to the server.js file and create two new route for message and conversation. The code will be as follows

```javascript 
import messageRoutes from "./routes/message.routes.js"
import conversationRoutes from "./routes/conversation.routes.js"

app.use("/api/message", messageRoutes)
app.use("/api/conversation", conversationRoutes)
```
- Make sure you import the route path properly.


```javascript 

```
```javascript 

```
```javascript 

```
```javascript 

```
```javascript 

```
```javascript 

```
```javascript 

```