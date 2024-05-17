// const orm = require('../config/orm');
// import orm from "../db/orm.js";
const orm = require("../db/orm");
const chat_member = {
  name: "chat_members",

  listAll: async function () {
    const result = await orm.selectAll(this.name);
    return result;
  },

  addNewChatMember: async function (chat_id, user_id) {
    const varName = "(chat_id,user_id)";
    const data = `('${chat_id}', '${user_id}')`;
    await orm.insertOne(this.name, varName, data);
  },

  removeChatMember: async function (chatMember) {
    const index = `id = ${chatMember}`;
    await orm.deleteOne(this.name, index);
  },
};

// export default chat_member;
module.exports = chat_member;