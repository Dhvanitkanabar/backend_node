const mongoose = require("mongoose");
const Note = require("../models/note.model");

const allowedCategories = ["work", "personal", "study"];
const allowedSortFields = ["title", "createdAt", "updatedAt", "category"];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  isValidObjectId,
  allowedCategories,
  allowedSortFields,
};
