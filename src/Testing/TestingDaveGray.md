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
- Clone the following git repo in your pc by putting following command in the command prompt or terminal of vs code
```javascript
git clone https://github.com/gitdagray/next-testing-intro.git
```
- Then go to the next-testing-intro folder and type npm i and press enter. 

## Setting the basic file before test

### Setting the types
- Go to the src folder and create a new folder name types. Create a new file name Todo.ts. In this file we will keep out typescript types. Paste the following code in the file
```javascript
export type Todo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}
```
- In our todo app we will have four thing. userId and id which will be number, title will be string and completed will boolean. 

### Creating home page

- Go to the app folder and inside the page.tsx paste following code. 

```javascript
"use client"

import TodoList from "./components/TodoList/TodoList"
import AddTodo from "./components/AddTodo/AddTodo"
import { useState } from "react"
import type { Todo } from "@/types/Todo"


export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      "userId": 1,
      "title": "Wave hello! 👋",
      "completed": false,
      "id": 1
    },
    {
      "userId": 1,
      "title": "Get Coffee ☕☕☕",
      "completed": false,
      "id": 2
    },
    {
      "userId": 1,
      "title": "Go to Work ⚒",
      "completed": false,
      "id": 3
    },
    {
      "userId": 1,
      "title": "Write Code 💻",
      "completed": false,
      "id": 4,
    }
  ])

  return (
    <>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}
```
- By writing use client at the top of the component we made the whole app as client component. So it becomes a react app rather than a next app. In real project you should not do it. The reason why we do it is that when you set the parent component to use client then you don't really need to do that for the child
components because if the parent is a 
client component then all of its children will be. As we are not dealing with real api so we will do like it. 

- We imported TodoList and AddTodo component that will be used here. We also imported useState hook from react to store fake todo's. The Todo type also imported for typescript to working properly.

- Inside the home function useState is called and Todo type used here and as a default value some fake todo object is stored inside the array. 

- Then inside the return AddTodo component is called and setTodos is passed as props so that from that component new todos can be added.

- Thereafter TodoList component is called and todos and setTodos passed as a props. 

### Crating AddTodo component
- Go to the app folder and create a new folder with the name of AddTodo and inside that folder create a file with the name AddTodo.tsx and paste the following code inside the file.
```javascript
import { useState, FormEvent } from "react"
import type { Todo } from "@/types/Todo"

type Props = {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function AddItemForm({ setTodos }: Props) {
    const [item, setItem] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!item) return

        setTodos(prev => {
            const highestId = [...prev].sort((a, b) => b.id - a.id)[0].id

            return [...prev, { userId: 1, title: item, completed: false, id: highestId + 1 }]
        })

        setItem("")

    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">

            <label hidden htmlFor="title">New Todo</label>
            <input
                type="text"
                id="title"
                name="title"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="text-2xl p-1 rounded-lg flex-grow w-full"
                placeholder="New Todo"
                autoFocus
            />

            <button
                type="submit"
                className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400 disabled:bg-gray-300"
                disabled={!item ? true : false}
            >
                Submit
            </button>

        </form>
    )
}
```

- We imported Todo type for typescript and useState and FormEvent from react.

- A new type created with the name of Props for setTodos function that received from the home page. 

- We declared AddItemForm and it received setTodos as props. 

- A useState is declared with empty string for storing item. 

- Next we created a handleSubmit asynchronous function. It check if there is nothing in the item state then it will return from there. 

- Then if there is items in item state then setTodos function is called. 

- Then we creates a copy of the previous todos array using the spread operator [...prev]. Then it sorts this copied array in descending order based on the id property of each todo object. After sorting, it retrieves the first todo object, which should have the highest id. It then extracts the id property of this todo and assigns it to highestId.

- The return line returns a new array of todos. It spreads the previous todos [...prev], and then appends a new todo object to the end of the array. This new todo object has a userId of 1, a title taken from the item variable, a completed status of false, and an id that's one greater than the highestId found in the previous todos.

- At last setItem is used to clear the item state. 

- Inside the return at first there is a label which is hidden. It is created so that the typescript does not complain. 

- Then the input tag, its type is text, id and name is title, its take item as value, setItem function set the value of input field on change. 

- At last we have a submit button. If no item is in the item state then it will be enable and if there is any item in the item state then it will be disabled. 

### Creating the header component

- Inside the component folder create a new folder with the name of Header and inside that folder and create a file name with Header.tsx and paste the following code inside it. 

```javascript
export default function Header({ title }: { title: string }) {
    return (
        <h1 className="text-3xl font-bold mb-0 text-white/90">
            {title}
        </h1>
    )
}
```
- The header function received title as a props and show it inside a h1.

### Creating TodoItem component

- Inside the component folder create a new folder with the name of TodoItem and inside that folder and create a file name with TodoItem.tsx and paste the following code inside it. Also open the terminal and install react icon. Type npm i react-icons and press enter

```javascript

import { FaTrash } from "react-icons/fa"
import { ChangeEvent, MouseEvent } from 'react'
import { Todo } from "@/app/types/Todo"


type Props = {
    todo: Todo,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function TodoItem({ todo, setTodos }: Props) {

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setTodos(prevTodos => [...prevTodos.filter(prev => prev.id !== todo.id), { ...todo, completed: !todo.completed }])
    }

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        setTodos(prev => [...prev.filter(td => td.id !== todo.id)])
    }

    return (
        <article className="my-4 flex justify-between items-center">
            <label className="text-2xl hover:underline" data-testid="todo-item" htmlFor={todo.id.toString()}>
                {todo.title}
            </label>
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    id={todo.id.toString()}
                    name="completed"
                    onChange={handleChange}
                    className="min-w-[2rem] min-h-[2rem]"
                />

                <button
                    data-testid="delete-button"
                    onClick={handleDelete}
                    className="p-3 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-400 hover:cursor-pointer hover:bg-red-300">
                    <FaTrash />
                </button>
            </div>
        </article>
    )
}
```
- We imported trash icon from react icons. We also imported ChangeEvent and MouseEvent from react that will be used for typescript and at last we imported Todo for typescript.

- We declared a new type with the name of Props.

- We declared a TodoItem function that takes and todo and setTodos as props. 

- A handleChange asynchronous function is declared that will be responsible for handling the completed status change of the todo. 

- Inside the handleChange function setTodo function is called and  It filters the previous todos array (prevTodos) to remove the todo with the same id as the current todo being modified. Then, it appends a modified version of the current todo at the end of the array. The modification includes toggling the completed property of the todo.

- Then comes the handleDelete function. It is an asynchronous arrow function. It takes an event e of type MouseEvent<HTMLButtonElement>, indicating that it responds to clicks on HTML button elements.

- Inside the function body, it uses the setTodos function to update the state of todos. Similar to the previous code snippets, it follows the functional update pattern, where prev represents the previous state of todos. It constructs a new array of todos. It filters the previous todos array (prev) to exclude the todo item with the same id as the current todo being deleted. This effectively removes the todo item from the list.

- Inside the return first thing is an article tag then a label tag that show the title of todo. The label tag has an attribute named "data-testid" it is important for our testing. We will use this attribute to find the tag when we will run the test. 

- Then we have input tag that is checkbox type, the checked property is selected based on the completed status of todo, handleChange event handler is attached with it. 

- At last we have a button that also has "data-testid" attribute that is necessary to find out the button in our test file. handleDelete function is attached with the button. 

### Creating TodoList component

- Inside the component folder create a new folder with the name of TodoList and inside that folder and create a file name with TodoList.tsx and paste the following code inside it. 

```javascript
import TodoItem from "../TodoItem/TodoItem"
import type { Todo } from "@/types/Todo"

type Props = {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function TodoList({ todos, setTodos }: Props) {

    let content
    if (todos.length === 0) {
        content = <p>No Todos Available</p>
    } else {
        const sortedTodos = todos.sort((a, b) => b.id - a.id)

        content = (
            <>
                {sortedTodos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
                ))}
            </>
        )
    }

    return content
}
```
- We imported Todo type for typescript and TodoItem component.

- A new type is created the name of Props for typescript.

- TodoList function takes todos and setTodos as props. 

- We declared a content variable.

- If and else condition is run it check it the todos length is 0 then content value is set to No Todos Available. Otherwise todos are sorted based on last id comes first and stored them in the sortedTodos variable. Then sortedTodos is mapped and for each todo the TodoItem component is called and todo adn setTodos is passed as props. And the whole thing is assigned to the content variable. 

At last the component return the content variable. 

### Creating Navbar component

- Inside the component folder create a new file name with Navbar.tsx and paste the following code inside it. We didn't created any folder for it as we are not going to run any test on it. 

```javascript
import Header from "./Header/Header"

export default function Navbar() {
    return (
        <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
            <div className="max-w-xl mx-auto sm:px-4 flex justify-between">
                <Header title="Next Todos" />
            </div>
        </nav>
    )
}
```
- 

## Setting the test 

- The file structure for test is as follows. Inside the app folder i created a __tests__ folder for home page test script. 

- For all components inside the component folder i created __tests__ folder inside each of the component folder for storing testing file of each component. 

- Inside each component folder the test file run unit test. The test file for home page is used for integration test. 

### Unit test for AddToDo component

- Inside the AddTodo folder create a new folder named with __tests__ and inside that folder create a new file with the name of AddTodo.test.tsx and paste the following code inside that file.

```javascript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddItemForm from '../AddTodo'

const mockSetTodos = jest.fn()

describe('AddTodo', () => {

    describe('Render', () => {

        it('should render the input', () => {
            render(<AddItemForm setTodos={mockSetTodos} />) // ARRANGE

            const input = screen.getByPlaceholderText('New Todo') //ACT

            expect(input).toBeInTheDocument()// ASSERT
        })

        it('should render a disabled submit button', () => {
            render(<AddItemForm setTodos={mockSetTodos} />) // ARRANGE

            //ACT
            const button = screen.getByRole('button', {
                name: 'Submit'
            })

            expect(button).toBeDisabled()// ASSERT
        })

    })

    describe('Behavior', () => {

        it('should be able to add text to the input', async () => {
            render(<AddItemForm setTodos={mockSetTodos} />) // ARRANGE

            const input = screen.getByPlaceholderText('New Todo') //ACT
            await userEvent.type(input, 'hey there')
            expect(input).toHaveValue("hey there")// ASSERT
        })

        it('should enable the submit button when text is input', async () => {
            render(<AddItemForm setTodos={mockSetTodos} />) // ARRANGE

            const input = screen.getByPlaceholderText('New Todo') //ACT
            await userEvent.type(input, 'hey there')

            const button = screen.getByRole('button', {
                name: 'Submit'
            })

            expect(button).toBeEnabled() // ASSERT
        })

        it('should empty the text input when submitted', async () => {
            render(<AddItemForm setTodos={mockSetTodos} />) // ARRANGE

            const input = screen.getByPlaceholderText('New Todo') //ACT
            await userEvent.type(input, 'hey there')
            const button = screen.getByRole('button', {
                name: 'Submit'
            })
            await userEvent.click(button)

            expect(input).toHaveValue("")// ASSERT
        })

        it('should call setTodos when submitted', async () => {
            render(<AddItemForm setTodos={mockSetTodos} />) // ARRANGE

            const input = screen.getByPlaceholderText('New Todo') //ACT
            await userEvent.type(input, 'hey there')
            const button = screen.getByRole('button', {
                name: 'Submit'
            })
            await userEvent.click(button)

            expect(mockSetTodos).toBeCalled()// ASSERT
        })

    })
})
```

- You may get "userEvent.type is sync and does not need await operator" error by eslint. You can ignore it. 

- At the beginning we imported render and screen from testing library. 

- Then we imported userEvent. This kind of simulates a user. It can actually trigger more than one event. Using the user event is more like what you would see from a user. This is not the same as end-to-end testing but at the same time it can uncover some things that might be unexpected otherwise using user event is a good idea.

- And the last import is AddItemForm component on which the test will be made. 

- I've got a mockSetTodo here because we're testing this in isolation and then I need a mockSetTodo's as well because this component receives both the to do and setTodo's. So this mockSetTodo's you can use jest.FN which stands for function and that can just be a mock function. We're not really looking for how the setToDo's works but we can confirm that it is called .

- Generally there is a describe function inside a test suite. But in this component i want to perform two types of tests, Render and Behavior. So inside the main describe function there are two describe function. First one is for Render where I'm checking how things should render and second one is for Behavior this is where I expect how some of the things in the component to behave. Inside each there are several tests. 

- The first test inside render is to test whether the component render a input. We should be able to get that input tag by looking for the placeholder text that is a 'New Todo' and we expect it to be in the document.

- The second test inside render is to test whether the component render a disabled submit button. We searched the button based on role that is 'button' and we became more specific by adding an object that mention the name of the button is "Submit". At last we want the assertion that the button is disabled. 

- Now let's move to the behavior section. 

- The first test will check whether text can be added in the input field. AddItemForm is passed to the render function together with setTodos. In the action part the input field is grabbed by placeholder text of "New Todo" and put it inside the input variable. Then user event is called and type property of user event is used. So in the input field it will type "hey there" and at the assertion we expect the input field should have value of 'hey there'.

- The second test check whether the submit button becomes active once there is text in the input field. In the action part the input field is grabbed by placeholder text of "New Todo" and put it inside the input variable. Then user event is called and type property of user event is used. So in the input field it will type "hey there". Then button is searched using getByRole also button name Submit also passed as an object to find it more accurately. At last in the assertion we passed the button variable and expect it should be enabled. 

- The third test check that whether input field become empty after submission. In the action part the input field is grabbed by placeholder text of "New Todo" and put it inside the input variable. Then user event is called and type property of user event is used. So in the input field it will type "hey there". Then button is searched using getByRole also button name Submit also passed as an object to find it more accurately. Then we perform another user event that perform click function at the button. Later we pass the input field to the assertion and expect it should have empty string. 

- The last test check that whether setTodos function is called once the submit button is clicked. Again in the action part the input field is grabbed by placeholder text of "New Todo" and put it inside the input variable. Then user event is called and type property of user event is used. So in the input field it will type "hey there". Then button is searched using getByRole also button name Submit also passed as an object to find it more accurately. Then we perform another user event that perform click function at the button. At the assertion we passed the mockSetTodos and expect it to be called. 


- 
### Unit test for Header component

- Inside the Header folder create a new folder named with __tests__ and inside that folder create a new file with the name of Header.test.tsx and paste the following code inside that file.

```javascript
import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {

    it('should render the "Next Todos" heading', () => {
        render(<Header title="Next Todos" />) // ARRANGE

        //ACT
        const header = screen.getByRole('heading', {
            name: 'Next Todos'
        })

        expect(header).toBeInTheDocument()// ASSERT
    })

    it('should render "Dave" as a heading', async () => {
        render(<Header title="Dave" />) // ARRANGE

        //ACT
        const header = screen.getByRole('heading', {
            name: 'Dave'
        })

        expect(header).toBeInTheDocument()// ASSERT
    })
})
```
- This suite perform two test. First one check whether the Header component render Next Todos heading and Second one check whether the Header component render Dave heading. 

### Unit test for TodoItem component

- Inside the TodoItem folder create a new folder named with __tests__ and inside that folder create a new file with the name of TodoItem.test.tsx and paste the following code inside that file.

```javascript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '../TodoItem'

const mockTodo = {
    "userId": 1,
    "title": "Wave hello! 👋",
    "completed": false,
    "id": 1
}

const mockSetTodos = jest.fn()

describe('AddTodo', () => {

    describe('Render', () => {

        it('should render an article', () => {
            render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />) // ARRANGE

            //ACT
            const article = screen.getByRole('article')

            expect(article).toBeInTheDocument()// ASSERT
        })

        it('should render a label', () => {
            render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />) // ARRANGE

            //ACT
            const label = screen.getByTestId('todo-item')

            expect(label).toBeInTheDocument()// ASSERT
        })

        it('should render a checkbox', () => {
            render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />) // ARRANGE

            //ACT
            const checkbox = screen.getByRole('checkbox')

            expect(checkbox).toBeInTheDocument()// ASSERT
        })

        it('should render a button', () => {
            render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />) // ARRANGE

            //ACT
            const button = screen.getByRole('button')

            expect(button).toBeInTheDocument()// ASSERT
        })

    })

    describe('Behavior', () => {


        it('should call setTodos when checkbox clicked', async () => {
            render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />) // ARRANGE

            //ACT
            const checkbox = screen.getByRole('checkbox')
            await userEvent.click(checkbox)

            expect(mockSetTodos).toBeCalled()// ASSERT
        })

        it('should call setTodos when button clicked', async () => {
            render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />) // ARRANGE

            //ACT
            const button = screen.getByRole('button')
            await userEvent.click(button)

            expect(mockSetTodos).toBeCalled()// ASSERT
        })

    })
})
```
- It has two describe function inside the parent describe function. The first describe function run four test and check whether the component render an article, a label, a checkbox and a button. 

- The second describe function check that after checkbox is clicked whether the setTodos function is called and also when the button is clicked whether the setTodos function is called. 

### Unit test for TodoList component

- Inside the TodoList folder create a new folder named with __tests__ and inside that folder create a new file with the name of TodoList.test.tsx and paste the following code inside that file.

```javascript
import { render, screen } from '@testing-library/react'
import TodoList from '../TodoList'

const mockTodos = [
    {
        "userId": 1,
        "title": "Wave hello! 👋",
        "completed": false,
        "id": 1
    },
    {
        "userId": 1,
        "title": "Get Coffee ☕☕☕",
        "completed": false,
        "id": 2
    },
]

const mockSetTodos = jest.fn()

describe('TodoList', () => {

    it('should render "No Todos Available" when the array is empty', () => {
        render(<TodoList todos={[]} setTodos={mockSetTodos} />) // ARRANGE

        //ACT
        const message = screen.getByText('No Todos Available')

        expect(message).toBeInTheDocument()// ASSERT
    })

    it('should render a list with the correct number of items', () => {
        render(
            <TodoList todos={mockTodos} setTodos={mockSetTodos} />
        ) // ARRANGE

        //ACT
        const todosArray = screen.getAllByRole('article')

        expect(todosArray.length).toBe(2)// ASSERT
    })

    it('should render the todos in the correct order', () => {
        render(
            <TodoList todos={mockTodos} setTodos={mockSetTodos} />
        ) // ARRANGE

        //ACT
        const firstItem = screen.getAllByTestId("todo-item")[0]

        expect(firstItem).toHaveTextContent("Get Coffee ☕☕☕")// ASSERT
    })

})
```
- This test suite test three things. 

- First it check if todos array is empty the component should render message that "No Todos Available". In the action part we searched the text "No Todos Available" using getByText function and stores it inside the message variable. Then at the assertion we passed the message and expect it should be present in the component.

- Second we check whether the component render a list with correct number of items. Initially we render the TodoList components with todos and setTodos. In the action part we searched all the article in the components using getAllByRole and store it inside todosArray variable. At last in the assertion we checked whether the todosArray length is 2 or not. 

- The third and last test check whether the todos are render in correct order. Initially we render the TodoList components with todos and setTodos. In the action part we searched using getAllByTestId and the testId value is "todo-item" and the first one is stored in firstItem variable. Then in the assertion we passed the firstItem variable inside the expect function and expect "Get Coffee ☕☕☕" as a result. 





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