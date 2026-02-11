const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CoursesTeacher",
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    courseFeatures: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
})
module.exports = mongoose.models.Course || mongoose.model("Course", CourseSchema);