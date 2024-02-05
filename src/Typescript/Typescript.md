### Index

- Assigning type at the time of declaring a variable
- Dynamic or any type
- Function type
- Function signature
- Type Aliases


### Assigning type at the time of declaring a variable
- After the variable name we will put a : and then declare the type. 
```javascript
let a : string; // Now we cannot assign anything to a except string.
let aa : string | number; // Now we assign string and number type to this variable. Now we cannot assign anything to aa except string and number. This is called union type.
let b : number; // Now we cannot assign anything to b but number.
let c : string[] = []; //  Now we cannot push anything to c except string.
let d : number[] = []; // Now we cannot push anything to d except number.
let e : (string | number)[] = [] // Now we assign string and number type to this array. So we can push string and number only nothing other than that. 
let f : object; // Now we can put any object inside f. As we did not mention the schema so we can put any property to the object. As array is an object so we can store an array inside f. 
let g : {
  name: string,
  age: number,
  adult: boolean,
} // In this case we defined the schema of the object that can be stored inside g. So if we want to keep any object inside g it must have three properties name, age, adult and their value must have to be string, number and boolean respectively. As here property of the object is mentioned so we cannot insert an array inside it.
```

- The declaration of type must be in small letter not in capital letter only exception is function where we use capital F. 

### Dynamic or any type

```javascript
let a; // By default typescript assume that any type of item can be stored here. 

let a:any; // Here we explicitly mentioning that this a variable will store any type of data. We will always try to avoid any type as setting it means we cannot get the benefit of using typescript. We can only set this when we will not know in advance about the type of value it will hold. 

let b: any[] = [] // In this case we set the array type any. That means we can push string, number, boolean anything inside it. 

let c: {
  name: any,
  age: any,
} // In this case we set any type to object property so each property can store any type of data.

```

### Function type

- Declaring a function

```javascript
let myFunc: Function; // Here we declare a variable name myFunc and assign its type to function so later we can only assign function to myFunc variable nothing else. 
```

- Setting parameter and its type

```javascript
const myFunc = (a: string, b: string) => {
  console.log(`Hello ${a} ${b}`)
} // Here we declared a function that will take two parameter a and b. and set type string for both a and b. So at the time of calling the function if you pass props anything other than string it will show error. 
```

- Setting optional parameter

```javascript
const myFunc = (a: string, b: string, c?: string) => {
  console.log(c)
  console.log(`Hello ${a} ${b}`)
} // Here c is optional parameter and by putting ? after c we made it optional. If user do not pass c props then console.log of c will show undefined. 
```

- Setting default value for a parameter

```javascript
const myFunc = (a: string, b: string, c: string = 'Hi') => {
  console.log(c)
  console.log(`Hello ${a} ${b}`)
} // Here we put 'Hi' as default value of c. 
```

- Function that does not return anything will show void in typescript. In javascript it shows undefined. Void means nothing but undefined means there is a value but it is not defined. 

- Setting the return type of a function

```javascript
const myFunc = (a: string, b:string) =>{
  return a + b
} // In this case typescript will automatically show return type as a string as it infer that concatenation of two string will result a new string.
```

```javascript
const myFunc = (a: string, b:string) : string =>{
  return a + b
} // Here we explicitly define the type of output is string.
```
 
### Function signature

- Below is a signature of a variable
```javascript 
let a: string;
```
- In this case we declared a variable named a and set its type as string. So later if anyone wants to assign value to this variable they can assign only string. This is called variable signature. We can do it for function. If any programmer later want to use the function he/she must have to follow the signature. 

```javascript
let add: (x: number, y: number) => number; // This is a function signature that tells if you later assign a function to this variable then it will take two parameter and both of them must be number and the function must return a number. In the case the function can not be a void function. 

add = (a: number, b: number)=>{
  return a + b; 
} // Here we assign value to add function that means we wrote the body. We can give the parameter a different name. Here it is a and b instead of function signature x and y. We have to make sure that the parameter type must match with function signature. We cannot add new parameter to this function. And we cannot make this void function here. 
```
- Sometimes inside a function we may write if and if else condition that time each block must return the type set at the function signature. 

```javascript
let calculation :(x: number, y: number, z: string) => number;

calculation = (a: number, b: number, c: string) => {
  if(c === 'add'){
    return a + b
  }else {
    return a - b;
  }
} // In this case we have if and else block inside the function. We must have to return number from each block otherwise typescript will throw an error. 
```
- We can pass object type union type to a function signature. Object name in function signature and function assignment could be different but object property name must be same. 

```javascript
let userDetails: (id: number | string, userInfo: {
  name: string,
  age: number,
}) => void;

userDetails = {id: number | string, user:{
  name: string, 
  age: number,
}} => {

} // In this case object name in function signature and in function declaration is different but object property name is same. 
```

### Type Aliases


- Type aliases is declaring type separately and the assigning type name to the variable. This will help to use same type in multiple variable. It will also make the code cleaner. 

```javascript
type stringOrNum = string | number;
type userType = {name: string, age: number}

const userDetails = (id: stringOrNum, user: userType) => {
  console.log(`user id is ${id}, name is ${user.name} and age is ${user.age}`)
}

const sayHello = (user: userType) => {
  console.log(`Hello ${user.age} > 50 ? "Sir" : "Mr." ${user.name}`)
}
```
- In the above example we declared two type stringOrNum and userType. Then inside the userDetails function stringOrNum is assigned to id and userType is assigned to user. Later in the sayHello function also userType is assigned to user. 

### Interface
