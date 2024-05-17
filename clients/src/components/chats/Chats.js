import React, { useState, useEffect } from "react";
// import logo from "../logo.svg";
import logo from "../../aseel.jpg";
import { useNavigate } from "react-router-dom";

const Chats = ({ socket }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [chatselected, setSelectedChats] = useState(null);

  useEffect(() => {
    socket.emit(
      "getChats",
      {
        userName: localStorage.getItem("userName"),
        // id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      },
      {
        auth: {
          socketId: "ewjnif",
          userId: 9,
          username: localStorage.getItem("userName"),
        },
      }
    );
  }, []);

  
useEffect(() => {
    socket.on("chatResponse", (data) => setChats(data));
}, [socket, chats]);
  
  useEffect(() => {
    socket.on("newChatResponse", (data) => setChats([...chats, data]));
  }, [socket, chats]);

  const handleChateSelected = (chat) => {
    setSelectedChats(chat);
    
    localStorage.setItem("chatName", chatselected.userName);
    const userName = localStorage.getItem("userName");
    // socket.emit("newUser", { userName, socketID: socket.id });
      navigate("/chatm", { state: { chatselected } });
  }
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__user">
          {chats.map((chat) => (
            <div className="chats" onClick={()=>handleChateSelected(chat)}>
              <div>
                <img className="chat__avatar" src={logo}></img>
              </div>
              <div className="chat__name" key={chat.socketID}>
                {chat.userName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chats;
