const express = require("express");

const {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
} = require("../controllers/note.controller");

const router = express.Router();

// CREATE
router.post("/bulk", createBulkNotes); 
router.post("/", createNote);

// READ
router.get("/", getAllNotes);
router.get("/:id", getNoteById);



module.exports = router;