const express = require('express');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');

// Update student profile
const profileUpdate = async (req, res) => {
    try {
        const student = req.student; // Get the authenticated student information from the request object


        // Define the allowed fields for update
        const allowedUpdates = ["address", "phone", "emergencyContact", "password"];
        const updates = {};
        if (req.body === undefined) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }
        for (let field of allowedUpdates) {
            if (req.body[field] !== undefined) {
                if (field === "password") {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body[field], salt);
                    updates[field] = hashedPassword;
                } else {
                    updates[field] = req.body[field];
                }


            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No valid fields provided for update' });
        }

        // Update the student profile with the allowed fields
        const updatedStudent = await Student.findByIdAndUpdate(student.id, updates, { new: true }).select('-password');
        res.status(200).json({
            message: 'Profile updated successfully',
            student: updatedStudent,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}
// Get all student profiles (admin only)
const getAllProfiles = async (req, res) => {
    try {
        if (req.student.role !== "admin") {
            return res.status(403).json({ message: 'Access denied' });
        }
        // Retrieve all student profiles from the database, excluding the password field
        const students = await Student.find({ role: "student" }).select('-password');
        res.status(200).json({
            message: 'Profiles retrieved successfully',
            students: students,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }

}
// Get a student profile by ID (admin only)
const getProfileById = async (req, res) => {
    try {
        if (req.student.role !== "admin") {
            return res.status(403).json({ message: 'Access denied' });
        }
        // Retrieve all student profiles from the database, excluding the password field
        const student = await Student.findById(req.params.id).select('-password');
        res.status(200).json({
            message: 'Profile retrieved successfully',
            students: student,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}
// Update a student profile by ID (admin only)
const updateProfileById = async (req, res) => {
    try {
        if (req.student.role !== "admin") {
            return res.status(403).json({ message: 'Access denied' });
        }
        // Define the allowed fields for update
        const allowedUpdates = ["address", "phone", "emergencyContact", "gpa", "course", "year"];
        const updates = {};
        for (let field of allowedUpdates) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        res.status(200).json({
            message: 'Profile updated successfully',
            student: updatedStudent,
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}
const deleteProfileById = async (req, res) => {
    if (req.student.role !== "admin") {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id).select('-password');
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({
            message: 'Profile deleted successfully',
            student: deletedStudent,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });


    }
}
module.exports = { profileUpdate, getAllProfiles, getProfileById, updateProfileById, deleteProfileById };

