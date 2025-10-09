const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/', courseController.getAllCourses.bind(courseController));

// Get a single course
router.get('/:id', courseController.getCourse.bind(courseController));

// Create a new course (admin)
router.post('/', courseController.createCourse.bind(courseController));

// Update a course (admin)
router.put('/:id', courseController.updateCourse.bind(courseController));

// Delete a course (admin)
router.delete('/:id', courseController.deleteCourse.bind(courseController));

// Enroll in a course
router.post('/enroll', courseController.enrollInCourse.bind(courseController));

// Get all enrollments (admin)
router.get('/enrollments/all', courseController.getAllEnrollments.bind(courseController));

module.exports = router;
