const express = require("express");
const router = express.Router();
const {
  asyncErrorHandler,
  createErrorByStatus
} = require("../utilityFunctions");
const { Course, User } = require("../models/index.js");
const { check, validationResult } = require("express-validator");

const courseValidator = [
  check("title")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("title is required"),
  check("description")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("description is required")
];

router.get(
  "/",
  asyncErrorHandler(async (req, res) => {
    return res.status(200).json({
      courses: await Course.getCoursesInfo()
    });
  })
);

router.get(
  "/:courseId",
  asyncErrorHandler(async (req, res) => {
    const bookId = parseInt(req.params.courseId);
    return res.status(200).json({
      course: await Course.getCourseInfoById(bookId)
    });
  })
);

module.exports = router;