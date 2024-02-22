# Real Time Chat App with React and Node.js | JWT, Socket.io, MongoDB

### Useful links

- For generating glassmorphism https://tailwindcss-glassmorphism.vercel.app/

- Creating avatar https://avatar-placeholder.iran.liara.run/

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
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello Enayet");
});

app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
```

- In the root create a file name .env and paste the following code in it.

```javascript
PORT = 5000;
```

### Creating routes folder and auth routes file.

- Inside the backend folder create a folder with the name of routes. Inside it create a file name auth.routes.js. You can name it anything. But naming should be made in such a way so that by seeing it anyone can understand what the file is about. Here anyone can understand that this file is about auth and more specifically auth related routes.

- Inside this file paste following code

```javascript
import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Login route");
});
export default router;
```

- Now go to the server.js file and paste following two lines

```javascript
import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);
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
  res.send("Enayet login controller");
};
```

- Then go to the auth.routes.js file and paste the following code

```javascript
import { login } from "../controllers/auth.controller.js";
router.get("/login", login);
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
import mongoose from "mongoose";
const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};
export default connectToMongoDb;
```

- Here we imported mongoose. The create a function to connect with mongoDB.

- Then go to the server.js file and import connectToMongoDb function and call it inside the callback function of app.listen function. Your code will be look like as follows

```javascript
import connectToMongoDb from "./db/connectToMongoDb";

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server Running on port${PORT}`);
});
```

### Creating model for user

- Inside the backend folder create a folder with the name of models and inside that create a file with the name of user.model.js. We will use that file for creating model for user.

- Paste the following code inside that file.

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
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
app.use(express.json());
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

    if (newUser) {
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
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

- Then i adjust the username in the link so that each user get a unique avatar image all time.

- Then using mongoose model i created a newUser object for saving in the database.

- In the new user object i added fullName, username, gender received from the frontend and in the place of password i added the hashed password instead of plain password and for profilePic i used conditional adding.

- Then i saved the newUser object in the database.

- At last i send response to the frontend with 201 status code and \_id, fullName, username and profilePic in an object.

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

if (newUser) {
  generateTokenAndSetCookie(newUser._id, res);
  await newUser.save();

  res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    username: newUser.username,
    profilePic: newUser.profilePic,
  });
} else {
  res.status(400).json({ error: "Invalid User data" });
}
```

- Now using postman you can check whether the token is setting in cookie or not.

### Creating login route

- Go to the authRoute.js file and create a new route for login using following code

```javascript
import { signup, login } from "../controllers/auth.controller.js";

router.post("/login", login);
```

### Creating login Controller

- Go to the auth.controller.js file and after the signup function paste the following code

```javascript
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

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
    console.log("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
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
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
```

### Creating conversation schema

```javascript
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamp: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
```

### Creating message and users route

- Go to the server.js file and create two new route for message and conversation. The code will be as follows

```javascript
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes)
```

- Make sure you import the route path properly.

- Now go the the routes folder and create a file name message.routes.js and paste the following code inside it

```javascript
import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

export default router;
```

- Here i initiate the Router from express and kept it inside router variable.

- I created a new dynamic route for sending message based on user id.

- protectRoute is a middleware that check whether the person is trying to send message is a verified user. If he is verified then he can access the sendMessage controller function other wise not. The code for protectRoute will be shown in the next section.

- Then we used sendMessage controller. The code will be shown later.

- At last we export the router.

### Setting middleware at the backend

- Go to the server.js file and call cookieParser as a middleware. It will help us to parse cookie that will be used in following section. The code will be as follows

```javascript
import cookieParser from "cookie-parser";

app.use(cookieParser());
```

- Inside the backend folder create a folder with the name of middleware and inside it create a file with the name of protectRoute.js and paste the following code from it.

```javascript
import jwt from "jsonwebtoken"

const protectRoute = (req, res, next) => {
  try{
const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
  }catch(error){
    console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
  }
}
```

- Here we imported jwt from json web token.

- Inside the try block first we parsed the logged in user token from the cookie.

- If no token is available we return from here.

- If token is available we verify it using token and JWT_SECRET.

- If decoded token is not correct then we return from here.

- If decoded token is correct then based on the userId inside the token we find out the user from database.

- If no user exist in database then i return from here.

- If user is available then i add the user information without password as a property of req.

- Then i call the next function so that for the verified user other server activities can be done. In our example the verified user can send and receive message.

- If there is any error the catch block will detect it and show in console and then send response to the frontend.

### Creating send message controller

- Go to the controllers folder and inside it message.controller.js file and paste the following code inside it

```javascript
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participant: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
```

- I destructure the message from req.body and receiverId from req.params

- I also extracted sender id from req.user._id. In the protectRoute middleware function the user info stored inside req.

- Based on the sender and receiver id i searched the database to find out whether there is any existing conversation between them.

- If there is no conversation between them is create a conversation in the database.

- Then i created a new message and pushed its id in conversation.message.

- I then parallelly save the conversation and new message to the database.

- At last i send the newMessage to the frontend.

- In the catch block i showed error in the console log and send error message to the frontend.

- Now check whether you can send message using postman.

### Creating get message controller

- Go to the message.controller.js file and below sendMessage controller function paste the following code

```javascript
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(201).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
```

- From req.param i extracted id of user with whom our sender is chating.

- Then from req.user i extracted sender id.

- Based on both id i searched the database to find conversation between them. In the database conversation array only contains the message id. So using populate function i asked mongodb to provide me the actual message instead of message id.

- If no conversation found between them then send empty array.

- If conversations found then i send all the messages to the frontend.

- Check them using postman.

### Installing tailwind at frontend

- Go to the terminal and cd to frontend folder

- Run the development server to ensure everything is ok.

- Make sure you are in frontend folder. Open the terminal and paste the following code

```javascript
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Go to the tailwind.config.js file and paste the following code.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- Go to the index.css file and paste the following code and delete everything else.

```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Installation of daisy.ui

- Open the terminal of be at the frontend folder and paste following code at the terminal.

```javascript
npm i -D daisyui@latest
```

- Go to the tailwind.config.js file and paste the following code

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
```

- Go to the app.jsx file and delete everything and paste the following code

```javascript
function App() {
  return (
    <>
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>
    </>
  );
}

export default App;
```

- In the ui if you should see button like as follows
  ![button](/public/button.png)

- If everything is ok you can delete the buttons.

### Installing necessary packages for frontend

- Now we will install react icons and for that open the terminal and check that you are in the frontend folder and paste following and hit enter

```javascript
npm install react-icons --save
```

- Now we will install react hot toast and for that open the terminal and check that you are in the frontend folder and paste following and hit enter

```javascript
npm install react-hot-toast
```
- Go to the App.jsx file and import toaster and put the toaster component at the bottom as follows

```javascript
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
```

- Now we will use zustand for global state management. 

- Go to the terminal and make sure you are in the frontend folder and paste the following code and hit enter

```javascript
npm install zustand
```

- Now i will install socket for client side for chat. 

- Go to the terminal and make sure you are in the frontend folder and paste the following code and hit enter

```javascript
npm i socket.io-client
```

### Setting the background image for whole app

- Go to the app.css file and paste the following code

```javascript
body{
  background-image: linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url("../public/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
```

- Make sure in the public folder you have an image with the name of bg. If you have different image extension than jpg put that in the url.

### Creating a folder structure

- Inside the src folder create a folder named pages and inside that create three folder home, login and signup and create jsx file inside it.
- Inside the src folder create a folder named components.

### Designing the login page

Inside the login page paste the following code

```javascript
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> FandFChat</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <a
            href="#"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            {"Don't"} have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2 text-black">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
```

### Designing signup page

- Paste the following code inside the signup page.

```javascript
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> FandFChat</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text  text-white">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enayetur Rahman"
              className="w-full input input-bordered  h-10"
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text  text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="enayet"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text  text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text  text-white">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <GenderCheckbox />

          <a
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block  text-white"
            href="#"
          >
            Already have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700 text-black">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
```

- Inside the signup folder create another file with the name of GenderCheckbox.jsx and paste the following code inside it

```javascript
const GenderCheckbox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className=" text-white label-text">Male</span>
          <input type="checkbox" className="checkbox border-slate-900" />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-white">Female</span>
          <input type="checkbox" className="checkbox border-slate-900" />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
```

### Designing Home page

Inside the home page paste the following code

```javascript
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
```

- The components used in the home page will be shown below one by one.

### Sidebar

- Inside the src folder create a folder name sidebar and inside it create file name Sidebar.jsx and paste following code inside it

```javascript
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
```

### SearchInput, Conversations, Conversation and LogoutButton component design code

- Inside the sidebar folder create 4 jsx file with the name of SearchInput.jsx, Conversations.jsx, Conversation.jsx and LogoutButton.jsx
- Paste the following code in the component

```javascript
// Conversation
const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">John Doe</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};
export default Conversation;
```

```javascript
// Conversation
import Conversation from "./Conversation";

const Conversations = () => {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};
export default Conversations;
```

```javascript
// LogoutButton
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const loading = false;

  const logout = () => {
    console.log("logout");
  };
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
```

```javascript
// SearchInput
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
```

### MessageContainer code

- Inside the component folder create a new folder with the name of messages. Inside it create a file with the name of MessageContainer.jsx and paste the following code.

```javascript
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <>
        {/* Header */}
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text">To:</span>{" "}
          <span className="text-gray-900 font-bold">John doe</span>
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
};
export default MessageContainer;
```

### Messages, Message and MessageInput component code

- Inside the messages folder create three file with the name of Messages.jsx, Message.jsx and MessageInput.jsx and paste following code

```javascript
// Message
const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708300800&semt=ais" />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>
        Assalamualaikum How are you?
      </div>
      <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">
        12.42
      </div>
    </div>
  );
};

export default Message;
```

```javascript
// Messages
import Message from "./Message";

const Messages = () => {
  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};
export default Messages;
```

```javascript
// MessageInput
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="relative px-4 my-3">
      <div className="w-full">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white pe-10"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-5  flex items-center text-white  pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
```

### Designing scrollbar of message component

- Go to the index.css file and paste following code. It will make a nice looking scroll bar.

```javascript
::-webkit-scrollbar {
	width: 8px;
}

::-webkit-scrollbar-track {
	background: #555;
}

::-webkit-scrollbar-thumb {
	background: #121212;
	border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
	background: #242424;
}
```

### Installing react router dom

- Go to the terminal. Make sure you are in the frontend folder. Paste the following code and press enter

```javascript
  npm i react-router-dom
```

- After installation complete go to the main.jsx and paste the following code

```javascript
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- I imported BrowserRouter from react router dom and then wrap the app component by the BrowserRouter component.

- Then go to the App.jsx file and paste the following code

```javascript
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
```

- The new addition in the component is the import of Route and Routers.

- I also defied the path for Home, Login and Signup component and call the page here inside Route component.

### Changing port to 3000 for frontend

- Go to the vite.config.js file and after plugins create a new property with the name of server and inside it create a property with the name of port and provide its value 3000.

- Now check the browser whether your project is running at 3000 port.

- Full code inside vite.config.js file will look likes as follows

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

### Login and Signup page link activation

- Go to the login page and you will see following code

```javascript
<a
  href="#"
  className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
>
  {"Don't"} have an account?
</a>
```

- Change the a tag to Link tag from react-router-dom and change href to to='/signup'. The code will be as follows

```javascript
import { Link } from "react-router-dom";

<Link
  to="/signup"
  className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
>
  {"Don't"} have an account?
</Link>;
```

- Go to the signup page you will see following code

```javascript
<a
  className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block  text-white"
  href="#"
>
  Already have an account?
</a>
```

- - Change the a tag to Link tag from react-router-dom and change href to to='/login'. The code will be as follows

```javascript
import { Link } from "react-router-dom";

<Link
  to={"/login"}
  className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block  text-white"
>
  Already have an account?
</Link>;
```

- Now check the browser whether you can toggle between login and signup page.

### Getting form data from the signup page

- Go the to the signup page and paste following before return.

```javascript
const [inputs, setInputs] = useState({
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  gender: "",
});

const handleCheckboxChange = (gender) => {
  setInputs({ ...inputs, gender });
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(inputs);
};
```

- I set the inputs state for getting values of fullName, username, password, confirmPassword and gender.

- handleCheckboxChange function will get the value of gender from the checkbox and put it inside the inputs.

- handleSubmit function will take the form value for now and console log it. Later we will post data to the backend.

- Import following.

```javascript
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
```

- Inside the return statement change the following code.

```javascript
<form onSubmit={handleSubmit}>

	<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10'
	value={inputs.fullName}
	onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10'
value={inputs.username}
onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
					/>
<input
type='password'
placeholder='Enter Password'
className='w-full input input-bordered h-10'
value={inputs.password}
onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
<input
type='password'
placeholder='Confirm Password'
className='w-full input input-bordered h-10'
value={inputs.confirmPassword}
onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
<GenderCheckbox  onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

```
- I added handleSubmit function as an onSubmit handler.

- In the input fields i attached the value and onChange handler. 

- I passed the onCheckboxChange function and value of gender property to the GenderCheckbox component.

- Now go to the GenderCheckbox component and paste the following code.

```javascript

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
					<span className=' text-white label-text'>Male</span>
					<input type='checkbox' className='checkbox border-slate-900'
					checked={selectedGender === "male"}
					onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
					<span className='label-text text-white'>Female</span>
					<input type='checkbox' className='checkbox border-slate-900'
					checked={selectedGender === "female"}
					onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
```
- I received the onCheckboxChange function and selectedGender as a props. 

- In the label dynamic class is added to select the checkbox. 

- Inside the input tag i added the checked functionality and onChange handler. 

- Now you should go to the browser, fill up the signup form and check whether the form data is showing correctly in the console. 

### Creating a global context

- Go to the src folder. Inside it create a folder named context. Inside that create a file name AuthContext.jsx. It will be used for storing auth related state. Paste the following code inside it. 

```javascript
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
```
- I imported createContext, useContext and useState from react. 

- I created a context with the name of AuthContext and exported it.

- I created useAuthContext hook so that in the user component it can be called easily.

- I created and exported AuthContextProvider that takes a children as a prop and return it. 

- I created a authUser context and its initial value is parsed data from local storage with the name of chat-user. It will be needed later in other components. 

- Then passed the state as a value. 

- Now go to the main.jsx file and wrap the whole application by AuthContextProvider. Your code will look like as follows

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import AuthContextProvider from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
   <AuthContextProvider>
   <App />
   </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
```

### Using hook to post registration data to backend.

- Go to the src folder and create a folder with the name of hooks. Inside it create a file name useSignup.js and paste the following code inside it.

```javascript
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
```
- At the top of component there are some imports.

- I declared a loading state and called setAuthUser from the authContext.

- Then i declared a asynchronous signup function that takes fullName, username, password, confirmPassword, gender as a props which comes from input state of signup page. 

- Then i called the handleInputErrors function and passed the props to it to check whether everything is ok. We will discuss about it later. 

- If error found then the function returns from here. 

- If everything ok then loading state set to true and a post request send to the backend. In the url full url is not mentioned. for that you need to configuare vite.config.js file. Go to that file and paste following code inside it

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
});
```
- Here we added the proxy property.

- Then i convert and store json data in the data variable.

- If data has error then it is thrown and catch block will show the error.

- If data received successfully from backend then it is stored both in the localStorage and authUser state.

- The catch block show any error message captured during the process and show as a hot toast. 

- Finally the loading state is set to false.  

- At last the loading state and signup function is returned. 

- Now move to the handleInputErrors function.

- At first it check that whether all the fields are filled up properly. If not it show error as a hot toast.

- Then it checked whether the password and confirm password matched.

- Then it checked whether password is minimum 6 character long. 

- If any one is wrong it return false. Otherwise return true. 

### Fixing cors error for development

- Go to the vite.config.js file and paste the following code

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000"
      }
    }
  }
})

```
- Here i added the proxy property. It will only be needed for development. We will deploy both server and client together. 
 
### Conditional rendering of  login, signup and home page

- Now i want if user is logged in he should not get access of login and signup page and redirect to home page and vice versa. 

- For doing it go to the App.jsx file and pase the following code in it. 

```javascript
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from "./context/AuthContext";
import SignUp from "./pages/signup/SignUp";

function App() {
  const {authUser} = useAuthContext()
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path="/login" element={authUser ? <Navigate to={'/'}/> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to={'/'}/> : <SignUp />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;

```
- I called authUser state from auth context.

- Inside the route component i applied conditional rendering.

- In the home route if auth user is available then he can access the home route otherwise will be navigate to login page. 

- In the login route if auth user is not available then he can access the login route otherwise will be navigate to home page. 
- In the signup route if auth user is not available then he can access the signup route otherwise will be navigate to home page. 


### Setting loading state in the button of the signup page

- Go to the signup page and at the bottom of the page you will file following jsx code 

```javascript
<button className='btn btn-block btn-sm mt-2 border border-slate-700 text-black'>Sign Up</button>
```

- Replace the above code with the following code.

```javascript
<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
</button>
```

- If the loading state is true the button will be disabled and show a spinner.

- If the loading state is false the button will show Sign Up text. 

### Activating logout button

- Go to the hooks folder and create a file with the name of useLogout.js and paste the following code

```javascript
import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useLogout = () => {

const [loading, setLoading] = useState(false)
const {setAuthUser} = useAuthContext()
const logout = async () => {
  setLoading(true)
  try {
    const res = await fetch("/api/auth/logout",{
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      }
    })
    const data = await res.json()

    if(data.error){
      throw new Error(data.error)
    }

    localStorage.removeItem("chat-user")
    setAuthUser(null)

  } catch (error) {
    toast.error(error.message)
  } finally{
    setLoading(false)
  }
}

return {logout, loading}

}

export default useLogout
```

- I set loading state and imported setAuthUser from authContext. 

- I created an asynchronous logout function.

- Initially loading state set to true.

- Using fetch the logout route hit.

- From the localStorage the chat user is removed and authUser is set to null.

- Error block shows error message using toast.

- Finally loading state is set to false.

- At last the loading state and logout function is returned. 

- Now go to the LogoutButton component and import loading state and logout function using useLogout hook. 

- Inside the logout button set the logout function as a handler of onClick.

- At last i used loading state to show logout button if loading is false and spinner if it is true. 

### Setting login functionality

- Go to the login.jsx page and paste the following code in the file

```javascript
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const {loading, login} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
    
  }

<form onSubmit={handleSubmit}>

 <input
type="text"
placeholder="Enter username"
className="w-full input input-bordered h-10"
value={username}
onChange={(e) => setUserName(e.target.value)}
            />

 <input
type="password"
placeholder="Enter Password"
className="w-full input input-bordered h-10"
value={password}
onChange={(e) => setPassword(e.target.value)}
            />            

<button
className="btn btn-block btn-sm mt-2 text-black"
 disabled={loading}>
{loading ? 
(<span className="loading loading-spinner "></span>) : 
("Login")}
</button>
```
- The full code will look like as follows

```javascript
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> FandFChat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 text-black"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

```
- I create username and password state to store data provided by the user.

- From the use login hook i imported loading state and login function. Later we will see the code of useLogin hook.

- The handleSubmit function is used as onSubmit handler and call the login function and pass username and password to it.

- Inside the username and password input field  i added value tag and onChange handler.

- At last i used loading state in login button. 

- If the loading state is true the button will be disabled and show a spinner.

- If the loading state is false the button will show Login text. 

### useLogin hook

- Go to the hooks folder and create file name useLogin.js and paste the following code inside it. 

```javascript
import {useState} from 'react'
import toast from "react-hot-toast"
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
  const [loading, setLoading] = useState(false)

  const {setAuthUser} = useAuthContext()
  const login = async (username, password) => {
    const success = handleErrorInput(username, password)

    if(!success){
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({username, password})
      })

      const data = await res.json()

      if(data.error){
        throw new Error(data.error)
      }

      localStorage.setItem("chat-user", JSON.stringify(data))
      setAuthUser(data)

    } catch (error) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
    
  }
  
  return {loading, login}
}

export default useLogin

const handleErrorInput = (username, password) => {
  if(!username, !password){
    toast.error("Please fill in all the fields")
    return false
  }

  if (password.length < 6 ){
    toast.error("Password must be 6 character long.")
    return false
  }

  return true
}
```
- I declared loading state and initial value is set to false.

- From the authContext i called the setAuthUser function.

- I declared a asynchronous login function and passed username and password to it. 

- Then i passed the username and password to the handleErrorInput function. It will be discussed later.

- If the success variable is false then i return from here. 

- Then i set the loading state to true.

- Inside the try block i called the login route and post the username and password.

- Data received from backend has error then i throw the error otherwise set the data to the localStorage and in authUser state.

- Catch block show error message in toast.

- Finally block set loading state to false

- At last i return the loading state and login function.

- In the handleErrorInput i checked whether the username and password any input filed is blank then i show error toast and return false.

- Also if password is less then 6 characters then i also show error toast and return false.

- If everything is ok then i return true. 

- Now go to the ui and check whether you can login. 

### Creating global state using zustand

- I already created a global context for authUser and i can use it for several purpose but i want to use a library zustand managing other states, so that i can demonstrate my understanding in it also.

- Go to the src folder and create a folder with the name of zustand. You can name it store as well. Inside the folder create a file with the name of useConversation.js and paste the following code

```javascript
import { create } from 'zustand'

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),
  messages: [],
  setMessages: (messages) => set({messages})
}))

export default useConversation;
```

- I imported create function from zustand

- I declared useConversation variable and then called the create function.

- create function takes set as an argument in its callback and it will return an object and that will be out global state.

- First we had selectedConversation and it has a default value is null. 

- For selectedConversation state we have a setter function. Its name is setSelectedConversation. It takes selectedConversation as an argument and call the set function to update the selectedConversation state.

- Next we declared messages state with default value of empty array.

- Then the setter function setMessage takes messages as and argument and call the set function to update the messages states. 

### Getting user information for the sidebar

- For fetching user conversation data we will use a hook. Go to the hooks folder and create a file with the name of useGetConversations.js and paste the following code inside it

```javascript
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)

  const [conversations, setConversations] = useState([])
 
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/users")
        const data = await res.json()

        if(data.error){
          throw new Error(data.error)
        }

        setConversations(data)
      } catch (error) {
        toast.error(error.message)
      } finally{
        setLoading(false)
      }
    }

    getConversations()
  },[])
 
  return {loading, conversations}
}

export default useGetConversations;
```
- I created loading and conversation state. 

- Inside the useEffect hook i created getConversations asynchronous function.

- I set the loading state to true.

- Inside the try block i call the users route.

- If any error received then if block throw it.

- If data received correctly i store it inside the conversations block.

- Catch block show error message using toast. 

- Finally block set loading state to false.

- Then i called the getConversations function.

- Now go to the conversations.jsx file and paste the following to get data in the component.

```javascript
import useGetConversations from "../../hooks/useGetConversations";

const {loading, conversations} = useGetConversations()
	console.log(conversations)
```

- Check the browser console to ensure that data is indeed received. 

### Generating emojis for sidebar

- We will create a file that will store emojis and export a function what will generate random emojis from that file. We will show emoji beside the name of each user in the side bar later. 

- Go to the src folder create a folder with the name of utils and inside it create a file with the name of emojis.js and paste the following code inside it

```javascript
export const funEmojis = [
	"👾",
	"⭐",
	"🌟",
	"🎉",
	"🎊",
	"🎈",
	"🎁",
	"🎂",
	"🎄",
	"🎃",
	"🎗",
	"🎟",
	"🎫",
	"🎖",
	"🏆",
	"🏅",
	"🥇",
	"🥈",
	"🥉",
	"⚽",
	"🏀",
	"🏈",
	"⚾",
	"🎾",
	"🏐",
	"🏉",
	"🎱",
	"🏓",
	"🏸",
	"🥅",
	"🏒",
	"🏑",
	"🏏",
	"⛳",
	"🏹",
	"🎣",
	"🥊",
	"🥋",
	"🎽",
	"⛸",
	"🥌",
	"🛷",
	"🎿",
	"⛷",
	"🏂",
	"🏋️",
	"🤼",
	"🤸",
	"🤺",
	"⛹️",
	"🤾",
	"🏌️",
	"🏇",
	"🧘",
];

export const getRandomEmoji = () => {
	return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};
```
- funEmojis store emojis and export it. You can generate it using chat-gpt.

- getRandomEmoji function return a random emoji from the funEmojis array.

- We will call the getRandomEmoji function in the conversations component. 

### Passing data to the conversation component from the conversations components

- Go to the conversations component and paste the following code inside it


```javascript
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;
```
- Inside the div i mapped the conversations array and for each conversation i render the Conversation component and passed conversation to it.
- I also called getRandomEmoji function and passed as a emoji props and at last i passed last index. 

- Last index will be used to design the horizontal bar below each user name. Last index will help to identify the last user and for him the horizontal bar below it will not be displayed. 

- If the loading state is true then a spinner will show otherwise the Conversation components will render. 

### Setting dynamic value in the Conversation component

- Go to the Conversation.jsx file and paste the following code.

```javascript
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const {selectedConversation, setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id === conversation._id


  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation?.username}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {
        !lastIdx ? (<div className="divider my-0 py-0 h-1" />) : ""
      }
    </>
  );
};
export default Conversation;

```
- I received conversation, emoji, lastIdx from props. 

- I called the selectedConversation, setSelectedConversation from the useConversation hook that we created using zustand. 

- isSelected variable is true if the id inside selectedConversation and conversation match. It will be used in the div to change its background color.

- onClick handler is attached to the parent div to set the conversation in hte selectedConversation state. 

- profilePic inside conversation state is set as a source of image tag.

- Username and emoji is set in the respective fields.

- At last horizontal scroll bar i removed for the last item. 

### Message Container ui setup

- Go to the MessageContainer.jsx file and paste the following code

```javascript
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
	const  {selectedConversation, setSelectedConversation} = useConversation()

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] flex flex-col'>
		{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
```
- From zustand useConversation function  i imported selectedConversation and setSelectedConversation. 

- I called an useEffect hook to unmount the selectedConversation state. 

- If selectedConversation state has a value then header will show otherwise NoChatSelected component will render.

- NoChatSelected will show the user name dynamically and show a message in the ui. 


### Sending message functionality

- For sending message i used useSendMessage hook. 

- Go to the hooks folder and create a new file with the name of useSendMessage.js file and paste the following code

```javascript
import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage = () => {
 const [loading, setLoading] = useState(false)

 const  {messages, setMessages, selectedConversation} = useConversation()

 const sendMessage = async(message) => {
  setLoading(true)
  try {
    const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message})
    })
    const data = await res.json()
    if(data.error){
      throw new Error(data.error)
    }

    setMessages([...messages, data])

  } catch (error) {
    toast.error(error.message)
  } finally{
    setLoading(false)
  }
 }

  return {sendMessage, loading}

}

export default useSendMessage
```
- I declared loading state. 

- I imported messages, setMessages and  selectedConversation from useConversation.

- I declared a sendMessage asynchronous function that takes message as props.

- Initially i set the loading state to true.

- Inside the fetch i hit the send route and pass the receiver id as params and post message to the route.

- If any error received i throw it.

- Using setMessage function i set the new message int he messages together with earlier messages. 

- I returned sendMessage function and loading state at last. 

- Then go to the MessageInput.jsx component and paste the following code inside it

```javascript
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("")
	const {loading, sendMessage} = useSendMessage()

	const handleSubmit = async(e) => {
		e.preventDefault()
		if(!message) return;
		await sendMessage(message)
		setMessage('')
	}


	return (
		<form className='relative px-4 my-3'
		onSubmit={handleSubmit}
		>
			<div className='w-full'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white pe-10'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-5  flex items-center text-white  pe-3'>
					{loading ? <div className="loading loading-spinner"></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
```
- I declared message state and import loading state and sendMessage function from useSendMessage hook. 

- The handleSubmit asynchronous function takes event from the form and if message state is empty then return from here. 

- If message state store any value then it call the sendMessage function and pass message as a parameter. 

- At last the message state set to empty.

- handleSubmit function is set as an onSubmit handler in the form tag.

- In the input field message is set as a value and onChange handler is used to set the message in the message state. 

- At last if loading state is true then spinner will show otherwise send button will show. 

- Now check the whether the function is working properly. 

### Designing message skeleton

- Go to the component folder and create a folder with the name of skeletons and inside it create a file with the name of MessageSkeleton.jsx and paste following code inside it.

```javascript
const MessageSkeleton = () => {
	return (
		<>
			<div className='flex gap-3 items-center'>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
			</div>
			<div className='flex gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
				</div>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};
export default MessageSkeleton;
```
- The above code is copied from daisy ui. So you can check there website also if you wish.

### Getting messages using getMessage hook

- In order to display messages in the ui i have to fetch them from the database. I used hooks for that.

- Go to the hooks folder and create file with the name of useGetMessages.js and paste the following code inside it.

```javascript
  import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)

  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`)
        const data = await res.json()
        if(data.error){
          throw new Error(data.error)
        }
        setMessages(data)

      } catch (error) {
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
  if(selectedConversation?._id) getMessages()
  },[selectedConversation?._id, setMessages])

return { messages, loading }

}

export default useGetMessages
```
- I declared loading state.

- I imported  messages, setMessages and  selectedConversation from useConversation hook.

- Inside useEffect hook i declared getMessages asynchronous function.

- Initially i set the loading state to true.

- Inside the fetch i hit messages route and send the id of the  person with whom user will make conversation. 

- Data received from the server is set to the messages state.

- If our user select any user for conversation that time getMessages function will be called.

- Each time user will change the person with whom the he want to chat the useEffect will run and fetch data from the server.

- At last the messages and loading state is returned from the component.


### Getting data inside Messages component and passing data to Message component.

- Go to the Message.jsx file and paste the following code inside it.

```javascript
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;

```
- I imported messages and loading state from useGetMessages hook.

- If loading state is false and there are messages in the messages array that time the array will be mapped and for each message the Massage will render with the message will be passed as props. 

- If loading state is true then MessageSkeleton will run three time.

- If loading state is false and there is no message in the messages array that time a p tag will render that will "Send a message to start the conversation" text in the ui. 

### Creating time conversion function

- I have to show the time below each message in the ui. The database store full date time string. I have to convert it to a simple one. For that reason i created following component.

- Go to the utils folder and create a file with the name of extractTime.js and paste following code.

```javascript
export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}
```

- The extractTime function takes dateString as a props. It will be passed from the component where the function  will be called.

- The function is created using chatgpt. The dateString props is the date value stored in the MongoDB and the function return hours and minutes from it.


### Populating data in the message component

- Go to the Message.jsx file and paste the following code 

```javascript
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
```
- The component takes message props that was passed by the Messages component.

- The authUser state is imported from useAuthContext hook.

- The selectedConversation state is imported from useConversation hook.

- fromMe variable will be true when senderId in the message and authUser id match. It will be required  designing ui.

- formattedTime variable holds value of extracted time from the createdAt value. 

- If message is from the user then chatClassName store chat-end daisy ui class otherwise store chat-start class.

- If message is from the user then profilePic store picture from authUser state  otherwise store picture from selectedConversation state.

- If message is from the user then bubble background color is store as blue-500 in the bubbleBgColor variable  otherwise is set null.

- If shouldShake property inside the message is true then shakeClass will store shake animation otherwise null. We will add the css later in the the global.css file. 

- Inside return statement all the classes is applied in the jsx.

### Setting automatic scroll down to the message component

- If messages become long that time our scroll bar stay at top. In order to go to the latest message user have to scroll down manually. Now i will make sure that the scroll bar should automatically down along with new messages.

- First go to the Messages.jsx file and paste following code

```javascript
const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}
					ref={lastMessageRef}
					>
```

- Above are the partial code.

- I initiated a useRef hook and name it lastMessageRef.

- Inside the useEffect hook i created a setTimeout function that will run after 100 milliseconds. 

- Inside the setTimeout function i wrote code to make sure that the scrollbar move along with lastMessageRef.

- The useEffect hook as a dependency of messages. So each time the messages array will change the useEffect will run. 

- In the div where inside that Message component is rendering i link the lastMessageRef. So each time a new message will appear the lastMessageRef will change and the useEffect will run and the scrollbar will go down. 

### Making search input field functional

- Go to the SearchInput.jsx file and paste the following code

```javascript

import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};


	return (
		<form className='flex items-center gap-2'
	onSubmit={handleSubmit}
		>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' 
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;
```
- I created a search state to store the string that user will search. 

- setSelectedConversation is imported from the useConversation hook.

- handleSubmit function takes event from the form. 

- It check whether the search state is empty. If it is empty return from here.

- Then it check whether the search word is less than 3 letters then it show an error toast and return from here.

- Then a simple algorithm is used to find out the search item.

- First the a search operation is done on the conversation array and for each conversation the fullName property is first converted to lower case then the search state value is converted to lower case and check that the fullName property includes the search value. If there is any match it is stored inside the conversation variable.

- If search item matched then it is set to the selectedConversation and search field is cleared. Otherwise error toast is shown.

- Inside the form tag the handleSubmit function is attached to the onSubmit handler.

- search state value is set as value in the input field and onChange handler attached to the input field. 

### Creating socket server at the backend

- Go to the backend folder and create a new folder with the name of socket and inside it create a file name socket.js and paste the following code

```javascript
import { Server } from "socket.io"
import http from 'http'
import express from "express"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors:{
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
})

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}


io.on("connection", (socket) => {
  console.log("New user connected", socket.id)

  const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id)
    delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
})


export {app,io, server}
```
- I imported Server from socket.io, http from http and express from express.

- I initialize the express and store it inside app.

- I created a http server and pass express server to it and store it inside server variable.

- In the io variable i create a new server and passed the earlier created server to it. As socket provide some error so i added cors inside and object and cors value is also an object. It has origin property and it takes an array of url. At present we have localhost 3000. The methods property has get and post inside an array.

- The getReceiverSocketId is a function that takes receiverId and return the socket Id. It will be required when we will send message to the user. 

- I created a variable with the name of userSocketMap that hold an object. Its property name is userId and value is socketId. It will be required to get specific user message in later. 

- The io.on is used for listening for a connection. Inside it there is a callback function and it takes socket that store various properties and one of it is id. Inside the callback function i console log a message together with user socket id. 

- From the frontend the userId will be send as a query parameter. So inside the userId variable the userId is destructured from the query params. 

- Then if user id is not undefined then socket id will be pushed to the userSocketMap object together with the userId. So we can now link the userId with the socketId.

- Then io.emit broadcast to every user that those who are online and send the keys of userSocketMap that contains userId.

- For disconnecting again i used socket.on and a string "disconnect". Then a callback is used that console log a messaged an show the socket id of user who disconnected.

- Then the person who has been disconnected his id has been deleted from the userSocketMap

- Then io.emit broadcast to every user that those who are online and send the keys of userSocketMap that contains userId.

- At last i exported the app, io and server so that they can be used in our file as well.

- Now go to the server.js file and delete "const app = express()" from it as it is initiate and in the socket.js file. Add following line at the top of the file

```javascript
import { app, server } from "./socket/socket.js"
```
Instead of app.listen use server.listen.

### Implementing socket.io in the sendMessage controller

- Go to the message.controller.js file and inside the sendMessage function after await Promise.all paste following code

```javascript
await Promise.all([conversation.save(), newMessage.save()])

    // SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
    res.status(201).json(newMessage)
```
- I called the getReceiverSocketId and pass the receiverId it and it will return us receiverSocketId that i stored inside receiverSocketId variable.

- Then i checked if there is a value inside receiverSocketId then the newMessage will be emitted to that particular receiver so no one else can see that message. 

### Creating global context for socket and connecting socket at the front end

- Go to the frontend folder and then go to the context folder inside src folder. Create a new file with the name of SocketContext.jsx and paste the following code inside it. 

```javascript
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"

const SocketContext = createContext()

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const {authUser} = useAuthContext()

  useEffect(() => {
    if(authUser){
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser._id
        }
      })

      setSocket(socket)

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users)
      })

      return () => socket.close()

    } else{
      if(socket){
        socket.close()
        setSocket(null)
      }
    }
  },[authUser])

  return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
}

```
- I created a context with the name of SocketContext and exported it.

- I create a hook to use the SocketContext. The hook will be called in other components.

- Then i created SocketContextProvider function and it takes children as props.

- I created socket and onlineUsers state.

- From the useAuthContext hook i imported authUser state.

- Inside the useEffect hook first i check if there is an authUser then i connect to the socket and in the connection i passed the authUserId as a query parameter that will be used by backend to connect socket id with it. 

- Then i stored the socket inside the socket state. 

- Then i connected to the socket listen for "getOnlineUsers" message. When the message is broadcast i receive the value and passed as a parameter of the callback and then inside the function i set it inside the onlineUsers state. 

- Then i run the cleanup function. So when user is not in the page the socket connection will be closed. 

- In the else block i check if there is a socket connection is on then i close it and set the socket state to null.

- I added the authUser as a dependency of the useState so that whenever the authUser state will change the useEffect will run. 

- At last i returned the socket and onlineUsers state as a value of the SocketContext Provider. 

### Showing online user status

- Now based on the user who are online i will show the online status icon in the ui.

- For that go to the Conversation.jsx file and add following line in the file

```javascript
import { useSocketContext } from "../../context/SocketContext";


  const { onlineUsers } = useSocketContext()

  const isOnline = onlineUsers.includes(conversation._id)

<div className={`avatar ${isOnline? "online" : "" }`}>
```
- The onlineUsers state is imported from the useSocketContext hook.

- Then i check the onlineUsers state includes the conversation id of the user. This means the use is online and it is stored inside the isOnline variable. 

- Then in the jsx i conditionally render the daisy ui online class. 

- The full code will look like as follows

```javascript
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const {selectedConversation, setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id === conversation._id

  const { onlineUsers } = useSocketContext()

  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline? "online" : "" }`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation?.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {
        !lastIdx ? (<div className="divider my-0 py-0 h-1" />) : ""
      }
    </>
  );
};
export default Conversation;

```

- Now check by yourself that the online status is showing in the ui. 

### Using hooks to get chat messages between users

- Go to the hooks folder and create a new file with the name of useListenMessages.js and paste the following code 

```javascript
import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
```
- I imported a notification sound from the sound folder which is located inside the assets folder. You also need to store notification sound over there. You can download it from the internet. 

- I imported socket from useSocketContext hook and messages and setMessages from useConversation hook.

- Inside the useEffect hook i connected socket to listen for newMessage. 

- When a newMessage is broadcast from the server it is passed to the callback as an argument and inside teh function a new property with the name of shouldShake is added and its value is set to true. So when the the messages will be displayed in the ui the shaking class will be applied on it. 

- Inside the sound variable notificationSound is stored. Then the sound is played.

- Then newMessages is added at the bottom of messages array.

- A clean up function is run at last. Without it the notification sound will play several times. 

- The use effect has three dependencies socket, setMessages and messages. 

### Calling useListenMessages hook inside the Messages component

- Go to the Messages.jsx file and paste the following line to call the hook


```javascript
import useListenMessages from "../../hooks/useListenMessages";


useListenMessages()
```
- Now open two browser window and login two user account and send message between them to make sure that the messages are receiving immediately or not. 

### Shake animation for the new message

- Go to the index.css file and paste the following css code for shake animation
```javascript
/* SHAKE ANIMATION ON HORIZONTAL DIRECTION */
.shake {
	animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0.2s both;
	transform: translate3d(0, 0, 0);
	backface-visibility: hidden;
	perspective: 1000px;
}

@keyframes shake {
	10%,
	90% {
		transform: translate3d(-1px, 0, 0);
	}

	20%,
	80% {
		transform: translate3d(2px, 0, 0);
	}

	30%,
	50%,
	70% {
		transform: translate3d(-4px, 0, 0);
	}

	40%,
	60% {
		transform: translate3d(4px, 0, 0);
	}
}
```

### Preparing the project for deployment

- We have to setup our server before deployment. We just cannot drag and drop. It will not work. 

- Go to the server.js file and paste following code  

```javascript
import path from "path"

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get('*', (req, res) => {
  res.send(path.join(__dirname, "frontend", "dist", "index.html"))
})
```

- From node module i imported path that will be used later.

- I created a variable with the name of __dirname. Inside it path.resolve() is a Node.js function that resolves the full path of a file or directory. When called without arguments, it returns the absolute path of the current working directory.

- Then i used a middleware where static middleware from express is used and it is used to serve static files like html, css, js, image, sound files etc that we have in our frontend application. So it join the root path that we stored earlier inside the __dirname variable with the frontend folder and inside that dist folder. 

- The app.get function make sure that if anyone hit a route except three api route that we created earlier will serve index.html file

- Now go to the package.json file inside the root directory and paste following inside the script file

```javascript
 "scripts": {
    "server": "nodemon backend/server.js",
    "start": "node backend/server.js",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
  },
```

- The build script initially install necessary packages for the backend, then it will go to the frontend folder and look at package.json file and install necessary packages and last inside the frontend folder it will build. 

- Now go to the terminal and make sure you are at the root and then paste the following code and hit enter.

```javascript
npm run build
```

- Then write following at the terminal and hit enter

```javascript
npm start
```

- Now open the browser at localhost 5000 because both the frontend and backend are running at the same port. Check whether you can login and chat at that port. 

### Create a github repo

- For deploying the project in render you will need a github repo. So create a github repo and push the project over there. 

### Deploying the project in render

- Go to the render.com

- Create a free account if you do not have one. 

- You should automatically redirected to the dashboard after signup. If not go to the dashboard. 

- Click New button and inside it select Web Service.

- Select Build and deploy from a Git repository and click Next. 

- Connect your github account. Authorize render. 

- Your repositories should shown. If shown select it otherwise copy the link of your repository and paste it inside the bottom input field and click continue button.

- Keep the name and other field as it is. In the Build Command field change it from npm install to npm run build also change the Start Command from npm start to npm run start.

- Select the free tire. 

- Add the environment variables. 

- Then create the "Create Web Service" button

- After deployment at the top of the page you will get your website link. Copy it.

- Go to the SocketContext.jsx file and change the url link from local host to live link.

- Go to the socket.js file and inside the cors add the live link inside the array. 

- Push the code in the github.

- Go to the render site. Click Manual Deploy button and select Deploy latest commit. 

- After deployment use the site. 