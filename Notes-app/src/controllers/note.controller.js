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

// GET ALL NOTES
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

// GET NOTE BY ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note fetched successfully",
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

// PUT (REPLACE)
const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
        data: null,
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: updatedNote,
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
  getAllNotes,
  getNoteById,
  replaceNote,
};