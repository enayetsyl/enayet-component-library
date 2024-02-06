# Revolutionizing Software Development: The Imperative of Automated Testing

### 

In the realm of development, the quality of user experience and performance enhancements holds little value if the core functionality is compromised. To guarantee the robustness of our software, testing becomes a critical phase in the development lifecycle. Traditionally, manual testing has been the go-to method, where individuals or dedicated quality assurance teams meticulously navigate through the application, ensuring that every aspect functions as intended.

However, manual testing, despite its meticulous nature, has its drawbacks. 

- It consumes a significant amount of time, especially when dealing with extensive applications or intricate, repetitive tasks. 
- The looming risk of human error further compounds these challenges, especially when stringent deadlines leave little room for comprehensive testing of all features.

Enter automated testing – the solution to the limitations of manual testing. Automated tests, essentially coded programs, revolutionize the testing process by automating the verification of software functionality. While developing features may require an additional investment of effort, the long-term benefits far outweigh the initial costs.

The advantages of automated testing are manifold. 
- Firstly, it eliminates the time-consuming aspect of manual testing, as automated tasks can be executed by a computer within seconds or minutes, sparing individuals from prolonged testing sessions. 

- Secondly, it brings reliability and consistency to the testing process, as computers excel in executing repetitive and complex tasks with precision, following the same steps consistently.

- Moreover, automated testing facilitates the swift identification and rectification of features that break tests when changes are made to the software. This empowers developers to promptly verify their colleagues' work, ensuring that modifications do not inadvertently introduce issues. 

- Ultimately, automated testing instills confidence in the software being shipped, providing assurance that it functions exactly as intended.

In essence, automated testing emerges as the beacon guiding developers towards software excellence.  Welcome to the future of software testing, where excellence is not just a goal but a tangible outcome.

# Mastering Automated Testing: Unveiling the Roles of Jest and React Testing Library

In our previous blog, we delved into the fundamentals of testing, the significance of automated testing, and why it is indispensable in the realm of software development.

Before we dive deeper, let's take a brief pause to demystify these two essential libraries and understand their roles in testing React applications.

### Jest: The JavaScript Testing Framework

Jest, at its core, is a robust JavaScript testing framework. However, in the context of our series, it serves as more than just a framework—it's a test runner. Jest excels at discovering tests, executing them, determining their outcomes, and presenting the results in a human-readable format. As we progress, you'll witness how Jest seamlessly orchestrates our tests, providing a cohesive testing experience.

### React Testing Library: Empowering React Component Testing

On the other side of the spectrum, we have React Testing Library. This JavaScript testing utility plays a pivotal role by furnishing a virtual DOM specifically designed for testing React components. In the automated tests we are about to embark upon, there won't be a tangible DOM to interact with. Enter React Testing Library, offering a virtual DOM that enables us to simulate interactions and scrutinize the behavior of our React components.

It's crucial to note that Testing Library is not just a singular entity; it's a family of packages tailored to facilitate UI component testing. The cornerstone is the "dom-testing-library," and React Testing Library acts as a convenient wrapper around this core library. Together, they streamline the testing of React applications, offering a comprehensive solution.

As we navigate through the series, we'll delve deeper into the functionalities of both libraries. It's important to recognize that these two are not alternatives but complementary tools. We'll be harnessing the strengths of both Jest and React Testing Library synergistically to elevate our testing capabilities.

Stay tuned for our journey ahead, where we'll explore the diverse realms of automated testing. In the next blog, we'll unravel the different types of automated tests, providing you with a holistic understanding of how to effectively test your React applications.

# A Comprehensive Guide to Test Types and Philosophies with React Testing Library

Welcome back to our exploration of automated testing. In this blog, we'll unravel the diverse types of automated tests, understanding their distinct purposes and how they contribute to robust software development.

### Understanding Test Types
In the realm of automated testing, three primary types take center stage:

- Unit Tests:

  - Focus on testing individual building blocks of an application, such as classes, functions, or components.
  - Units are tested in isolation, independent of other components, with dependencies mocked.
  - Runs quickly, facilitating pinpointing failures.
  - Easier to write and maintain.

- Integration Tests:

  - Concentrate on testing the collaboration of multiple units to ensure they work seamlessly together.
  - Take longer than unit tests due to the combined nature of testing.

- End-to-End Tests:

  - Focus on testing the entire application flow, ensuring it operates as designed from start to finish.
  - Involves a real UI, actual backend, database, and services.
  - Takes the longest time as it covers a substantial amount of code.
  - May have cost implications, particularly when interacting with real APIs.

### The Testing Pyramid Philosophy

While deciding on the type of tests to write, a valuable guideline is the testing pyramid. It suggests a pyramid structure with the majority of tests being unit tests at the bottom. As you move up, tests become larger but decrease in number. The optimal mix depends on the project's nature.


### Testing Philosophy in This Blog Series


The philosophy driving the tests in this series aligns with the React Testing Library approach. It advocates that tests resembling the software's actual usage instill greater confidence. The tests we'll explore strike a balance between unit tests (at a component level, easy to write and maintain) and end-to-end tests (mimicking user interactions).

With React Testing Library, the focus isn't on the component's implementation details but rather on how it behaves when a user interacts with it. It disregards specifics like rendering or state handling and emphasizes the user experience.


### A User-Centric Testing Approach

To simplify, React Testing Library doesn't care if you add four plus four or five plus three, as long as the user perceives the correct result—eight. This approach ensures that refactoring a component won't impact the tests, as long as the end result remains consistent.

In essence, we navigate through three test types: unit, integration, and end-to-end. React Testing Library bridges the gap between unit and end-to-end tests, offering a practical approach that we'll delve into in the upcoming posts.

If you've grasped the essence of these test types, join me in the next blog, where we'll unravel the fundamental concept of a test in code. 

# Unveiling the Essence of Automated Tests: A Practical Overview

In this post, let's demystify the core concept of an automated test, shedding light on its purpose and functionality within the realm of software development. While it's commonly understood that an automated test is a piece of code designed to evaluate software code, let's delve deeper into what this piece of code entails.

An automated test, at its core, is a code snippet engineered to raise an error when the actual output diverges from the expected output. Allow me to illustrate this with a practical example.

Practical Example: Concatenating Names
Consider a simple JavaScript function, getFullName, residing in VS Code, the chosen editor for this series. This function takes two parameters, firstName and lastName, and returns their concatenated value, separated by a space.

```javascript
const getFullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

const actualFullName = getFullName("Enayetur", "Rahman");
const expectedFullName = "Enayetur Rahman";

if (actualFullName !== expectedFullName) {
  throw new Error(`Actual full name (${actualFullName}) is not equal to expected full name (${expectedFullName})`);
}

```
In this example, invoking the function with the first name "Enayetur" and the last name "Rahman" is expected to yield the full name "Enayetur Rahman." The test checks whether the actual output matches the expected output. If not, an error is thrown, providing meaningful feedback.

Running the Test

Running this test using the Node.js environment, we execute node index in the terminal. If the expected and actual outputs align, no output is observed. However, if there's a mismatch, an error is triggered, pinpointing the disparity.

Significance of Automated Tests

Automated tests serve as guardians of code integrity. They validate that the software behaves as anticipated, offering assurance in the face of code changes and improvements. This philosophy forms the backbone of automated testing frameworks like Jest, which we will explore in subsequent posts.

Understanding that an automated test is a piece of code designed to signal discrepancies between actual and expected outputs is pivotal. It acts as a safeguard, ensuring that the software remains reliable and robust.

As we progress, we will leverage Jest to streamline the creation and execution of such tests. 

Thank you for reading, and I'll meet you in the next post.


# Creating a react project with vite

```javascript
npm create vite@latest unit-testing --template react-ts

```

Select a framework: React
Select a variant: Typescript

https://zaferayan.medium.com/how-to-setup-jest-and-react-testing-library-in-vite-project-2600f2d04bdd

```javascript
npm i

npm install -D tailwindcss postcss autoprefixer react-router-dom localforage match-sorter sort-by

npx tailwindcss init -p

npm i -D jest

npm i -D @testing-library/react @testing-library/jest-dom

npm i -D jest-svg-transformer identity-obj-proxy

npm i jest-environment-jsdom

npm i -D jest-environment-jsdom

npm i -D react-test-renderer

```
adjust the package.json file as follows
```javascript
{
  "name": "unit-testing",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "jest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.23.9",
    "@babel/preset-react": "^7.23.3",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "jest-svg-transformer": "^1.0.0",
    "localforage": "^1.10.0",
    "match-sorter": "^6.3.3",
    "postcss": "^8.4.34",
    "react-router-dom": "^6.22.0",
    "react-test-renderer": "^18.2.0",
    "sort-by": "^1.2.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  },
  "jest": {
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    "setupFilesAfterEnv": [
      "<rootDir>/setupTests.js"
    ]
  }
}

```