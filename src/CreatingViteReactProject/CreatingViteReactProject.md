# Creating a react project with vite

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