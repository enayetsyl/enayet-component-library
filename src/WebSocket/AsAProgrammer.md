# "Building F&F Chat: A Comprehensive Guide to Creating a Real-Time Chat Application with React, Socket.IO, and Render"

### Introduction:

As a passionate learner diving into the world of software development, I recently embarked on a journey to create a simple chat app. This project served as an exciting opportunity for me to apply my burgeoning skills and delve deeper into the realm of app development. Along the way, I encountered challenges, made discoveries, and ultimately crafted a functional chat application. Now, I'm thrilled to share my experiences and learnings with fellow enthusiasts and aspiring developers.

### Thing you will learn

- By immersing oneself in the F&F Chat application and accompanying blog post, aspiring programmers can embark on a comprehensive journey through the realms of full-stack web development. On the frontend, the project harnesses the power of React, a popular JavaScript library for building user interfaces, alongside React Router DOM for efficient client-side routing. State management is facilitated by Zustand, offering a lightweight yet powerful solution for managing global application state. The frontend also incorporates various UI enhancements through libraries like React Icons and DaisyUI for sleek and responsive user interfaces. 

- On the backend, Node.js and Express form the foundation of a robust server, while MongoDB with Mongoose provides seamless data storage and retrieval capabilities. Security features such as user authentication and authorization are implemented using JWT and bcrypt, ensuring secure communication and data integrity. Additional backend functionalities, including middleware for request parsing and environment variable management via dotenv, further enrich the development experience. 

- By exploring this amalgamation of frontend and backend technologies, developers can gain invaluable insights into the intricacies of full-stack web development and hone their skills for building dynamic and scalable web applications.

### Useful links

- For generating glassmorphism https://tailwindcss-glassmorphism.vercel.app/

- Creating avatar https://avatar-placeholder.iran.liara.run/

### Parent folder added

- Create a folder for your project in the desired location and open it in VS Code.

- Within this folder, create two subfolders named "frontend" and "backend".

### Creating a react project

- Open the terminal and navigate to the "frontend" folder.

- Run the following command in the terminal:

```javascript
npm create vite@latest .
```

- This command initializes a new React project inside the "frontend" folder. The dot indicates that the installation will be in the current directory.

- Follow the prompts to select React as the framework and JavaScript as the variant.

- After the initialization is complete, install dependencies by running the following command:

```javascript
npm i
```

- Once the installation is finished, start the development server by entering the following command in the terminal:

```javascript
npm run dev
```

- Open the provided link in your browser to view the React application.

### Creating a node project

- We will install the node in the root folder not inside the backend folder. It will help us in deployment. We can run both frontend and backend from the root easily.

- Navigate to the root folder by entering the following command in the terminal:

```javascript
cd ..
```

- This command takes us from the frontend folder to the root folder.

- Initialize a new Node.js project by running the following command:

```javascript
npm init -y
```

- Open the package.json file and modify the value of the main property from index.js to server.js.

- Inside the backend folder, create a file named server.js.

### Installing necessary packages for the server

- Install the required packages by entering the following command:

```javascript
npm i express dotenv cookie-parser bcrypt mongoose socket.io jsonwebtoken nodemon
```

- express: Used for creating the server.
- dotenv: Utilized for reading data from the .env file.
- cookie-parser: Used for parsing information from cookies.
- bcrypt: Employed for password hashing.
- mongoose: Used for database connection and model creation.
- socket.io: Utilized for the chat app.
- jsonwebtoken: Used for generating tokens.
- nodemon: Automatically restarts the server whenever there are changes in the server.js file.

- Update the package.json file as follows:

```javascript
"scripts": {
    "server": "nodemon backend/server.js"
  },
  "type": "module",
```

- The first script ensures that running npm run server in the terminal opens the server.js file inside the backend folder.

- The second script converts the system from CommonJS to ES6, allowing the use of import instead of require. Ensure to include the file extension after the path.

### Creating an express server

- Inside the server.js file  paste the following code:

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

- Create a file named .env in the root directory and paste the following code into it:

```javascript
PORT = 5000;
```

### Creating routes folder and auth routes file.

- Within the backend folder, create a folder named "routes".

- Inside the "routes" folder, create a file named "auth.routes.js" (you can choose any name, but it should reflect the purpose of containing authentication-related routes).

- Paste the following code into the "auth.routes.js" file:

```javascript
import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Login route");
});
export default router;
```

- In the server.js file, add the following two lines:

```javascript
import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);
```

- Here's the explanation

  - In the auth.routes.js file, express is imported, and a router function is initiated.

  - A GET route named "login" is created with a callback function. Later, the callback function will be moved to another file.

  - The router is exported so it can be used in other files, like server.js.

  - In the server.js file, the authRoutes from auth.routes.js are imported, and a middleware function is used.

  - In the browser the full route will be http://localhost:5000/api/auth/login

  - If more routes are added inside auth.routes.js, they will automatically be prefixed with /api/auth.

  - Inside auth.routes.js, you can create GET, POST, PATCH, PUT, DELETE routes if necessary.

### Creating a controller folder and file

- For maintaining clean code, scalability and understandability we will separate the callback function of the route path that we watched earlier.

- Within the backend folder, create a folder named "controllers".

- Inside the "controllers" folder, create a file named "auth.controller.js" (this name indicates that the file contains authentication-related controller code).

- Write the following code inside the "auth.controller.js" file:

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

- Explanation of the code:
  - Inside the auth.controller.js file, we've created a function named login. Currently, it sends a simple message, but later, we'll add the full functionality to it.

  - Next, we import the login function from auth.controller.js into the auth.routes.js file.
  
  - In the router.get method, we replace the previous callback function with the login function. This maintains the same functionality while making the code more readable and organized.

### Creating workspace in postman

- Open the postman app.

- Click the "Workspace" button, then select "Create Workspace".

- Click "Next", then enter the name of the project and click "Create".

- Create a new collection named "AUTH".

- Next to the collection name, click the three dots (...), then select "Add Request".

- Rename the request to "SIGNUP" and change the method from GET to POST.

- Set the request URL to:
  http://localhost:5000/api/auth/signup

- Click the "Body" tab, select the "raw" radio button, and choose "JSON" from the dropdown.

The setup is now complete.

### Creating mongodb connection

- Go to your MongoDB account and create a user ID and password. Paste these credentials into the .env file.

- Copy the connection string from your MongoDB account by navigating to Database -> Connect -> Drivers. The connection string will resemble the following:

```javascript
mongodb+srv://<username>:<password>@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority
```

- Paste the connection string in the .env file as the value of the MONGO_DB_URI property. Replace <username> and <password> with your actual username and password.

- After .net/ in the connection string, write your database name.

- The .env file should look like this:

```javascript
mongodb+srv://FandFChat:qFy5dtjq25upW8qs@cluster0.ktgpsav.mongodb.net/FandFChat?retryWrites=true&w=majority
```

- Inside the backend folder, create a folder named db. Within that folder, create a file named connectToMongoDb.js, and paste the following code into it:

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

- In the server.js file, import the connectToMongoDb function and call it inside the callback function of the app.listen function:

```javascript
import connectToMongoDb from "./db/connectToMongoDb";

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server Running on port${PORT}`);
});
```

### Creating model for user

- Inside the backend folder, create a folder named models.

- Within the models folder, create a file named user.model.js. This file will be used to define the model for the user.

- Paste the following code inside the user.model.js file:

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
- Explanation:
  
  - We imported mongoose.

  - We import mongoose to define the schema and model.
  
  - The userSchema contains fields such as fullName, username, password, gender, and profilePic.
  
  - The username field is marked as unique to ensure each username is unique.
  
  - The password field is set to have a minimum length of 6 characters.
  
  - The gender field uses an enum to restrict values to "male" or "female".
  
  - The profilePic field has a default value of an empty string.
  
  - We use timestamps: true to automatically add createdAt and updatedAt timestamps to the documents.

### Middleware to extract json data

- In the server.js file, add the following middleware code:

```javascript
app.use(express.json());
```

- This middleware will parse data from the JSON payload (req.body).

### Getting image based on user name

- Go to the following link

https://avatar-placeholder.iran.liara.run/

- In the document section, navigate to "Avatar image based on username".

- Copy the following link provided:

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

- I imported the necessary dependencies: bcrypt for password hash and User model.

- Request body parameters (fullName, username, password, confirmPassword, gender) are destructured from the incoming request.

- Password confirmation is performed to ensure the entered passwords match.

- A check is made to see if a user with the provided username already exists in the database.

- If user already exist that means he want to signup for second time so return him from here.

- If no user exist then i start processing of saving user information in the database.

- Password hashing is done using bcrypt.

- Avatar image URLs are generated dynamically based on the provided username

- Then using mongoose model i created a newUser object for saving in the database.

- A new User object is created using the Mongoose model, with hashed password and dynamically generated profile picture URL.

- The new user is saved to the database.

- If successful, a response with a status code of 201 (Created) is sent back to the frontend, containing the user's _id, fullName, username, and profilePic.

- Error handling is implemented, logging any errors and sending a 500 (Internal Server Error) response to the frontend in case of an error.

- Now using postman you can send a post request and check whether the route is working.

### Generating token to verify user

- In the backend folder, create a new folder named utils.

- Inside the utils folder, create a file named generateToken.js.

- Open the terminal and run the following command:

```javascript
openssl rand -base64 32
```

- Copy the generated code and paste it inside the .env file with the name JWT_SECRET.

- Paste the following code inside the generateToken.js file:

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

- jwt.sign() generates a token using the userId and JWT_SECRET, with an expiration time of 15 days.

- The token is set as a cookie in the response with a maximum age of 15 days.

- Security features such as httpOnly and sameSite are applied to protect against XSS and CSRF attacks.

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

- This code defines a new POST route for the /login endpoint, with the login function from the auth.controller.js file handling the request.

### Creating login Controller

- Open the auth.controller.js file.

- Locate the signup function and paste the provided code snippet below it.

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

- The function login is correctly defined as asynchronous (async).

- The username and password are extracted from the request body (req.body).

- The user is queried from the database using the provided username.

- Bcrypt is used to compare the provided password with the hashed password stored in the database.

- Proper error handling is implemented to handle cases where the user does not exist or the password is incorrect.

- Upon successful authentication, a token is generated and set to the cookie.

- User information (ID, full name, username, profile picture) is returned as a response upon successful login.

- Error logging and appropriate error responses are provided.

- Using the postman you can check whether you can login or not.

### Logout functionality

- Open the auth.routes.js file.

- Create a new route for logout:

```javascript
import { login, logout, signup } from "../controllers/auth.controller.js";

router.post("/logout", logout);
```

- Next, go to the auth.controller.js file and paste the following code for the logout function:

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

- The /logout route is correctly defined in the auth.routes.js file.

- The logout function in the controller clears the JWT cookie by setting its maxAge to 0, effectively logging the user out.

- A success message is sent to the frontend upon successful logout.

- Error handling is implemented to catch and log any errors that may occur during the logout process.

- Proper status codes (200 for success, 500 for internal server error) are returned.

- Check it using postman.

### Creating message model

- Navigate to the models folder in your project.

- Create a new file named message.model.js.

- Paste the following code into the file to define the message model:

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

- The message model is defined using Mongoose schema.

- Three fields are included in the schema: senderId, receiverId, and message.

- Both senderId and receiverId are defined as ObjectId types, referencing the User model.

- The message field is defined as a String type.

- All fields are marked as required.

- The timestamps: true option automatically adds createdAt and updatedAt fields to the document.

### Creating conversation schema

- Create a new file named conversation.schema.js in your project's models folder.

- Paste the following code into the file:

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

- The conversation schema is defined using Mongoose schema.

- Two fields are included in the schema: participants and messages.

- participants is an array of ObjectId types, referencing the User model.

- messages is an array of ObjectId types, referencing the Message model. It has a default value of an empty array.

- The timestamps: true option automatically adds createdAt and updatedAt fields to the document.

### Creating message and users route

- Open your server.js file.

- Create routes for messages and users as follows:

```javascript
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes)
```

- Ensure that you import the route paths correctly.

- Now, navigate to the routes folder and create a new file named message.routes.js.

- Paste the following code into message.routes.js:

```javascript
import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

export default router;
```

- The express.Router() is used to create a router instance for managing routes.

- A dynamic route /send/:id is created to send messages based on the user ID.

- The protectRoute middleware is applied to the /send/:id route to ensure that only verified users can access it.

- The sendMessage controller function is used to handle sending messages.

- The router is exported for use in the application.

### Setting middleware at the backend

- Open your server.js file.

- Call cookieParser as middleware to parse cookies:

```javascript
import cookieParser from "cookie-parser";

app.use(cookieParser());
```

- Create a new folder named middleware inside the backend folder.

- Inside the middleware folder, create a new file named protectRoute.js.

- Paste the following code into protectRoute.js:

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

- Here, we imported jwt from the JSON Web Token library."

- Inside the try block first we parsed the logged in user token from the cookie.

- If no token is available we return from here.

- If token is available we verify it using token and JWT_SECRET.

- If decoded token is not correct then we return from here.

- If the decoded token is correct, we retrieve the user's information from the database based on the user ID stored in the token.

- If no user exist in database then i return from here.

- If user is available then i add the user information without password as a property of req.

- Then, I call the next() function to allow other server activities to be performed for the verified user.

- If an error occurs, the catch block will detect it, log it to the console, and send an appropriate response to the frontend.

### Creating send message controller

- Navigate to the controllers folder in your project.

- Inside the controllers folder, create a new file named message.controller.js.

- Paste the provided code into message.controller.js:

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

- Based on the sender and receiver IDs, I searched the database to determine whether there is an existing conversation between them.

- If there is no existing conversation between them, a new conversation is created in the database.

- Then, I created a new message and added its ID to the conversation's messages array.

- I then save the conversation and new message to the database in parallel.

- Finally, I send the new message to the frontend.

- In the catch block, I log any errors to the console and send an error message to the frontend.

- Now check whether you can send message using postman.

### Creating get message controller

- Navigate to the message.controller.js file.

- Below the sendMessage controller function, paste the following code:

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

- From req.params, I extracted the ID of the user with whom our sender is chatting.

- Then, I extracted the sender's ID from req.user.

- Based on both IDs, I searched the database to find the conversation between them.

-  Using the populate function, I asked MongoDB to provide me with the actual message instead of the message ID.

- If no conversation is found between them, an empty array is sent.

- If a conversation is found, all the messages are sent to the frontend.

- Check them using postman.

### Installing tailwind at frontend

- Navigate to the frontend folder:

- Open your terminal and change directory to your frontend folder where your package.json file is located.

- Make sure you are in frontend folder. Open the terminal and paste the following code

```javascript
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Open the tailwind.config.js file and replace its contents with the following code:

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

- Open the index.css file (or any other main CSS file in your project) and replace its contents with the following code:

```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Run the development server to ensure everything is ok.

### Installation of daisy.ui

- Open your terminal in the frontend folder and run the following command:

```javascript
npm i -D daisyui@latest
```

- Open the tailwind.config.js file and update the plugins section to include Daisy UI:

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

- Open the App.jsx file (or your main component file) and replace its contents with the following code:

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

- Run your development server and verify that the buttons render correctly with the Daisy UI styles.

If everything is set up correctly, you should see buttons styled as shown in the provided image.
  ![button](/public/button.png)

- Once you have confirmed that Daisy UI is working as expected, you can delete the sample buttons from your App.jsx file.

### Installing necessary packages for frontend

- Now we will install react icons and for that open your terminal and make sure you are in the frontend folder. Then, run the following command:

```javascript
npm install react-icons --save
```

- Now we will install react hot toast and for that open your terminal and make sure you are in the frontend folder. Then, run the following command:

```javascript
npm install react-hot-toast
```
- Open the App.jsx file and add the <Toaster /> component from react-hot-toast at the bottom of the file:

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

- Run the following command in the terminal to install Zustand:

```javascript
npm install zustand
```

- Now i will install socket for client side for chat. 

- Run the following command in the terminal

```javascript
npm i socket.io-client
```

### Setting the background image for whole app

- Open the app.css file in your project and add the following CSS code:

```javascript
body{
  background-image: linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url("../public/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
```

- Make sure you have an image named bg.jpg in the public folder of your project. If you have a different image file or format, adjust the filename accordingly in the CSS code.

- This CSS code sets the background image for the body element, adds a linear gradient overlay for better contrast, ensures the image covers the entire viewport, and fixes the background position.

- Save your changes and run your development server. Open your app in the browser and verify that the background image is displayed as expected.

### Creating a folder structure

- Inside the src folder, create a new folder named pages.

- Inside the pages folder, create three new folders: home, login, and signup.

- Inside each of the home, login, and signup folders, create a new JSX file. You can name these files according to the component they represent, such as Home.jsx, Login.jsx, and Signup.jsx.

- Back in the src folder, create a new folder named components.

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

- Open the index.css file and paste following code. It will make a nice looking scroll bar.

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

- I imported BrowserRouter from react router dom and then wrap the app component with the BrowserRouter component.

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

- I also defined the path for Home, Login and Signup component and call the page here inside Route component.



### Changing port to 3000 for frontend

- Go to the vite.config.js file and after plugins create a new property with the name of server and inside it create a property with the name of port and provide its value 3000.

- Now check the browser to see if your project is running on port 3000.

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

- Now check the browser to see if you can toggle between the login and signup pages.

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

- handleSubmit function will take the form value for now and console log it. Later, we will post the data to the backend.

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

- Then i called the handleInputErrors function is a helper function used to validate form inputs. I passed the props to it to check whether everything is ok. We will discuss about it later. 

- If error found then the function returns from here. 

- If everything ok then loading state set to true and a post request send to the backend.

- The loading state is used to indicate whether the signup process is in progress, which can be helpful for displaying loading spinners or disabling form inputs during the process.
 
- In the url full url is not mentioned. for that you need to configure vite.config.js file. Go to that file and paste following code inside it

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

- Navigate is used from React Router to perform redirection.

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

- The loading state is derived from the useSignup hook, which was previously implemented to handle signup functionality and manage the loading state.

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
- The useLogout hook is used to handle the logout process, including making a request to the backend API to log out the user and updating the authentication state.

- I set loading state and imported setAuthUser from authContext. 

- I created an asynchronous logout function.

- Initially loading state set to true.

- Using fetch the logout route hit.

- From the localStorage the chat user is removed and authUser is set to null.

- Error block shows error message using toast.

- Finally loading state is set to false.

- At last the loading state and logout function is returned. 

- Now go to the LogoutButton component and import loading state and logout function using useLogout hook. 

- Inside the logout button, set the logout function as the onClick handler.

- At last i Use the loading state to conditionally render either the logout button or a spinner.

- With these changes, the logout functionality will be implemented with proper loading feedback for the user

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
  if(!username || !password){
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

- onClick handler is attached to the parent div to set the conversation in the selectedConversation state. 

- profilePic inside conversation state is set as a source of image tag.

- Username and emoji is set in the respective fields.

- Finally, the horizontal scroll bar is removed for the last item. 

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
- I imported selectedConversation and setSelectedConversation from the Zustand useConversation function. 

- I used a useEffect hook to handle unmounting of the selectedConversation state.

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

- If any error received, i throw it.

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

- Finally the message state set to empty.

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

- In the io variable i create a new server and passed the earlier created server to it. Since sockets may provide some errors, I added CORS inside an object, and the CORS value is also an object. It has origin property and it takes an array of url. At present we have localhost 3000. The methods property has get and post inside an array.

- The getReceiverSocketId is a function that takes receiverId and return the socket Id. It will be required when we will send message to the user. 

- I created a variable with the name of userSocketMap that hold an object. Its property name is userId and value is socketId. It will be required to get specific user message in later. 

- The io.on is used for listening for a connection. Inside it there is a callback function and it takes socket that store various properties and one of it is id. Inside the callback function i console log a message together with user socket id. 

- From the frontend the userId will be send as a query parameter. So inside the userId variable the userId is destructured from the query params. 

- Then if user id is not undefined then socket id will be pushed to the userSocketMap object together with the userId. So we can now link the userId with the socketId.

- Then io.emit broadcast to every user that those who are online and send the keys of userSocketMap that contains userId.

- For disconnecting, I used socket.on and listened for the event string 'disconnect'. Then a callback is used that console log a messaged an show the socket id of user who disconnected.

- Then the person who has been disconnected his id has been deleted from the userSocketMap

- Then io.emit broadcasts to every user to show those who are online and sends the keys of userSocketMap that contain userIds.

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

- Open the index.css file and paste the following css code for shake animation
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

- We import the path module from node, which we'll use later.

- I created a variable with the name of __dirname. Inside it path.resolve() is a Node.js function that resolves the full path of a file or directory. When called without arguments, it returns the absolute path of the current working directory.

- Then i used a middleware where static middleware from express is used and it is used to serve static files like html, css, js, image, sound files etc that we have in our frontend application. So it join the root path that we stored earlier inside the __dirname variable with the frontend folder and inside that dist folder. 

- The app.get function ensures that any route, except the three API routes we created earlier, serves the index.html file.

- Now, in the package.json file at the root directory, add the following scripts:

```javascript
 "scripts": {
    "server": "nodemon backend/server.js",
    "start": "node backend/server.js",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"
  },
```

- The build script first installs the necessary packages for the backend. Then it goes to the frontend folder, installs necessary packages mentioned in its package.json file, and finally builds the frontend application.

- In the terminal, navigate to the root directory and execute the following command:

```javascript
npm run build
```

- Then, start the server by running:

```javascript
npm start
```

- Now, open your browser and navigate to localhost:5000. Since both the frontend and backend are running on the same port, you should be able to log in and start chatting.

### Create a github repo

- Create a GitHub repository for deploying the project on Render. Push the project to the GitHub repository.

### Deploying the project in render

- Go to the render.com

- Create a free account if you do not have one already.

- You should be automatically redirected to the dashboard after signing up. If not, navigate to the dashboard manually. 

- Click on the "New" button and select "Web Service" from the options.

- Choose "Build and deploy from a Git repository" and click "Next".

- Connect your GitHub account and authorize Render.

- Your repositories should be displayed. If they are, select yours; if not, copy the link to your repository and paste it into the bottom input field. Then, click the "Continue" button.

- Keep the name and other fields as they are. In the "Build Command" field, change it from "npm install" to "npm run build", and also change the "Start Command" from "npm start" to "npm run start".

- Select the free tire. 

- Add the environment variables. 

- Then, click the "Create Web Service" button.

- After deployment, at the top of the page, you will find your website link. Copy it.

- Go to the SocketContext.jsx file and change the URL link from "localhost" to the live link.

- In the socket.js file, add the live link to the CORS array.

- Push the code in the github.

- Go back to the Render website. Click the "Manual Deploy" button and select "Deploy latest commit".

-After deployment, you can use the site 

### Live site link

https://fandfchat.onrender.com/

### Conclusion

In conclusion, embarking on the journey to create a simple chat app has been an enriching experience. As a learner, I've gained valuable insights into the intricacies of app development, honed my problem-solving skills, and expanded my understanding of programming concepts. Through this project, I've come to appreciate the collaborative nature of software development and the boundless opportunities it presents for innovation and creativity. I hope this journey inspires others to dive into the world of app development and embark on their own path of discovery and learning.


My Linkedin => https://www.linkedin.com/in/md-enayetur-rahman/

My Facebook => https://www.facebook.com/profile.php?id=100094416483981

My Twitter => https://twitter.com/enayetu_syl

My Github => https://github.com/enayetsyl