const express = require("express");

const multer = require("multer");
const { storage } = require("../lib/cloudinaryConfig");
const {
  authProtectMiddleware,
} = require("../middleware/authProtectMiddleware");
const { getAllCourses, createCourses, updateCourses, deleteCourses, createCoursesTeachers, deleteCoursesTeachers, getAllCoursesTeachers, updateCoursesTeachers, getCourseById } = require("../controllers/CoursesController");


const upload = multer({ storage: storage });
const router = express.Router();



router.get("/", getAllCourses);
router.post("/create", upload.single("file"), createCourses);
router.patch("/:id", upload.single("file"), updateCourses);
router.delete("/:id", deleteCourses);
router.post("/create/courses-teacher", upload.single("file"), createCoursesTeachers);
router.delete("/courses-teacher/:id", deleteCoursesTeachers);
router.get("/courses-teacher", getAllCoursesTeachers);
router.get("/:id", getCourseById);
router.patch("/courses-teacher/:id", upload.single("file"), updateCoursesTeachers);


module.exports = router;