const express = require("express");

const {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
} = require("../controllers/note.controller");

const router = express.Router();

// CREATE
router.post("/bulk", createBulkNotes); 
router.post("/", createNote);

// READ
router.get("/", getAllNotes);
router.get("/:id", getNoteById);

// UPDATE
router.put("/:id", replaceNote);
router.patch("/:id", updateNote);





module.exports = router;