const express = require('express');
const Instructor = require('../models/Instructor');
const Course = require('../models/Course');

const router = express.Router();

// Get all instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.findAll();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific instructor
router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id);
    if (instructor) {
      res.json(instructor);
    } else {
      res.status(404).json({ message: 'Instructor not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new instructor
router.post('/', async (req, res) => {
  try {
    const instructor = await Instructor.create(req.body);
    res.status(201).json(instructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an instructor
router.put('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id);
    if (instructor) {
      await instructor.update(req.body);
      res.json(instructor);
    } else {
      res.status(404).json({ message: 'Instructor not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an instructor
router.delete('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByPk(req.params.id);
    if (instructor) {
      await instructor.destroy();
      res.json({ message: 'Instructor deleted' });
    } else {
      res.status(404).json({ message: 'Instructor not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses by a specific instructor
router.get('/:id/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { instructor_id: req.params.id },
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
