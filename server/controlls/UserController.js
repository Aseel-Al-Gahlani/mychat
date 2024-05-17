// import users from "../models/user.js";
const users = require("../models/user");
const login_info = require("../models/login_info");

 async function chackPassword(username, pass) {
  try {
    const user = await login_info.matchPassword(username, pass);
    return user;
  } catch (e) {
    throw e;
  }
}

 async function getUserBysocketId(socketID) {
  try {
    const user = await users.getUserBysocketID(socketID);
    return user;
  } catch (e) {
    throw e;
  }
}


 async function changSocketID(loginID,socketID) {
  try {
    const user = await users.updateSocketID(loginID, socketID);
    return user;
  } catch (e) {
    throw e;
  }
}
module.exports = {
  chackPassword,
  getUserBysocketId,
  changSocketID,
};