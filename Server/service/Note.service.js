const Notes = require("../model/Notes");

exports.getNotes = async (userId) => {
  const notes = await Notes.find({ user: userId });
  console.log(notes, "notesnotes");
  return notes;
};

exports.createNote = async (userId, body) => {
  const note = new Notes({
    title: body.title,
    content: body.content,
    user: userId,
  });

  return await note.save();
};

exports.updateNote = async (userId, noteId, data) => {
  return await Notes.findOneAndUpdate({ _id: noteId, userId }, data, {
    new: true,
  });
};

exports.deleteNote = async (userId, noteId) => {
  await Notes.deleteOne({ _id: noteId, userId });
};
