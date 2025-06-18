import React, { useState, useEffect } from "react";
import { api } from "../../Api/axiosBase";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const NotesModal = ({ open, note, onClose, onSave }) => {
  const [form, setForm] = useState({ title: "", content: "" });
  const isEdit = Boolean(note);

  useEffect(() => {
    if (note) setForm({ title: note.title, content: note.content });
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = isEdit
      ? await api.put(`/notes/${note._id}`, form)
      : await api.post("/notes", form);
    onSave(res.data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Note" : "New Note"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotesModal;
