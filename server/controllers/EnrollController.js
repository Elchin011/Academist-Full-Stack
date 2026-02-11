const Enrollment = require("../models/Enrollment/EnrollmentSchema");





// USER ENROLLMENT
const enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id; // Auth middleware ilə req.user set olunub
  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }
  try {
    const existing = await Enrollment.findOne({ user: userId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "You are already enrolled in this course" });
    }
    const enrollment = new Enrollment({ user: userId, course: courseId });
    await enrollment.save();
    return res.status(201).json({ message: "Successfully enrolled in course", data: enrollment });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// USER VIEW ENROLLMENTS
const getUserEnrollments = async (req, res) => {
  const userId = req.user.id;

  try {
    const enrollments = await Enrollment.find({ user: userId }).populate("course");
    return res.status(200).json({ data: enrollments, message: "User enrollments fetched successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ADMIN VIEW ALL ENROLLMENTS
const getAllCourseEnrollmentsInDashboard = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("user").populate("course");
    if (!enrollments.length) return res.status(404).json({ message: "No course enrollments found" });
    return res.status(200).json({ data: enrollments, message: "All course enrollments fetched successfully" });
  } catch (err) {
    console.error("Error fetching course enrollments:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  enrollCourse,
  getUserEnrollments,
  getAllCourseEnrollmentsInDashboard,
};
