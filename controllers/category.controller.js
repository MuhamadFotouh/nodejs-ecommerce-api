const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/ApiError");
const Category = require("../models/category.model");

// @desc Create a category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
exports.getAllCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc Get a category
// @route GET /api/v1/categories/:id
// access Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`No category for this id: ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Update a category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`No category for this id: ${id}`, 404));
  }

  res.status(200).json({ data: category });
});

// @desc Delete a category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(`No category for this id: ${id}`, 404));
  }

  res.status(204).send();
});
