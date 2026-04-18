const express = require("express");

const {
  createNote,
  createBulkNotes,
  getAllNotes,
} = require("../controllers/note.controller");

const router = express.Router();

// CREATE
router.post("/bulk", createBulkNotes); 
router.post("/", createNote);

// READ
router.get("/", getAllNotes);


module.exports = router;