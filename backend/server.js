require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/database");
const app = express();
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running Successfully");
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

// error handling middlewares
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

const io = require('socket.io')(server, {
  // the amount of time it will wait while being inactive
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  }
})


dbConnect();

io.on("connection", (socket) => {
  console.log("connected to socket.io")

  socket.on('setup', (userData) => {
    // created a room for that particular user
    socket.join(userData._id);
    socket.emit('connected');
  })

  // whenever we click on any of the chat it should create new room with the particular user and the other user 
  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room :' + room);
  });

  socket.on('typing', (room) => socket.in(room).emit("typing"));
  socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));


  socket.on('new message', (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach(user => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  })
});




