const mongoose = require("mongoose");
const Note = require("../models/note.model");

const allowedCategories = ["work", "personal", "study"];
const allowedSortFields = ["title", "createdAt", "updatedAt", "category"];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

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

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "notes array is required and cannot be empty",
        data: null,
      });
    }

    const createdNotes = await Note.insertMany(notes);

    return res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
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

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = await Note.findOneAndReplace(
      { _id: id },
      {
        title,
        content,
        category: category || "personal",
        isPinned: isPinned || false,
      },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteBulkNotes = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ids array is required and cannot be empty",
        data: null,
      });
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Allowed: work, personal, study",
        data: null,
      });
    }

    const notes = await Note.find({ category });

    if (notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No notes found for category: ${category}`,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Notes fetched for category: ${category}`,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getNotesByStatus = async (req, res) => {
  try {
    const { isPinned } = req.params;

    if (isPinned !== "true" && isPinned !== "false") {
      return res.status(400).json({
        success: false,
        message: "isPinned must be true or false",
        data: null,
      });
    }

    const pinned = isPinned === "true";
    const notes = await Note.find({ isPinned: pinned });

    return res.status(200).json({
      success: true,
      message: pinned ? "Fetched all pinned notes" : "Fetched all unpinned notes",
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getNoteSummary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    const note = await Note.findById(id).select("title category isPinned createdAt");

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note summary fetched successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const filterNotes = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) filter.category = req.query.category;
    if (req.query.isPinned !== undefined) {
      if (req.query.isPinned !== "true" && req.query.isPinned !== "false") {
        return res.status(400).json({
          success: false,
          message: "isPinned must be true or false",
          data: null,
        });
      }
      filter.isPinned = req.query.isPinned === "true";
    }

    const notes = await Note.find(filter);

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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
  updateNote,
  deleteNote,
  deleteBulkNotes,
  getNotesByCategory,
  getNotesByStatus,
  getNoteSummary,
  filterNotes,
  isValidObjectId,
  allowedCategories,
  allowedSortFields,
};
