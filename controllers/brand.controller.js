const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/ApiError");
const Brand = require("../models/brand.model");

// @desc Create a brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc Get all brands
// @route GET /api/v1/brands
// @access Public
exports.getAllBrands = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc Get a brand
// @route GET /api/v1/brands/:id
// access Public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id: ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc Update a brand
// @route PUT /api/v1/brands/:id
// @access Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`No brand for this id: ${id}`, 404));
  }

  res.status(200).json({ data: brand });
});

// @desc Delete a brand
// @route DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return next(new ApiError(`No brand for this id: ${id}`, 404));
  }

  res.status(204).send();
});
