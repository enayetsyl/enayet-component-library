==> Open CMD & go to the folder where you want to make the server project

==> Write - mkdir project-name-server

==> Write - cd project-name-server

==> Write - npm init -y

==> Write - code .

==> There will be a file in VSCode named package.json where under scripts a new property and value should be written as follows: "start":"node index.js",

==> Then in the VSCode create a file name index.js

==> install following file

npm i express cors mongodb dotenv mongoose


==> in the index.js file write following code
```javascript

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const mongoose = require('./db');
require('dotenv').config();

const { corsOptions, errorHandler } = require('./middleware');

const { Blog, Product, Order, User } = require('./model');

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const blogRoutes = require('./blogRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', blogRoutes);

// Error handling middleware
app.use(errorHandler);

// Home route
app.get('/', (req, res) => {
  res.send('ECOMMERCE server is running!');
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});

```
=> line 23-27 is importing necessary dependencies. 
- express: The Express.js framework for building web applications.
- cors: Middleware to enable Cross-Origin Resource Sharing.
- MongoClient, ServerApiVersion, ObjectId: MongoDB related imports.
- mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- dotenv: Allows loading environment variables from a .env file into process.env

=> line 29 is related to middleware import. 
- corsOptions: Configuration options for CORS (Cross-Origin Resource Sharing).
- errorHandler: Custom error handling middleware.

=> line 31 is related to mongoose model import. 
- in the code there are 4 models named Blog, Product, Order, User. This could be more or less depending of your project.

=> Line 33-36 is related to route import. 
- userRoutes contains all the get,post, put, patch, delete routes related to user.
- productRoutes contains all the get,post, put, patch, delete routes related to product.
- orderRoutes contains all the get,post, put, patch, delete routes related to order.
- blogRoutes contains all the get,post, put, patch, delete routes related to blog.

=> Line 38 is express app initialization. 

=> Line 39 is the port on which the server will listen, using the environment variable PORT or defaulting to 5000.

=> Line 42-43 is the middleware usage. 
- cors: Enables Cross-Origin Resource Sharing.
- express.json(): Parses incoming JSON requests.

=> Line 46-49 related to route handling
- app.use('/api/v1', userRoutes); in this line "/api/v1" is the common part of all the routes inside userRoutes file. So writing it here will remove the need for writing in every route in the userRouter file. userRoutes is the variable defined in line 33 that imports all the routes in the userRoutes file. 

=> Line 52 is the custom middleware to handle error.

=> Line 55-57 Defines a simple home route that sends a response indicating that the server is running.

=> Line 60-62 Starts the server and listens on the specified port.


==> Now create another file for middleware(name could be middleware.js) and put following code inside it.

```javascript
// middlewares.js
const cors = require('cors');

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'https://your.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
};

module.exports = {
  corsOptions,
  errorHandler,
};

```
=> Line 107 imports CORS middleware for express.

=> Line 109 Here an array containing a list of allowed origin URLs. you should CHANGE THE URL NAME WITH THE REQUIRED FRONTEND URL HERE.

=> Line 111 is an object specifying the CORS configuration.

=> Line 112-119 has a function it initially checks allowedOrigins array of line 109 
- If the origin is allowed, the callback is called with null and true, allowing the request.
- If the origin is not allowed, the callback is called with an error message, preventing the request.

=> Line 121-124 is error handling middleware function that handles errors in the Express application. It logs the error stack to the console and sends a 500 Internal Server Error response with the message 'Something went wrong!'

=> Line 126-129 is module exports the corsOptions and errorHandler so that other parts of the application can use them. Usually it is used in index.js file.

==> Now create another file named db.js in the root directory for mongodb connections related code and put the following code here

```javascript
// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'mongoosecom',
});

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Reconnecting...');
  setTimeout(() => {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'mongoosecom',
    });
  }, 5000);
});

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

process.on('SIGINT', () => {
  connection.close(() => {
    console.log('MongoDB connection closed due to application termination!');
    process.exit(0);
  });
});

module.exports = mongoose;
```
=> Line 150 imports MongoDB object modeling tool for Node.js, used to interact with MongoDB databases.

=> Line 151 import dotenv that Allows loading environment variables from a .env file into process.env.

=> Line 153 Constructs the MongoDB connection URI using environment variables for the username and password. In the uri code ".ktgpsav." portion is unique for each user. SO MAKE SURE TO CHANGE IT WHEN YOU COPY THIS CODE. 

=> Line 155-159 Connects to the MongoDB database specified in the URI using Mongoose. It includes following options
- useNewUrlParser: Uses the new URL parser.
- useUnifiedTopology: Uses the new Server Discover and Monitoring engine.
- dbName: Specifies the name of the MongoDB database. IF YOU COPY THIS CODE MAKE SURE TO GIVE A UNIQUE DATABASE NAME FOR THE PROJECT YOU ARE DOING.

=> Line 161  is assigning the mongoose.connection object to a variable named connection. This variable is commonly used to handle events and interactions with the MongoDB database connection.

=> Line 163-166 is event handling for connection. It listens for the 'error' event on the Mongoose connection and logs an error message if there's an issue, then exits the process.

=> Line 168-177 Listens for the 'disconnected' event on the Mongoose connection and logs a warning message. It then attempts to reconnect after a 5-second delay.

=> Line 179-181 Listens for the 'open' event on the Mongoose connection and logs a success message when the connection is established.

=> Line 183-188 Listens for the 'SIGINT' event (Ctrl+C) and gracefully closes the MongoDB connection before exiting the application.

=> Line 190 Exports the Mongoose instance, allowing other parts of the application to use it for MongoDB operations. IN THIS CASE IT IS IMPORTED IN THE INDEX.JS FILE.

==> Now create a file named model.js for mongoose modes. Inside it you paste following dummy code.

```javascript
const mongoose = require('./db');

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  rprice: Number,
  sprice: Number,
  desc: String,
  featured_image: String,
  gallery_image: String,
  size: [String],
  color: [String],
});

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  division: String,
  address: String,
  shippingCost: Number,
  totalPrice: Number,
  paymentMethod: String,
  bkashNumber: String,
  bkashTrnID: String,
  productDetails: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      title: String,
      category: String,
      rprice: Number,
      sprice: Number,
      desc: String,
      featured_image: String,
      gallery_image: String,
      size: [String],
      color: [String],
      quantity: Number,
      choosenColor: String,
      choosenSize: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  status: String,
});

const blogSchema = new mongoose.Schema({
  blogTitle: String,
  blog: String,
  featured_image: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  role: String
})
const Blog = mongoose.model('Blog', blogSchema);

const Product = mongoose.model('Product', productSchema);

const Order = mongoose.model('Order', orderSchema);

const User = mongoose.model('User', userSchema);

module.exports = { Blog, Product, Order, User }

```

=> Line 218 Imports the mongoose object from the ./db module, which contains the MongoDB connection setup.

=> Line 220-230 Defines a Mongoose schema for products with various fields such as title, category, regular price (rprice), sale price (sprice), description (desc), featured image (featured_image), gallery image (gallery_image), size, and color.

=> Line 232-265 Defines a Mongoose schema for orders with various fields such as name, email, phone, division, address, shipping cost, total price, payment method, bKash details, product details (an array of products in the order), date, and status.

=> Line 267-271 Defines a Mongoose schema for blog posts with fields for blog title (blogTitle), blog content (blog), and a featured image (featured_image)

=> Line 273-276 Defines a Mongoose schema for users with fields for email and role.

- ABOVE ARE SAMPLE SCHEMA. YOU SHOULD MODIFY YOUR SCHEMA AS PAR REQUIREMENT OF YOUR PROJECT.

=> Line 277-283 Creates Mongoose models for the defined schemas. These models represent collections in the MongoDB database and provide an interface for interacting with the data.

- IN YOUR PROJECT YOU WILL CREATE YOUR OWN SCHEMA AS PER PROJECT REQUIREMENT. 

=> Line 285 Exports the created models so that they can be used in other parts of the application. USUALLY IN ROUTES FILE.


==> Now create file name ...Routes.js. In the ... you will put the name as per your requirement. In the following example we used productRouter.js as file name. Paste following dummy code inside it.

```javascript
const express = require('express');
const router = express.Router();
const { Product } = require('./model');

// FOR ALL PRODUCTS

router.get('/allproducts', async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (error) {
    console.error('Error fetching produts:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT PRODUCT GET ROUTE
router.get('/allproducts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findById(id);
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// FOR ADD PRODUCT POST ROUTE
router.post('/addproduct', async (req, res) => {
  try {
    const product = new Product(req.body);
    console.log('req.body', product)
    const result = await product.save();
    console.log('result', result)
    res.send(result);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
// EDIT PRODUCT PATCH ROUTE
router.patch('/allproducts/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProductData = req.body;
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: updatedProductData },
    { new: true }
  );
  res.send(result);
});

// FOR DELETE PRODUCT ROUTE
router.delete('/allproduct/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Product.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

```
=> Line 311 import express for creating the router.

=> Line 312  create a router instance

=> Line 313 imports the Product model from the model.js file.

=> Line 317-325 
- Handles a GET request to the endpoint /allproducts.
- Uses Product.find() to fetch all products from the database.
- Sends the fetched products as the response.

=> Line 328-337
- Handles a GET request to the endpoint /allproducts/:id, where :id is a dynamic parameter representing the product's ID.
- Uses Product.findById(id) to fetch a single product by its ID.
- Sends the fetched product as the response.

=> Line 340-351
- Handles a POST request to the endpoint /addproduct.
- Creates a new Product instance using the request body (req.body).
- Uses product.save() to add the new product to the database.
- Sends the saved product as the response.

=> Line 353-362
- Handles a PATCH request to the endpoint /allproducts/:id, where :id is a dynamic parameter representing the product's ID.
- Uses Product.findByIdAndUpdate(id, { $set: updatedProductData }, { new: true }) to update the product with the provided ID.
- Sends the updated product as the response.

=> Line 365-374 
- Handles a DELETE request to the endpoint /allproduct/:id, where :id is a dynamic parameter representing the product's ID.
- Uses Product.findByIdAndDelete(id) to delete the product with the provided ID.
- Sends the deleted product as the response.

=> Line 376 Exports the router so that it can be used in other parts of the application. IT IS USUALLY USED IN INDEX.JS FILE

- YOU CAN CREATE AS MANY ROUTE FILE AS YOU REQUIRED FOR YOUR PROJECT.


==> Create a file named .env and put environmental variable as follows

```javascript
DB_USER=mongoose-test
DB_PASS=jQT7HZ8p0jtT7TD8
```
- YOU CAN ADD OTHER ENVIRONMENTAL VARIABLE AS PER YOUR PROJECT REQUIREMENT.

==> Create a file named vercel.json. It is required for deployment in vercel. Inside this file paste following code

```javascript
{
  "version": 2,
  "builds": [{ "src": "./index.js", "use": "@vercel/node" }],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}

```
- The provided code is a configuration file for Vercel, a cloud platform for serverless deployment of applications. This configuration file, typically named vercel.json, defines settings for how Vercel should build and handle requests for your application. 

=> Line 428 Specifies that this configuration file is using version 2 of the Vercel configuration.

=> Line 429 Defines a single build configuration with the source file ("src": "./index.js") and the build preset ("use": "@vercel/node"). This configuration uses the @vercel/node preset, which indicates that the application is a Node.js application.

=> Line 430-437
- Configures how incoming HTTP requests should be handled.
- Defines a single route with the following properties:
- "src": "/(.*)": This specifies a regular expression pattern that matches any path ((.*)). The (.*) captures all characters in the path.
- "dest": "/": This indicates that any incoming request matching the specified pattern should be directed to the root ("/") of the application.
- "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]: Specifies the HTTP methods that are allowed for this route. This allows handling requests with methods such as GET, POST, PUT, PATCH, DELETE, and OPTIONS.

==> In the VSCode create a file named .gitignore and within write: 

```javascript
node_modules
.env
```

==> Open terminal and write 
```javascript 
vercel --prod
```
- Set up and deploy "c/......"? [Y/n] press y and enter.
- Which scope do you want ot deploy to? "your user name will show here". Press enter
- Link to existing project?[y/N] usually n and press enter.
- What's your project's name? a name will suggest. If you want to keep it press enter otherwise write a new name.
- In which directory is your code located?./ press enter.

=> go to vercel website. Enter the project that you deployed now. In the setting Environmental Variables tab import .env file and press save button. 

=> Click the server link and try to enter an open route. If you see the data your server is working. you can copy the code to the front end and use it for data fetching. 

