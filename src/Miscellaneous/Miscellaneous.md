### Tailwind CSS Gradient text

- Following a custom code for linear gradient text using tailwind css

```javascript 
<h1 class="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">hello world</h1>
```

### Image configuration in next.js

- Go to the next.config.mjs file at the root. The file will look like as follows

```javascript 
/** @type {import('next').NextConfig} */
const nextConfig = {
 
};

export default nextConfig;
```

- Add the following inside the object

```javascript 
 images:{
    domains:['visualwatermark.com']
  }
```

- The full code will look like as follows

```javascript 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:['visualwatermark.com']
  }
};

export default nextConfig;
```

- Inside the domains array put the link inside '', and separate by , . 