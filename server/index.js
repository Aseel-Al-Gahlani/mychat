const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
// import { auth } from "middleware/auth.js";
const auth = require("./middleware/auth");
app.use(cors());
const PORT = 4000;
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.use((socket, next) => auth(socket, next));



app.get("/", (req, res) => {
  res.json({
    message: "hallo",
  });
});


let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  // const socketid
  socket.on("message", (data) => {
    socketIO.to(data.recived).emit("messageResponse", data);
  });

  socket.on("getChats", (data) => {
    console.log('tytytty');
    socketIO.to(data.userName).emit("chatResponse", users);
  });


  
    
     socket.on("typing", (data) =>
       socket.broadcast.emit("typingResponse", data)
     );

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    socket.join(data.userName);
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.to(data.userName).emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});
http.listen(PORT, () => console.log("listen"));
