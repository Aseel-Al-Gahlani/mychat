import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatMainPage from "./components/ChatMainPage";
import Chats from "./components/chats/Chats";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route
            path="/chatm"
            element={<ChatMainPage socket={socket} />}
          ></Route>
          <Route path="/chats" element={<Chats socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
