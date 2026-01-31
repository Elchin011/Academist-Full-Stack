const mongoose = require("mongoose")

const CoursesSchema = mongoose.Schema({
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
    imageUrl: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model("Courses", CoursesSchema)