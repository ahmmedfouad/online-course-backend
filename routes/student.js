const express = require('express');
const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific student
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.update(req.body);
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.json({ message: 'Student deleted' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses enrolled by a specific student
router.get('/:id/courses', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { student_id: req.params.id },
      include: Course,
    });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
