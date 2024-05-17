// const orm = require('../config/orm');

// import orm from "../db/orm.js";

const orm = require("../db/orm");
const login_info = {
  name: "users",

  listAll: async function () {
    const result = await orm.selectAll(this.name);
    return result;
  },

  getfollow: async function (userId) {
    const result = await orm.findOne(
      "followinguser",
      "*",
      `user_id = \'${userId}\'`
    );
    if (result == []) return null;
    else return result[0];
  },

  getAllUserInf: async function (userId) {
    const result = await orm.directQuery(
      `SELECT users.*, CONCAT('[',GROUP_CONCAT(CONCAT('{'following.*'}'))']') AS followings,
       CONCAT('[',GROUP_CONCAT(CONCAT('{'follower.*'}'))']') AS followers,
        FROM users JOIN followinguser as following ON users.id = following.user_id AND followinguser as follower ON users.id = follower.follow_userid  WHERE users.id = ${userId};`
    );
    return result;
  },

  // getAllUser: async function () {
  //   const result = await orm.directQuery(
  //     `SELECT users.*, CONCAT('[',GROUP_CONCAT(CONCAT('{', following.* ,'}'))']') AS followings,
  //   CONCAT('[',GROUP_CONCAT(CONCAT('{', follower.* ,'}'))']') AS followers
  //   FROM users
  //   JOIN followinguser as following ON users.id = following.user_id
  //   JOIN followinguser as follower ON users.id = follower.follow_userid;`
  //   );
  //   return result;
  // },
  // getAllUser: async function () {
  //   const result = await orm.directQuery(
  //     `SELECT users.*, CONCAT('[',GROUP_CONCAT(JSON_OBJECT('{'followinguser.*'}'))']') AS followings
  //     FROM users LEFT JOIN followinguser ON users.id = followinguser.user_id;`
  //   );
  //   return result;
  // },

  getAllUser: async function () {
    const result = await orm.directQuery(
      `SELECT users.*, CONCAT('[',GROUP_CONCAT(JSON_OBJECT('followinguser', followinguser.*)),']') AS followings
    FROM users LEFT JOIN followinguser ON users.id = followinguser.user_id;`
    );
    return result;
  },

  matchPassword: async function (userName, inputPassword) {
    let target = "user_password";
    let index = `(user_name = '${userName}')`;
    let result = await orm.findOne(this.name, target, index);
    return result[0].user_password === inputPassword;
  },

  checkExistingUsername: async function (newUsername) {
    const column = "user_name";
    const exists = `(user_name = '${newUsername}')`;
    const result = await orm.findOne(this.name, column, exists);
    return result[0];
  },

  addNew: async function (username, password) {
    const vars = "(user_name, password)";
    const data = `('${username}', '${password}')`;
    await orm.insertOne(this.name, vars, data);
  },

  addNewUser: async function (username, password, firstname, lastname) {
    const vars = "(user_name, password, firstname, lastname)";
    const data = `('${username}', '${password}', '${firstname}', '${lastname}')`;
    await orm.insertOne(this.name, vars, data);
  },

  matchWithUser: async function (username) {
    const column = "*";
    const where = `(user_name = '${username}')`;
    const result = await orm.findOne(this.name, column, where);
    return result[0];
  },

  getId: async function (username, password) {
    const result = await orm.findOne(
      this.name,
      "id",
      `user_name = \'${username}\' AND user_password = \'${password}\'`
    );
    if (result == []) return null;
    else return result[0];
  },

  getUser: async function (username) {
    const result = await orm.findOne(
      this.name,
      "*",
      `user_name = \'${username}\'`
    );
    if (result == []) return null;
    else return result[0];
  },

  getUserInf: async function (userId) {
    const result = await orm.directQuery(
      `SELECT users.*, CONCAT('[',GROUP_CONCAT(CONCAT('{'followinguser.*'}'))']') AS followers
        FROM users JOIN followinguser ON users.id = followinguser.user_id WHERE users.id = ${userId};`
    );
    return result;
  },

  getUserById: async function (id) {
    const result = await orm.findOne(this.name, "*", `id = \'${id}\'`);
    if (result == []) return null;
    else return result[0];
  },

  deletUser: async function (id) {
    const index = `id = ${id}`;
    await orm.deleteOne(this.name, index);
  },
};
// export default login_info;
module.exports = login_info;