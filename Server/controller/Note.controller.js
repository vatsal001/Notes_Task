const noteService = require("../service/Note.service");

exports.getNotes = async (req, res) => {
  console.log(res, "requesting the body");
  res.json(await noteService.getNotes(req.user.userId));
};

exports.createNote = async (req, res) => {
  const note = await noteService.createNote(req.user.userId, req.body);
  req.io.emit("noteUpdated", note);
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const note = await noteService.updateNote(
    req.user.userId,
    req.params.id,
    req.body
  );
  req.io.emit("noteUpdated", note);
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  await noteService.deleteNote(req.user.userId, req.params.id);
  req.io.emit("note-deleted", req.params.id);
  res.sendStatus(204);
};
