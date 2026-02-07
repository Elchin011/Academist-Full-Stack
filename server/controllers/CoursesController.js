const CoursesSchema = require("../models/Courses/Courses");
const CoursesTeachersSchema = require("../models/Courses/CoursesTeacher");

const getAllCourses = async (req, res) => {
  const courses = await CoursesSchema.find().populate("teacher");
  if (!courses || courses.length === 0) {
    return res.status(404).json({
      message: "No courses found",
    });
  }
  return res.status(200).json({
    data: courses,
  });
};

const createCourses = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Image file is required",
    });
  }

  const { name, price , teacher, courseFeatures} = req.body;
  const exsistingCourse = await CoursesSchema.findOne({ name: name });
  if (exsistingCourse) {
    return res.status(400).json({
      message: "Course already exists",
    });
  }
  const newCourse = new CoursesSchema({
    name: name,
    imageUrl: req.file.path,
    price: price,
    courseFeatures: courseFeatures,
    teacher: teacher
  });
  await newCourse.save();
  return res.status(201).json({
    message: "Course created successfully",
    data: newCourse,
  });
};

const deleteCourses = async (req, res) => {
  const { id } = req.params;

  const course = await CoursesSchema.findByIdAndDelete(id);
  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }
  return res.status(200).json({
    message: "Course deleted successfully",
  });
};

const updateCourses = async (req, res) => {
  const { id } = req.params;
  const { name, price , teacher, courseFeatures } = req.body;

  const course = await CoursesSchema.findByIdAndUpdate(
    id,
    {
      name: name,
      price: price,
      teacher: teacher,
      imageUrl: req.file ? req.file.path : undefined,
      courseFeatures: courseFeatures
    },
    { new: true }
  );

  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  return res.status(200).json({
    message: "Course updated successfully",
    data: course,
  });
};


const getAllCoursesTeachers = async (req, res) => {
  const coursesTeachers = await CoursesTeachersSchema.find();
  if (!coursesTeachers || coursesTeachers.length === 0) {
    return res.status(404).json({
      message: "No categories found",
    });
  }
  return res.status(200).json({
    data: coursesTeachers,
  });
};

const createCoursesTeachers = async (req, res) => {
  const { name, specialty} = req.body;
  const exsistingCourseTeacher = await CoursesTeachersSchema.findOne({
    name: name,
    specialty: specialty
  });
  if (exsistingCourseTeacher) {
    return res.status(400).json({
      message: "Category already exists",
    });
  }
  const newCourseTeacher = new CoursesTeachersSchema({
    name: name,
    specialty: specialty,
    imageUrl: req.file.path,
  });
  await newCourseTeacher.save();
  return res.status(201).json({
    message: "Course created successfully",
    data: newCourseTeacher,
  });
};

const deleteCoursesTeachers = async (req, res) => {
  const { id } = req.params;
  const courseTeacher = await CoursesTeachersSchema.findByIdAndDelete(id);
  if (!courseTeacher) {
    return res.status(404).json({
      message: "Course teacher not found",
    });
  }
  return res.status(200).json({
    message: "Course teacher deleted successfully",
  });
};

 const updateCoursesTeachers = async (req, res) => {
  const { id } = req.params;
  const { name, specialty } = req.body;

  const courseTeacher = await CoursesTeachersSchema.findByIdAndUpdate(
    id,
    {
      name: name,
      specialty: specialty,
      imageUrl: req.file ? req.file.path : undefined,
    },
    { new: true }
  );

  if (!courseTeacher) {
    return res.status(404).json({
      message: "Course teacher not found",
    });
  }

  return res.status(200).json({
    message: "Course teacher updated successfully",
    data: courseTeacher,
  });
};

module.exports = {
  getAllCourses,
  createCourses,
  deleteCourses,
  updateCourses,
  getAllCoursesTeachers,
  createCoursesTeachers,
  deleteCoursesTeachers,
  updateCoursesTeachers,
};
