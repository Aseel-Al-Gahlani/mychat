// const orm = require('../config/orm');
import orm from "../db/orm.js";
import chat_member from "./chat_member.js";
const room = {
  name: "chats",

  listAll: async function () {
    const result = await orm.selectAll(this.name);
    return result;
  },

  addNewRoom: async function (roomInput, user_create_id, receiverId) {
    const varName = "(name,user_create_id, second_user_id)";
    const data = `('${roomInput}', '${user_create_id}', '${receiverId}')`;
    const chat = await orm.insertOne(this.name, varName, data);
    chat_member.addNewChatMember(chat.id, user_create_id);
    chat_member.addNewChatMember(chat.id, receiverId);
  },

  removeRoom: async function (roomID) {
    const index = `id = ${roomID}`;
    await orm.deleteOne(this.name, index);
  },

  getUserChats: async function (userId) {
    const result = await orm.directQuery(
      `SELECT chat_members.*
        FROM chat_members WHERE chat_members.user_id = ${userId};`
    );
    return result;
    },
  
//   getUserChats: async function (userId) {
//     const result = await orm.directQuery(
//       `SELECT chat_members.chat_id, chat_members.user_id, chats.name, chats.id 
//         FROM chat_members LEFT JOIN chats ON chats.id = chat_members.chat_id WHERE chat_members.user_id = ${userId};`
//     );
//     return result;
//   },

  getAllChats: async function (userId) {
    const result = await orm.directQuery(
      `SELECT chat_members.chat_id, chat_members.user_id, chats.name, chats.id 
        FROM chat_members LEFT JOIN chats ON chats.id = chat_id WHERE user_id = ${userId};`
    );
    return result;
  },

  getChats: async function (firstId, secondId) {
    const result = await orm.findOne(
      this.name,
      "id, name, user_create_id",
      `user_create_id = \'${firstId}\' AND second_user_id = \'${secondId}\' OR second_user_id = \'${firstId}\' AND user_create_id = \'${secondId}\'`
    );
    if (result == []) return null;
    else return result[0];
  },
};



export default room;
// module.exports = room;