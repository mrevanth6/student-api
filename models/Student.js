const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    course: { type: String },
    year: { type: Number },
    gpa: { type: Number, default: 0.0 },
    enrolledDate: { type: Date, default: Date.now },
    phone: { type: String },
    address: { type: String },
    emergencyContact: {
        name: String,
        phone: String,
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
    }

}, { timestamps: true });
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;