# Enhancing Website Engagement with Custom Facebook Messenger Chat in Next.js

### Introduction:

In today's digital age, fostering direct communication between businesses and their customers is paramount to success. Integrating a custom chat feature on your website not only enhances user experience but also facilitates seamless interaction between visitors and your brand representatives. In this guide, we'll explore how to implement a personalized Facebook Messenger chat option using Next.js, a popular React framework. By leveraging the react-facebook package, we'll empower users to engage with your business directly from your website, enhancing accessibility and customer satisfaction.

### About the package

- We will use react-facebook package to implement the custom chat option in our website through that customer can directly chat from the website with our representative in the facebook messenger. 


### Install react facebook

- Open the terminal in the vs code of your project and paste the following code and press enter.

```javascript
npm i react-facebook
```

### Component for Custom chat

- Go the the vs code. In the component folder create a component with the name of FBMessenger. You can give any name to the component. Now paste the following code in the component

```javascript
'use client'
import { CustomChat, FacebookProvider } from 'react-facebook';

const FBMessenger = () => {
  return (
    <FacebookProvider appId="" chatSupport>
        <CustomChat pageId="" minimized={true}/>
      </FacebookProvider>

  )
}

export default FBMessenger
```

- It must be a client component so i used use client at the top of the component.

- I imported CustomChat and FacebookProvider from react-facebook. Both will be used later.

- We called FacebookProvider tag inside return and CustomChat inside FacebookProvider. 

- How to get appId and pageId will be explained later. 

### Making FBMessenger accessible in the whole app.

- Go to the app folder and inside that go to the layout.js/layout.ts file that wrap the whole application. Call The component below children. Now the messenger chat button will be available in all the pages of the website. Your code should look like something as follows:

```javascript
import FBMessenger from "@/components/FBMessenger/FBMessenger";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
            <div>
              {children}
              <FBMessanger/>
            </div>
      </body>
    </html>
  );
}

```

### Getting pageId and appId

- Go to the facebook page with which you want to connect the website. 

- Go to about tab and then click page transparency tab. You will get page id here. Copy it and paste in your code.

- Then go to the developer.facebook.com. Then click MyApps tab. If ask then login. Then click Create App button. In the next page select other and click next button. Select consumer tab and click next button. In the Add an app name input field write the app name and then keep everything as it is and click Create app button. You will then get the AppId at the top of the page. Copy it and paste in your code. 

### Whitelisting the live link

- You cannot use messenger option in your local host. You have to make live your site. Host your site somewhere and copy the live site link. Now go to your facebook page. Click the setting option. Click new page experience tab. Then click Advance Messaging tab. In this page you will see a input field with the label of Whitelisted domains. Paste your live site link here and click add button. You job is finish now. You should be able to use the messenger from your your website. 

### Conclusion:

Integrating a custom Facebook Messenger chat option into your Next.js website offers numerous benefits, from improving customer communication to increasing user engagement. By following the steps outlined in this guide, you can seamlessly embed this feature into your site, providing visitors with a convenient and direct channel to connect with your business. Embrace the power of personalized communication and elevate your online presence with this innovative addition to your Next.js project.

Get the article in README file => https://github.com/enayetsyl/enayet-component-library/blob/main/src/FBMassenger/FBMassenger.md

My Linkedin => https://www.linkedin.com/in/md-enayetur-rahman/

My Facebook => https://www.facebook.com/profile.php?id=100094416483981

My Twitter => https://twitter.com/enayetu_syl

My Github => https://github.com/enayetsyl