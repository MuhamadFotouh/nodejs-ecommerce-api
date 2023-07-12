const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware,
];

exports.createBrandValidator = [
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

exports.updateBrandValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid brand id format"),
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

exports.deleteBrandValidator = [
  // rules
  check("id").isMongoId().withMessage("Invalid brand id format"),
  validatorMiddleware,
];
