const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const cookieParser = require("cookie-parser");
const connectSocket = require("./socket");
const userRoute = require("./routes/User.route");
const noteRoute = require("./routes/Note.route");
const auth = require("./authmiddleware");

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: {
    origin: "http://localhost:5003",
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoute);
app.use("/api/notes", auth, noteRoute);

connectSocket(io);

mongoose
  .connect("mongodb://localhost:27017/notes")
  .then(() => {
    httpServer.listen(3000, () => console.log("Server started on port 3000"));
  })
  .catch((err) => {
    console.log(err);
  });
