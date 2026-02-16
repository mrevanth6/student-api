const express = require('express');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Register a new student
const registerStudent = async (req, res) => {
    try {
        const { name, email, password, studentId, role } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        // Check if the student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already exists' });
        }
        //Hash the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new student
        const newStudent = await Student.create({
            name,
            email,
            password: hashedPassword,
            studentId,
            role: role || "student",
        });
        console.log(newStudent);
        res.status(201).json({
            message: 'Student registered successfully',
            student: newStudent,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// login student
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the student exists
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate a JWT token for authentication
        const accessToken = jwt.sign({
            id: student._id,
            email: student.email,
            role: student.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15m'
        });

        return res.status(200).json({
            message: 'Login successful',

            student: {
                _id: student._id,
                name: student.name,
                email: student.email,
                studentId: student.studentId,
                gpa: student.gpa,
                course: student.course,
                year: student.year,
                address: student.address,
                phone: student.phone,
                emergencyContact: student.emergencyContact,
                role: student.role,
                enrolledDate: student.enrolledDate,

            },
            Token: accessToken
        });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { registerStudent, loginStudent };