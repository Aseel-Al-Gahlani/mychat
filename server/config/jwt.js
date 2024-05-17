// import jwt from "jsonwebtoken";
// import config from "../../config.js";
const jwt = require("jsonwebtoken");
const config = require("../config");
const privateKey = config.jwtPrivateKey;

 function createToken(obj) {
  const token = jwt.sign(obj, privateKey);
  return token;
}

 function decodeToken(token) {
  try {
    const jwtDecoded = jwt.verify(token, privateKey);
    return jwtDecoded;
  } catch (error) {
    return null;
  }
}
module.exports = { createToken, decodeToken };