import React, { useState, useEffect } from "react";
// import logo from "../logo.svg";
import logo from "../aseel.jpg";
const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <div className="chats" >
              <div>
                <img className="chat__avatar" src={logo}></img>{" "}
              </div>
              <div className="chat__name" key={user.socketID}>
                {user.userName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
