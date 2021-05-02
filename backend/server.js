const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
dotenv.config();

const server = http.createServer(app);
const io = socketIo(server);

let users = [];

io.on("connection", (socket) => {
  users.push({ socketId: socket.id, userId: socket.handshake.query.room });
  io.emit("message", "hello");
  io.emit("get-user-online", users);

  socket.on("user-log-out", (userid) => {
    let userInd = 0;
    users.map((each, index) => {
      if (each.socketId === userid) {
        userInd = index;
      }
    });
    users.splice(userInd, 1);
    io.emit("get-user-online", users);
  });

  socket.on("send-message", (data) => {
    if ((data.blocked === true) | 1) {
      let messageReceiver = "";
      console.log(data);
      console.log(users);
      users.map((each) => {
        if (parseInt(data.receiver) === parseInt(each.userId)) {
          return (messageReceiver = each.socketId);
        }
      });
      console.log(messageReceiver);
      socket.broadcast.to(messageReceiver).emit("receive-message", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");

    let userInd = 0;
    users.map((each, index) => {
      if (each.socketId === socket.id) {
        userInd = index;
      }
    });
    users.splice(userInd, 1);
    io.emit("get-user-online", users);
    console.log(users);
  });
});

app.get("/", (req, res) => {
  res.send("Working!");
});

// Routes
// User
const registerUserRoute = require("./src/api/routes/user/Register");
const loginUserRoute = require("./src/api/routes/user/Login");
const UserRoute = require("./src/api/routes/user/User");

app.use("/api/user/register", registerUserRoute);
app.use("/api/user/login", loginUserRoute);
app.use("/api/user", UserRoute);

// Friends
const findFriendRoute = require("./src/api/routes/friend/FindFriends");
const searchFriendRoute = require("./src/api/routes/friend/SearchFriend");
const manageFriendsRoute = require("./src/api/routes/friend/ManageFriends");
const blockFriendRoute = require("./src/api/routes/friend/BlockFriend");

app.use("/api/search/friends", findFriendRoute);
app.use("/api/find/friend", searchFriendRoute);
app.use("/api/friends", manageFriendsRoute);
app.use("/api/friend/block", blockFriendRoute);

// Messages

const messagesRoute = require("./src/api/routes/message/Message");

app.use("/api/message", messagesRoute);

module.exports = server;
