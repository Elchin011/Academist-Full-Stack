const express = require("express");
const {
  enrollCourse,
  getUserEnrollments,
  getAllCourseEnrollmentsInDashboard,
} = require("../controllers/EnrollController");
const { authProtectMiddleware } = require("../middleware/authProtectMiddleware");

const router = express.Router();



// ENROLLMENTS ROUTES
router.post("/enroll", authProtectMiddleware, enrollCourse); // user enroll
router.get("/enrollments", authProtectMiddleware, getUserEnrollments); // user view
router.get("/admin/enrollments", getAllCourseEnrollmentsInDashboard); // admin view all

module.exports = router;
