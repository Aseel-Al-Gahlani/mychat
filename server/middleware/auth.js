// import redis from "../config/redis.js";
// import { v4 as uuidv4 } from "uuid";
// import { createToken, decodeToken } from "../config/jwt.js";

const { createToken, decodeToken } = require("../config/jwt");
const {
  getUserBysocketID,
  changSocketID,
  chackPassword,
} =require("../controlls/UserController");
// const sessionStorage = new RedisSessionStorage(redis);

  async function auth(socket, next)  {
   try {
     const token = socket.handshake.auth.token;
     if (token) {
       const jwtToken = decodeToken(token);
       if (jwtToken) {
         const session = await getUserBysocketID(jwtToken.socketId);
         if (session) {
           socket.user = {
             username: jwtToken.username,
             userId: jwtToken.userId,
             // email: jwtToken.email,
             // image: jwtToken.image,
           };
           socket.userId = jwtToken.userId;
           socket.username = jwtToken.username;
           socket.socketId = jwtToken.socketId;
           socket.token = token;
           socket.join(jwtToken.socketId);

           return next();
         } else {
           return next(new Error("Invalid session"));
         }
       } else {
         return next(new Error("Invalid token"));
       }
     }
     const user = socket.handshake.auth.user;
     if (!user) {
     console.log("tuuuuuuuuu");
       return next(new Error("Invalid user"));
     }

     const loginuser = await chackPassword(user.name, user.chackPassword);
     if (loginuser) {
       const socketId = socket.id; // uuidv4();
       const updateUser = await changSocketID(loginuser.id, socketId);
       const userObj = {
         username: user.name,
         userId: loginuser.id,
         socketId: loginuser.id,
         // image: user.imageUrl,
       };

       socket.user = userObj;
       socket.username = user.name;
       socket.userId = loginuser.id;
       socket.socketId = socketId;
       socket.token = createToken(userObj);
       socket.join(socketId);
       next();
     } else {
       return next(new Error("Invalid user"));
     }
   } catch (error) {
     next(new Error(error.message));
   }
 };
module.exports =  (socket, next)=>auth(socket, next) ;