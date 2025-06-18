const express = require("express");
const router = express.Router();
const noteManage = require("../controller/Note.controller");
// const auth = require('');

// router.use(auth);
router.get("/", noteManage.getNotes);
router.post("/", noteManage.createNote);
router.put("/:id", noteManage.updateNote);
router.delete("/:id", noteManage.deleteNote);

module.exports = router;
