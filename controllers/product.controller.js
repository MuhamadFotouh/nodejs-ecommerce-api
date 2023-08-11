const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/ApiError");
const Product = require("../models/product.model");

// @desc Create a product
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc Get all products
// @route GET /api/v1/products
// @access Public
exports.getAllProducts = asyncHandler(async (req, res) => {
  // Filteration
  let filterObj = { ...req.query };
  const excludedFields = ["page", "limit", "sort", "fields", "keyword"];
  excludedFields.forEach((field) => delete filterObj[field]);
  // Apply filter using [gte, gt, lte, lt]
  let filterObjStr = JSON.stringify(filterObj);
  filterObjStr = filterObjStr.replace(
    /(?<!\$)\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  filterObj = JSON.parse(filterObjStr);

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = (page - 1) * limit;

  // Build query
  let mongooseQuery = Product.find(filterObj)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    mongooseQuery = mongooseQuery.sort("-createdAt");
  }

  // Field Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    mongooseQuery = mongooseQuery.select(fields);
  } else {
    mongooseQuery = mongooseQuery.select("-__v");
  }

  // Search
  if (req.query.keyword) {
    const query = {};
    query.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];

    mongooseQuery = mongooseQuery.find(query);
  }

  // Excute query
  const products = await mongooseQuery;

  res.status(200).json({ results: products.length, page, data: products });
});

// @desc Get a product
// @route GET /api/v1/products/:id
// @access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name",
  });
  if (!product) {
    return next(new ApiError(`No product for this id: ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Update a product
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);

  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product for this id: ${id}`, 404));
  }

  res.status(200).json({ data: product });
});

// @desc Delete a product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No product for this id: ${id}`, 404));
  }

  res.status(204).send();
});
