
// import messages from "../models/messages.js";
// export const addMessage = async (req, res) => {
//   console.log(req.body);
//   const { chatId, senderId, text } = req.body;
//   try {
//     const result = await messages.addMsgToChat(chatId, senderId, text);
//     //   new MessageModel({
//     //   chatId,
//     //   senderId,
//     //   text,
//     // });

//     // const result = await message.save();
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// export const getMessages = async (req, res) => {
  
//   console.log(req.body);
//   const { chatId } = req.params;
//   try {
//     const result = await messages.getChatMsgs(chatId);
//       // await MessageModel.find({ chatId });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
