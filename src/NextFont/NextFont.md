# Mastering Font Customization in Next.js: A Comprehensive Guide

### Introduction:

- Welcome to our comprehensive guide on mastering font customization in Next.js! Fonts play a crucial role in shaping the visual identity and user experience of a website or application. With Next.js, a popular React framework for building web applications, you have the power to seamlessly integrate and customize fonts to suit your project's unique style and requirements.

- In this guide, we'll walk you through two methods of customizing fonts in Next.js: using custom Google fonts with variables and class names, and leveraging Tailwind CSS configuration. Whether you're a beginner or an experienced developer, you'll find step-by-step instructions and code examples to help you enhance the typography of your Next.js projects.

- Get ready to elevate the aesthetics of your web applications as we delve into the world of font customization with Next.js!

### Using custom google font using variable and class name. 

- In our example we will use three fonts to understand the customization of google font in next js.

- To begin with create a next js project. 

- Open the layout.js file. At the top of the file import following

```javascript
import {  Roboto, Oswald, Kanit } from "next/font/google";
```
- Here i imported the Roboto, the Oswald and the Kanit font from google. You can import according to your choice. 

- Now paste the following code below the import statement. 

```javascript
const roboto = Roboto({
  subsets:["latin"],
  weight:["300", "400", "500", "700", "900"],
  variable: '--font-roboto',
})
const oswald = Oswald({
  subsets:["latin"],
  weight:["300", "400", "500", "700", "600"],
  variable: '--font-oswald',
})
const kanit = Kanit({
  subsets:["latin"],
  weight:["300", "400", "500","600", "700", "800", "900" ],
  variable: '--font-kanit',
})
```
- For each font i created a variable and initialized that font. Inside the curly brace, I mentioned the subset, the font weight, and created a variable. 

- In your case you should write the weight of the font that you want to use in your project inside the array. 

- The variable value should start with -- then the word "font" and then - again and at last the name you want to provide.

- Go to the body tag and replace it with the following code.

```javascript
 <body className={`${roboto.variable} ${oswald.variable} ${kanit.variable}`}>
  {children}
</body>
```
- For each font you have to do the above. Write the variable name that we created earlier then a period then the word "variable".

- Now open the global.css file and create a class for each font as follows:

```javascript
  .roboto {
  font-family: var(--font-roboto);
}
.oswald {
  font-family: var(--font-oswald);
}
.kanit {
  font-family: var(--font-kanit);
}
```
- Instead of .roboto, .oswald, .kanit, you can use any other name. Inside the parentheses you have to write the name that you used at declaring variable at layout.js file. 

- Finally use the variable in the html tag. 

```javascript
  
export default function Home() {
  return (
   <>
   <div>
   <h1 className="text-5xl roboto">Roboto</h1>
   <h1 className="text-5xl oswald">Oswald</h1>
   <h1 className="text-5xl kanit">Kanit</h1>
   </div>
   </>
  );
}

```

### Using custom google font using tailwind configuration

- In our example we will use three fonts to understand the customization of google font in Next Js.

- To start create a next js project. 

- Inside the src directory create a folder with the name of utils and inside it create a file named fonts.js. Paste the following code inside it.

```javascript
import {  Roboto, Oswald, Kanit } from "next/font/google";


const roboto_init = Roboto({
  subsets:["latin"],
  weight:["300", "400", "500", "700", "900"],
  variable: '--font-roboto',
})
const oswald_init = Oswald({
  subsets:["latin"],
  weight:["300", "400", "500", "700", "600"],
  variable: '--font-oswald',
})
const kanit_init = Kanit({
  subsets:["latin"],
  weight:["300", "400", "500","600", "700", "800", "900" ],
  variable: '--font-kanit',
})

export const roboto = roboto_init.variable
export const oswald = oswald_init.variable
export const kanit = kanit_init.variable
```
- Here i modularize the code so our code will look clean. 

- To begin with i imported the fonts.

- Next i initiates them and store into a variable. The name of variable is changed here. Instead of roboto i used roboto_init and so on.

- Finally i export the variable property so that it can be used in the layout.js file.

- Now open the layout.js file and paste the following code

```javascript
import { kanit, oswald, roboto } from "@/utils/fonts";

<body className={`${roboto} ${oswald} ${kanit}`}>
{children}
</body>
```

- I imported the variables from the utils folder.

- Inside the body tag the variables are used. 

- Open the tailwind.config.js file and inside the extend add fontFamily property and paste following values 

```javascript
fontFamily: {
        roboto: ['var(--font-roboto)'],
        oswald: ['var(--font-oswald)'],
        kanit: ['var(--font-kanit)'],
      }
```
- The full code of tailwind.config.js file should look like as follows
```javascript
  /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        oswald: ['var(--font-oswald)'],
        kanit: ['var(--font-kanit)'],
      }
    },
  },
  plugins: [],
};

```
- Now open the file where you want to apply the font. In my case i will use it inside the home page.

```javascript

export default function Home() {
  return (
   <>
   <div>
   <h1 className="text-5xl font-roboto">Roboto</h1>
   <h1 className="text-5xl font-oswald">Oswald</h1>
   <h1 className="text-5xl font-kanit">Kanit</h1>
   </div>
   </>
  );
}
```
- If you are using the Tailwind configuration, make sure to prefix the font name with 'font-' as shown above.


### Conclusion:

In conclusion, mastering font customization in Next.js opens up a world of possibilities for creating visually stunning and unique web applications. Throughout this guide, we've explored two powerful techniques: using custom Google fonts with variables and class names, and leveraging Tailwind CSS configuration.

By following the step-by-step instructions and examples provided, you now have the knowledge and tools to effortlessly integrate and customize fonts in your Next.js projects. Whether you're aiming for a sleek and modern design or a more traditional and elegant aesthetic, font customization allows you to express your creativity and elevate the user experience.

As you continue to develop and refine your Next.js applications, remember that fonts play a vital role in shaping the overall look and feel of your website or app. Experiment with different fonts, styles, and configurations to find the perfect combination that aligns with your project's goals and branding.

Thank you for joining us on this font customization journey with Next.js. We hope this guide has equipped you with the skills and inspiration to create beautiful and engaging web experiences. Happy coding!


Get the article in README file => https://github.com/enayetsyl/enayet-component-library/blob/main/src/NextFont/NextFont.md

My Linkedin => https://www.linkedin.com/in/md-enayetur-rahman/

My Facebook => https://www.facebook.com/profile.php?id=100094416483981

My Twitter => https://twitter.com/enayetu_syl

My Github => https://github.com/enayetsyl