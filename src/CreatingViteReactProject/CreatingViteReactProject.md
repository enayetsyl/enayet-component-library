# Streamlining React Project Setup with Vite: A Comprehensive Guide

### Introduction:

In the ever-evolving landscape of web development, efficiency is key. Whether you're a seasoned developer or just dipping your toes into the world of React, setting up a project quickly and effectively can significantly impact your workflow. In this guide, we'll explore a streamlined approach to kickstarting your React projects using Vite, an innovative build tool, alongside essential libraries like Tailwind CSS and React Router. By following these steps, you'll be equipped to embark on your development journey with confidence and agility.

### Project setup 

- Go to the folder where you want to create your project. Click on the address bar and type cmd.

- You will see a new command prompt will appear.

- In the command prompt type 

```javascript
npm create vite
```
- Type the project name and press enter. 

- A list will appear. Select React.

- Another list will appear. Select Typescript or JavaScript according to your project requirement.

- Type cd and then project name.

- After entering into the project folder type 

```javascript
npm i
```

- In order to install tailwind type following

```javascript
npm install -D tailwindcss
```

- Then type following to initialize the tailwind css.

```javascript
npx tailwindcss init
```

- In order to install react router type following 

```javascript
npm install react-router-dom localforage match-sorter sort-by
```

- Open the project in the vs code by typing following 

```javascript
code .
```

- In the root you will see a file with the name of tailwind.config.js. Open it and paste the following code and replace the content property of the file.

```javascript
content: ["./src/**/*.{html,js}"],
```
- After that the full code will be look like as follows

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Inside the src folder go to the index.css file and replace everything with following code

```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Shortcut way

- Let's see how can we create a react project in a short way

- Go to the folder where you want to create your project. Click on the address bar and type cmd.

- You will see a new command prompt will appear.

- Type following in the command prompt and press enter

```javascript
npm create vite@latest project-name -- --template react
```

- Then type cd then press space bar and type your project name that you put earlier. 

- Then type following in the command prompt

```javascript
npm install -D tailwindcss postcss autoprefixer react-router-dom localforage match-sorter sort-by
```

- Then type following and press enter

```javascript
npx tailwindcss init -p
```

- Open the project in the vs code by typing following 

```javascript
code .
```

- In the root you will see a file with the name of tailwind.config.js. Open it and paste the following code and replace the content property of the file.

```javascript
content: ["./src/**/*.{html,js}"],
```
- After that the full code will be look like as follows

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Inside the src folder go to the index.css file and replace everything with following code

```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Conclusion:

In conclusion, the fusion of Vite's lightning-fast development experience with the versatility of React, complemented by powerhouse libraries like Tailwind CSS and React Router, empowers developers to build robust web applications efficiently. By simplifying the setup process and providing a clear roadmap, this guide aims to accelerate your journey from project inception to deployment. Embrace these tools, experiment with your creativity, and embark on your development endeavors with newfound speed and confidence. Happy coding!

Get the article in README file => https://github.com/enayetsyl/enayet-component-library/blob/main/src/CreatingViteReactProject/CreatingViteReactProject.md

My Linkedin => https://www.linkedin.com/in/md-enayetur-rahman/

My Facebook => https://www.facebook.com/profile.php?id=100094416483981

My Twitter => https://twitter.com/enayetu_syl

My Github => https://github.com/enayetsyl