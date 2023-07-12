const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
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

exports.updateCategoryValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid category id format"),
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

exports.deleteCategoryValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
