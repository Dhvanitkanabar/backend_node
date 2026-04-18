const mongoose = require("mongoose");
const Note = require("../models/note.model");

// CREATE SINGLE NOTE
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = await Note.create({ title, content, category, isPinned });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

// CREATE MULTIPLE NOTES
const createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notes array is required",
        data: null,
      });
    }

    const createdNotes = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

module.exports = {
  createNote,
  createBulkNotes,
};