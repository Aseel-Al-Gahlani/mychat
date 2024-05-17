// const orm = require('../config/orm');
// import orm from "../db/orm.js";

const orm = require("../db/orm");
const messages = {
  name: "messages",

  listAll: async function () {
    const result = await orm.selectAll(this.name);
    return result;
  },

  getChatMsgs: async function (chat_id) {
    const result = await orm.directQuery(
      `SELECT messages.*
        FROM messages WHERE messages.chat_id = ${chat_id};`
    );
    return result;
  },

  //   getChatMsgs: async function (chat_id) {
  //     const result = await orm.directQuery(
  //       `SELECT messages.chat_id, messages.sender_id, users.firstname as avatar_dirct, users.name as display_name, messages.text
  //         FROM messages LEFT JOIN users ON users.id = sender_id WHERE chat_id = ${chat_id};`
  //     );
  //     return result;
  //   },

  // add message output: { user, channel, msg }
  addMsgToChat: async function (chat_id, sender_id, msg) {
    const variableQuery = `(chat_id, sender_id, text)`;
    const dataQuery = `(${chat_id}, ${sender_id}, \'${msg}\')`;
    await orm.insertOne(this.name, variableQuery, dataQuery);
  },

  // delete all messages for 1 room output: { message: 'success' or 'failure' }
  removeMsgByRoom: async function (roomID) {
    const index = `room_id = ${roomID}`;
    await orm.deleteOne(this.name, index);
  },
};

module.exports= messages;
