const express = require("express");

const auth = require("../middlewares/auth.middleware");
const logger = require("../middlewares/logger.middleware");

const {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  deleteBulkNotes,
} = require("../controllers/note.controller");

const router = express.Router();


router.use(logger);

router.post("/bulk", auth, createBulkNotes);
router.post("/", auth, createNote);

router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNoteById);

router.put("/:id", auth, replaceNote);
router.patch("/:id", auth, updateNote);

router.delete("/bulk", auth, deleteBulkNotes);
router.delete("/:id", auth, deleteNote);

module.exports = router;