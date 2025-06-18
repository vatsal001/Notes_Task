const setupSocket = (io) => {
  const editing = {};

  io.on("connection", (socket) => {
    socket.on("connect", (status) => {
      console.log("Connection Successful!", status);
    });
    socket.on("register-user", (userId) => {
      socket.userId = userId;
    });

    socket.on("note-editing", ({ noteId }) => {
      editing[noteId] = socket.userId;
      io.emit("note-editing", { noteId, userId: socket.userId });
    });

    socket.on("note-stop-editing", ({ noteId }) => {
      delete editing[noteId];
      io.emit("note-stop-editing", { noteId });
    });

    socket.on("disconnect", () => {
      for (const noteId in editing) {
        if (editing[noteId] === socket.userId) {
          delete editing[noteId];
          io.emit("note-stop-editing", { noteId });
        }
      }
    });
  });
};

module.exports = setupSocket;
