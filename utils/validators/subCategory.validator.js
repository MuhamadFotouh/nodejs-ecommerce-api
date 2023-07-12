const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  // rules
  check("name")
    .isString()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Name must be at most 32 characters long"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  check("name")
    .isString()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 32 })
    .withMessage("Name must be at most 32 characters long"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];
