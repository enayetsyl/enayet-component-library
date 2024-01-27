# Next js full auth related document

## Index
- Creating a next project
- Installing shadcn/ui
- Run the project and text tailwind
- Adding shadcn-ui button component
- Detail about app router
- Installing next auth

### Creating a next project
- Open VS code and open terminal and write following code and press enter
```javascript
npx create-next-app@latest your-project-name
```
- Select from necessary question.
- Open the project.

### Installing shadcn/ui

- It will give us reusable component that we will copy and paste.
- Go to the following link https://ui.shadcn.com/docs/installation and select Next.js from there.
- Alternatively you can run following command in the terminal 
```javascript
npx shadcn-ui@latest init
```
- Answer the questions. 

Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › no / yes
Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) ...
Where is your tailwind.config.js located? › tailwind.config.js (IF YOU USE TYPESCRIPT THEN CLICK TAB AND MAKE THE EXTENTION TO .ts)
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes

- After installation you will see a lib folder and inside it a utils.ts file which have cn function that will be used to dynamically add classed.

### Run the project and text tailwind

- Go to the terminal and write
```javascript
npm run dev
```
- Go to the app folder and open page.js/page.ts and delete everything inside the return statement and write something also style with tailwind class. Check whether they are reflecting in the ui.

### Adding shadcn-ui button component

- Go to https://ui.shadcn.com/docs and find out button component. 
- Copy the code from CLI or copy from below
```javascript
npx shadcn-ui@latest add button
```
- Paste the code to the terminal and press enter. 
- After installation you will see inside the component folder there is a ui folder and inside it there is button.jsx or button.tsx
- We will use the button inside the home page. So go to the page.jsx/page.tsx and import following
```javascript
import { Button } from "@/components/ui/button"
```
- Inside the return statement where you want to use the button write following:
```javascript
<Button>Click Me</Button>
```
- Instead of click me you can write any text you want. 
- If you want to change the button looks you can do it by writing props inside the opening tag.
```javascript
<Button size="lg" variant="outline">Click Me</Button>
```
- You can also create custom props if you wish. In order to do it you have go to the components folder then ui folder then button components. For example you want to create a custom variants. You should go to the variant object and create a new property after link property and write the tailwind class as value. After that you go to the button where you used it. In our case it it home page. now in the variant props you will see the suggestion of your newly created props. 


### Detail about app router


- Inside the app folder the first page represented the root page which we will find in the localhost:3000/ link. So if you want to modify that screen you have to write in that file.

- In order to create a new route we have to create a new folder inside the app folder and inside that folder we have create a file name page.jsx/page.tsx. The new folder name will will be new path. e.g. if you name the new folder as login then //http:localhost:3000/login route will be created in ui. If we write code in the page.jsx/page.tsx inside the login folder we will see the result in the //http:localhost:3000/login link.

- Inside the page.jsx/page.tsx you must create a function and must export default the function. If you only export it then the page will not be shown in the ui. 

- In order to create nested route you have to create folder inside folder and inside each folder there should be a page.jsx/page.tsx file with export default function. e.g. app -> dashboard -> Profile will be displayed in the ui as //http:localhost:3000/dashboard/profile.

- The file name must be page.jsx/page.tsx but inside the file the function name could be anything. In our above example the dashboard folder page.tsx function name could be DashboardPage and profile folder page.tsx function name could be Profile.  

- There is another file inside app folder which is called layout.jsx/layout.tsx. This is act as like mainLayout of react app. It is used to show the children. The layout.jsx inside the app folder is root layout that render the whole website. If you pass any props using by wrapping the component by sessionProvider/authProvider then that props can be received anywhere in the app. 

- We can use multiple layout.jsx file in a project. For example if we want to show different layout in dashboard route then we can create layout.jsx/layout.tsx file inside dashboard folder. And inside the layout.jsx/layout.tsx file we will render children props. We can put common components like navbar, footer etc in this page which will be shared by all the pages inside the dashboard folder. 

- loading file, not found, error. (I WILL WRITE ABOUT IT LATER IN SHA ALLAH)

- If you want to create a shared layout but don't want to create a route then you should keep the folder name inside (). So if you create following folder app -> auth -> login then your login route will be http//localhost:3000/auth/login. But if we want http//localhost:3000/login 
route at the same time keep the auth folder we can write the folder structure as follow:
app -> (app) -> login

- If _ is written before a folder name then the folder will not appear in the route even though page.jsx/page.tsx file is kept inside it.

- Server Component: Any page inside the app folder is by default server component. We can make a server component asynchronous function. They are not for interactivity. We cannot use useEffect, useState, onClick etc in server component.

- Client Component: As we know any page inside the app folder is server component. If we want to convert any component to client component then we have to write "use client" at the top of the page and it will make the component a normal react component. Client component is used for interactivity. So in the client component we can use onSubmit, onClick, useState, useEffect etc. 

### Installing next auth

- Next auth has two site. The old site address is next-auth.js.org and it host upto version 4 documentation. And they has migrated to a new site which address is authjs.dev and it host the latest v5. In the new site go to the guide section and at the bottom you will see Upgrade Guide (v5). 

- Copy the installation code from it.
```javascript
npm install next-auth@beta
```
- In the root of application create a page named with auth.js/auth.ts and paste following code inside it
```javascript
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [GitHub],
})
```
- Create a file inside app folder as follows
app -> api -> auth -> [...nextauth] -> route.js/route.ts

- Inside the route.js/route.ts file paste the following code.
```javascript
export { GET, POST } from "@/auth"
export const runtime = "edge" // optional
```
- Go to the .env file and create a AUTH_SECRET and paste it.

- Inside the root folder create a new file called middleware.js/middleware.ts. If you misspell the file name it will not work. Paste the following code inside it
```javascript
import { auth } from "./auth"
export default auth((req) => {
  // req.auth
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
```
- The route inside the matcher will invoke the auth function. route inside the matcher is not private route or public route.

- In the above example everything will invoke the auth function except the item mentioned int he matcher array.

- In the matcher you can use following code matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]

- With the above matcher, all routes will invoke auth function, with the exception of internal /_next/ routes and static files. Static files are detected by matching on paths that end in .+\..+. Then inside the auth function we can decide which route should be protected and which route should not. 

- One policy for protecting is that initially the whole app will be protected and some route like landing page, documentation etc will be public.
