# Web socket

### Definition 

In order to understand WebSocket properly we have to know the mechanism of HTTP first. 

HTTP and WebSocket both are communication protocols used in client-server communication. 


- HTTP, the Hypertext Transfer Protocol, facilitates communication between clients and servers. In this protocol:

- Communication is unidirectional: Clients send requests, and servers respond.

- Each request corresponds to a single response, and the connection closes after the response.

- Messages are encoded in ASCII, containing protocol version, methods (e.g., GET, POST), headers (e.g., content type, length), host information, and message body.

WebSocket is a bidirectional, full-duplex protocol used for client-server communication. Unlike HTTP, WebSocket maintains a stateful connection, staying alive until terminated by either party.

In this protocol:

- The client-server handshake initiates connection establishment.
- The connection remains open, facilitating ongoing communication.
- Messages are exchanged bidirectionally over the same connection.
- If either party terminates the connection, it closes from both ends.


When can a web socket be used: 
 

- Real-time web application:  e.g. in a trading website or bitcoin trading, for displaying the price fluctuation and movement data.
 
- Gaming application: 
 
- Chat application: 

WebSocket is ideal for real-time updates or continuous data streams over the network. However, it's not recommended in scenarios where:

- Old data retrieval is the primary need.
- Data is required infrequently or only once for processing.
- Simple HTTP requests can efficiently handle the data retrieval without the need for continuous streaming.

### Technology required to implement the project

- Node.js

### Creating Project

- Create a new folder with any name you want. My folder name is webSocket. Open the webSocket folder in VS code. Inside webSocket folder create a folder with the name of app it will be used for front end and create another folder with the name of server, it will be used for backend. 

### Setting up basic web socket server

- Open vs code terminal and type cd server so you will be transferred to server folder. Now to create a project type following and press enter.

```javascript
npm init -y
```

- We will use we:a Node.js WebSocket library. You have to go to the terminal of the server and type following and enter.

```javascript
npm i ws
```

- Also install nodemon. It will help you to run the server each time code change in the editor. Type following and press enter.

```javascript
npm i nodemon
```

- Go to the package.json file and under the scripts write "start": "nodemon index"

- Go to the root directory of the server and create a new file with the name of index.js

- Inside that file paste following code.

```javascript
  const ws = require('ws')
  const server = new ws.Server({ port: '3000' })

  server.on('connection', socket => {
    socket.on('message', message => {
      console.log(message)
      socket.send(`${message}`)
    })
  })
```

- First line import the ws that we installed earlier. 

- Then we defined the server where we created a new ws server that will run on port 3000. 

- By writing server.on we are creating a connection and once the connection is established with websockets we created a function socket.on will listen for a message. the message function will take the message from server and show it in console and return the same message to the server. 

### Setting up frontend 

- Go to the app folder

- Create a file with the name of index.html. Then type ! and press enter. A boilerplate will be given to you by vs code. Change the text inside the title tag.