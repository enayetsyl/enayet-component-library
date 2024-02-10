
# Streamlining File Uploads in Next.js with UploadThing: A Comprehensive Guide

### Introduction:

In today's digital landscape, the ability to seamlessly upload various types of files is crucial for many web applications. Next.js, a popular React framework for building server-side rendered applications, offers a robust environment for developing such functionalities. However, implementing file uploads can be complex and time-consuming, requiring integration with third-party services and careful configuration.

In this guide, we'll explore how to simplify the process of file uploading in Next.js using UploadThing, a versatile tool designed specifically for this purpose. Whether you need to upload images, videos, PDFs, or other file formats, UploadThing streamlines the integration process, allowing developers to focus on building rich user experiences without getting bogged down in intricate backend details.

### Basic setup

- First create a Next.js project and open it in vs code. 

- Go to the following link https://uploadthing.com/. Hit Get STrated Button. Open an account with github. 

- Click Create a new app button, write the app name Hit Create App button. 

- At the left side of the dashboard go to the API Keys tab. Cop the secret and App id and paste it in the .env file of your vs code. 

### Setting up backend

- Inside the app folder create a folder with the name of api and inside that create another folder with the name of uploadthing and inside that folder create file with the name of core.js. Paste the following code inside that file

```javascript
import { createUploadthing} from "uploadthing/next";
 
const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    
    .onUploadComplete(async ({  file }) => {
    
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { message:'Image Upload Complete' };
    }),
    pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
   
    .onUploadComplete(async ({  file }) => {
    
      console.log("file url", file.url);
 
      return { message:'Pdf Upload Complete' };
    }),
    videoUploader: f({ video: { maxFileSize: "4MB" } })
   
    .onUploadComplete(async ({  file }) => {
    
      console.log("file url", file.url);
 
      return { message:'Video Upload Complete' };
    }),
} ;
```
- I imported createUploadthing. Then initialize it and put is inside f variable. 

- ourFileRouter object hold different file routes for different types of file upload.

- imageUploader call the f function. In the function the object state that file type is image and maximum file size 4MB. You can change the file type to video, pdf, application etc. In our second and third property used pdf and video file type. You can change maximum file size also. onUploadComplete asynchronous callback function is used to send any kind of thing to frontend. In our example we sent a message to the frontend.

- Then for pdfUploader and videoUploader we repeat the process. 

- Here we used three types. You can create as many as you wish.

- The routeSlug imageUploader, pdfUploader, videoUploader is necessary for proper frontend functioning. 

### Define the route 

- Inside api/uploadthing folder create another file with the name of route.js and paste the following code inside it

```javascript
import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
```

### Adjust the tailwind.config.js file

- UploadThing will provide us ready made button or dropzone. In order to custom design we have to adjust tailwind.config.js file.

- Add following line at the top of the file

```javascript
const { withUt } = require("uploadthing/tw");
```
- Then the code inside {} should be wrapped by withUt(). Your code should look like as follows

```javascript
/** @type {import('tailwindcss').Config} */
const { withUt } = require("uploadthing/tw");
  module.exports = withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});

```

### Exporting uploadButton and uploadDropzone

- Inside the src folder or parallel to the app folder create a folder with the name of utils and inside that create a file with the name of uploadthing.js and paste the following code.

```javascript
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
 
 
export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();
```

- It export uploadButton and uploadDropzone that we will use in other component to upload files. 

### Create component for upload button or dropzone

- Inside the component folder create a file with the name of ImageUpload.jsx. This file will render the UploadButton for image. For pdf,video etc you can create separate component. Paste the following code inside it. 

```javascript
'use client'

import { useState } from "react"
import { UploadButton } from "../utils/uploadthing"



const ImageUpload = () => {
  const [imgUrl, setImgUrl] = useState('')
  console.log(imgUrl)
  return (
    <div>
      <UploadButton 
      className="ut-button:bg-slate-600"
      
      endpoint='imageUploader'
      onClientUploadComplete={(res) => {
       setImgUrl(res[0].url)
      }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      />

    </div>
  )
}

export default ImageUpload
```

- The component must be client component. 

- UploadButton is imported from utils folder.

- imgUrl state is declared to store the url link of the image. It can then also send to the server for later use also. 

- Inside the return UploadButton is called. Inside the opening tag the endpoint is mentioned as imageUploader. For video and pdf upload you will write videoUploader and pdfUploader respectively. I wrote them in the core.js file earlier. 

- For custom design you can write class name inside this tag. 

- onClientUploadComplete function receive data from server and you can do something here. In our case we call setImgUrl function and store the url from the res. You can show toast here.

- onUploadError function show error message if there is any error in uploading file. 

- Repeat the same process for uploading other file type. 


### Custom design with tailwind css class

- Custom button design can be done in the following way. 

```javascript
<UploadButton
    className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
               |    └─ applied to the button └─ applied to the button when readying
               └─ applied to the container
/>
```

- Custom dropzone design can be done using following way

```javascript
<UploadDropzone
    className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
               |            |                └─ applied to the allowed content when uploading
               |            └─ applied to the label
               └─ applied to the container
 
/>
```

### Call the uploadButton and uploadDropzone in the component where it is required

- We called upload component in the home page. It is same as calling any normal component. Check the following code

```javascript
import ImageUpload from "./component/ImageUpload";
import PdfUpload from "./component/PdfUpload";

export default function Home() {
  return (
   <div>
   <ImageUpload/>
   <PdfUpload/>
   </div>
  );
}
```

### Conclusion:

In conclusion, leveraging UploadThing within your Next.js projects can significantly enhance the efficiency and reliability of file uploading functionalities. By following the comprehensive steps outlined in this guide, developers can seamlessly integrate UploadThing into their applications, empowering users to effortlessly upload various types of files with confidence and ease. Whether you're building a content management system, an e-commerce platform, or a multimedia sharing platform, UploadThing provides the essential tools and capabilities to streamline the file uploading process, ultimately contributing to a more seamless and enjoyable user experience. So why wait? Elevate your Next.js projects with UploadThing today and unlock the full potential of file uploading capabilities.


Get the article in README file => https://github.com/enayetsyl/enayet-component-library/blob/main/src/FBMassenger/FBMassenger.md

My Linkedin => https://www.linkedin.com/in/md-enayetur-rahman/

My Facebook => https://www.facebook.com/profile.php?id=100094416483981

My Twitter => https://twitter.com/enayetu_syl

My Github => https://github.com/enayetsyl