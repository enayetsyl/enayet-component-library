# Title: A Beginner's Guide to Unit Testing in JavaScript with Jest

Unit testing is a fundamental practice in modern software development that ensures individual units of code, typically functions or methods, behave as expected. In this beginner-friendly guide, we'll explore the basics of unit testing in JavaScript using Jest, a popular testing framework maintained by Facebook.

### What is Unit Testing?

Unit testing involves breaking down your code into small, testable units and writing tests to verify their behavior. Each unit is tested in isolation, meaning that dependencies are mocked or stubbed to isolate the unit under test. This approach helps identify bugs early in the development process and provides confidence when making changes to the codebase.

### Setting up Jest:

To begin, ensure you have Node.js installed on your machine. If not, download and install the LTS version from here. Next, create a new folder for your project and open it in your preferred code editor. Initialize a new npm project by running npm init -y in your terminal.

Now, install Jest as a development dependency by running:


```javascript
npm install jest -D
```


### Writing Your First Test:

Let's start by writing a simple function and testing it with Jest. Create a new JavaScript file named sum.js and define a function called sum that takes two parameters a and b and returns their sum. Export this function using module.exports.


```javascript
function sum(a, b) {
    return a + b;
}

module.exports = sum;
```

Now, create a test file named sum.test.js. Import the sum function and write a test to verify its correctness.

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
Running Tests:
```
- We imported the sum function using common js import which use require. 

- Then we started a text. Inside the pherenthesis first we have to put a description. In our example it is "add  1 + 2 to equal 3". Then we used annonymous arrow function that will run the test. Inside the function we used word expect and call the sum function and pass 1 & 2 as params and put .toBe(3) means the result we expect is 3. Then we have to test it.



To run your tests, update the test script in your package.json file to "test": "jest". The package.json file will look like as follows
```javascript
{
  "name": "jest-intro",
  "version": "1.0.0",
  "description": "",
  "main": "sum.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^29.6.2"
  }
}
```
To run your tests, execute the following command in your terminal:

```javascript
npm test
```

- Jest will automatically discover and run all files ending with .test.js or .spec.js in your project directory.

- This is a unit test. A unit test tests the smallest unit in isolation. So we just have a function that does one thing. That's a clean code principle. Your function should only do one thing. So this will also help you break down
larger problems into smaller ones, Which helps with problem solving overall. So we have our function it does one thing it just adds the two numbers and we can easily test that in a unit test.

### Expanding Your Testing Suite:

In addition to simple arithmetic functions, you can test more complex functionalities. Create a new file named isPalindrome.js. Create a function to check if a given word is a palindrome.

```javascript
function isPalindrome(word) {
  // Check if the word is the same forwards and backwards

  return word.toLowerCase() === word.toLowerCase().split('').reverse().join('').replaceAll(',','');
}

module.exports = isPalindrome;
```
- Inside a function we should do one thing. But in the above function we did two things. And it is necessary for out later explanation.

Now, let's create a corresponding test file named isPalindrome.test.js to test the isPalindrome function:

```javascript
// isPalindrome.test.js

const isPalindrome = require('./isPalindrome');

test('isPalindrome returns true for "taco cat"', () => {
  expect(isPalindrome('Tacocat')).toBe(true);
});

```

Running Tests:

To execute the tests, run the following command in your terminal:

```javascript
npm test
```
Jest will run all test files in your project and provide feedback on the test results.

- The result will show ee have two test Suites. Now as we have two test files and we ran two
tests and so both of the test Suites
completed and we passed all of the tests. 

- Have we really tested our function the way we should. We only check to see if it would return true. It could also or should also return false
when we pass in a word that is not a palindrome. 

- Lets add something to the above code

```javascript
// isPalindrome.test.js

const isPalindrome = require('./isPalindrome');

test('isPalindrome returns true for "taco cat"', () => {
  expect(isPalindrome('Tacocat')).toBe(true);
});

test('isPalindrome returns false for "Enayet"', () => {
  expect(isPalindrome('Enayet')).toBe(false);
});

```
-  Now let's pass in the word Enayet and we expect the result to be false. So now we're running two tests inside of the same test Suite.

- Let's go ahead and open the terminal run our tests again and see our output. 

- In our report you can see we have two test Suites but we ran three tests now and everything passed once again. 


### Decomposing Functions:

As we write more complex tests, it's essential to decompose functions into smaller, testable units. Let's refactor the isPalindrome function to separate the logic for reversing a string into its own function. Create a new file name reverseString.js and write following function to it. 

```javascript
  function reverseString(word){
    return word.split('').reverse().join('').replaceAll(',','')
  }
  module.exports = reverseString
```
- Now create a test file for it. Create a file with the name of reverseString.test.js and paste following code

```javascript
const reverseString = require('./reverseString')

test('Reverse any given string', () => {
  expect(reverseString('Enayet')).toBe('teyanE')
})
```
- Now go to the isPalindrome.js file and do following 

```javascript
// isPalindrome.js
const reverseString = require('./reverseString')


function isPalindrome(word) {
 
  return word.toLowerCase() === reversedString(word).toLowerCase();
}

module.exports = isPalindrome;
```
- Now if you run the test again everything will pass. 

- Breaking that is palindrome down to a separate
function that reversed the string was the right thing to do to get the accurate unit test, because if we weren't reversing that string properly it could have been causing our is palindrome test to fail without actually being the reason it was failing. The reason was we were not reversing the string properly.

### Getting full report

- Go back into the package.json and when we call jest we can add the coverage flag which is two dashes and then the word coverage. It will look like as follows
```javascript
{
  "name": "jest-intro",
  "version": "1.0.0",
  "description": "",
  "main": "sum.js",
  "scripts": {
    "test": "jest --coverage"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^29.6.2"
  }
}
```

- If we save that then it's going to give us a full report to say if we have tested all of our code. So let's run our test once again with that coverage flag and check out the output. It will be a little more detailed than what we received before and now we're getting a full table here in the terminal with our output. So not only the report at the bottom about the past or failed tests, we also have a full table here that says we are getting 100 percent coverage in everything we have essentially so
there's nothing we're missing. 


# React Testing Library and Jest in Next.js project: Beginner Guide


- The goal of today's lesson is to help you get set up and going with jest in the react testing
library in an Next.js project using typescript.

- At the beginning lets create a new next js project. Create a folder with your project name. Go to address bar and write cmd. Then in the command prompt write

```javascript
  npx create-next-app@latest
```
- Then create the project. Then open the project in vs code. 

- Open the terminal and paste the following code for installing testing library.

```javascript
npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event jest jest-environment-jsdom ts-jest
```
- Check the package.json and inside the devDependencies following 6 files should be present.
```javascript
"devDependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.6.2",
    "jest-environment-jsdom": "^29.6.2",
    "ts-jest": "^29.1.1"
  }
```
- Your version could be different from mine but the property name should be same.

- In the package.json file add some test scripts in the scripts property. Add  "test": "jest" and "test:watch": "jest --watchAll". The second one will allow us to keep watching any changes. The watch all flag which will allow us to continually run the tests if they change fairly quickly. Now the package.json file will look like as follows.

```javascript
 "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watchAll"
  },
```
- Now create a new file at the same level of package.json and name it jest.config.js and paste following code:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)
```

- Now the root level create another file name jest.setup.js and paste the following code

```javascript
import '@testing-library/jest-dom/extend-expect'
```

- Open the terminal and type following and enter

```javascript
  npm i -D eslint-plugin-jest-dom eslint-plugin-testing-library
```

- Now go to the .eslintrc.json file at the root and add following code. 

```javascript
{
  "extends": [
    "next/core-web-vitals",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ]
}
```

- Now at the root of your project create a folder with exact following name __tests__

- Now inside __tests__ folder create a new file with the name of Home.test.tsx. Note that the test file should also end with .tsx or .jsx extension. Paste the following code in the file

```javascript
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

    it('should have Docs text', () => {
        render(<Home />) // ARRANGE 

        const myElem = screen.getByText('Docs') // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    })
    
```
- If you find any error in the it and expect then go to the terminal and type following and press enter.

```javascript
npm i -D @testing-library/jest-dom@5.16.5
```

- We imported render and screen from react testing library. We also imported Home component from the app directory of root home page because we are going to test it. 

- There is a pattern for writing tests and it is called triple a pattern (Arrange, Act & Assert). First you arrange everything for the test, then you take an action and at last we check everything and provide the assertion. We will demonstrate them in code later.  

- We will begin to write test by the word of "it". Then inside perenthesis we will describe it as "should have Docs text", and now we need a function to check that and it's a Anonymous Arrow function. 
- Inside the arrow function first we call render and it will render the Home component. So it will fall under the arrange.

- In the action we created myElem variable. from screen we call getByText and pass "Docs" word that we want to search from the home component. 

- In the assertion we called expect and pass myElem to it. Then we also called toBeInTheDocument.

- Now save the file and open terminal and type npm test and press enter. The result will show pass as in the default Home component there is a word Docs so our test passed. 

- How it work? At the beginning inside the package.json file we wrote "test":"jest". So when we will write npm test in the terminal it will go to the __tests__ folder and run test on every file inside that folder. 

- The home.test.tsx is called test suite. If we want to write more test in the same suite we can wrap the test by describe anonymous function. And inside the describe function we will write all the tests. The test suite will look like as follows

```javascript
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
    it('should have Docs text', () => {
        render(<Home />) // ARRANGE 

        const myElem = screen.getByText('Docs') // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    })
})
```

- Now we will create another test that will check whether `information` word is included in the Home component.  The code will be like following. 

```javascript
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
    it('should have Docs text', () => {
        render(<Home />) // ARRANGE 

        const myElem = screen.getByText('Docs') // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    })

    it('should contain the text "information"', () => {
        render(<Home />) // ARRANGE 

        const myElem = screen.getByText(/information/i) // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    })

})
```
- The test will be almost same as previous test but we will use regex function inside the getByText function like (/information/i). The i flag will make sure that it doesn't matter if it's all caps or lowercase it's case insensitive.

- After saving the file open the terminal and type npm test and press enter. It should show one suite and two tests passed. 

- Let's add a third test in the test suite and we want to search for heading the Home component. The code will be look like following

```javascript
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
    it('should have Docs text', () => {
        render(<Home />) // ARRANGE 

        const myElem = screen.getByText('Docs') // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    })

    it('should contain the text "information"', () => {
        render(<Home />) // ARRANGE 

        const myElem = screen.getByText(/information/i) // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    })

    it('should have a heading', () => {
        render(<Home />) // ARRANGE 

        const myElem = screen.getByRole('heading', {
            name: 'Learn'
        }) // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    })
})
```
- Here we used getByRole instead of getByText and mention the role as heading. We can also be more specific by putting the heading name in an object. In the above example we search Learn heading. 

- Now if we run the test by typing npm test in the terminal it will show fail result for third test. Because if you go to the Home component then you will see there are other things inside the heading with Learn text. So the test failed. If we remove everything from the heading except Learn text and run the test again then we will get pass result.


# React Testing Library and Jest in Next.js & React project: Intermediate Guide

```javascript

```
```javascript

```
```javascript

```
```javascript

```
```javascript

```