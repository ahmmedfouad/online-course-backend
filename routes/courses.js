const express = require('express');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Review = require('../models/Review');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new course
router.post('/', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.update(req.body);
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.destroy();
      res.json({ message: 'Course deleted' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enroll a student in a course
router.post('/:id/enroll', async (req, res) => {
  try {
    const enrollment = await Enrollment.create({
      course_id: req.params.id,
      student_id: req.body.student_id,
    });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a review to a course
router.post('/:id/review', async (req, res) => {
  try {
    const review = await Review.create({
      course_id: req.params.id,
      student_id: req.body.student_id,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
