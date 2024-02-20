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

### Creating message and conversation route

- Go to the server.js file and create two new route for message and conversation. The code will be as follows

```javascript
import messageRoutes from "./routes/message.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";

app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);
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

- I also extracted sender id from req.user.\_id. In the protectRoute middleware function the user info stored inside req.

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
<a className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block  text-white" href="#">
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

```javascript

```

```javascript

```

```javascript

```

```javascript

```
