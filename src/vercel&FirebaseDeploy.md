VERCEL DEPLOY

create a file named vercel.json and paste following code in it

{
    "version": 2,
    "builds": [
        {
            "src": "./index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/",
            "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
        }
    ]
}

go to firebase. inside build -> hosting -> there will be two url, copy them and paste in index.js file as follows

app.use(cors({
    origin: [
      'http://localhost:5173'    // write your url here
    ],
    credentials: true
  }));

  go to CLI and write vercel --prod -> 
  type y and enter. -> 
  Link to existing project? type n and enter. -> 
  What's your project's name? hit enter  ->
  In which directory is your code located> hit enter ->

  go to vercel server. go to your project. click setting in the upper side. click environment variable tab at the left menu. upload .env file or input environment variable by typing. then save.

  copy the url from the vercel site. check whether it is working properly. 

  go to frontend code  select a base url and press shift + ctrl + f then replace the url. if you have one base url then change there. 

  go to terminal type firebase init -> y
  select third option Hosting:Configure files ... by pressing space bar and then hit enter. ->
  Use an existing project? hit enter ->
  find you your project and hit enter -> 
  What do you want to build your public directory? type dist and hit enter ->
  Configure as a single-page app? type y and hit enter -> 
  Set up automatic builds and deploys with Github? type n and hit enter -> 
  type npm run build ->
  type firebase deploy and hit enter

 
