const Course = require("../models/course");

// Get all courses
async function getCourses(req, res) {
    try {
        const courses = await Course.find().populate("instructor", "name email role");
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch courses", error: error.message });
    }
}

// Get single course by ID
async function getCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id).populate("instructor", "name email role");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch course", error: error.message });
    }
}

// Create new course
async function createCourse(req, res) {
    try {
        const { title, description, instructor, category, level, price, duration } = req.body;
        // Take ObjectId from authenticated user or request body
        const instructorId = req.user ? req.user._id : instructor;

        const newCourse = await Course.create({
            title,
            description,
            instructor: instructorId,
            category: category || "General",
            level: level || "Beginner",
            price: Number(price) || 0,
            duration: Number(duration) || 1,
            createdAt: new Date()
        });
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: "Failed to create course", error: error.message });
    }
}

// Update course by ID
async function updateCourse(req, res) {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: "Failed to update course", error: error.message });
    }
}

// Delete course by ID
async function deleteCourse(req, res) {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete course", error: error.message });
    }
}

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
