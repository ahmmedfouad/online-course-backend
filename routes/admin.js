const express = require('express');
const Admin = require('../models/Admin');

const router = express.Router();

// Add a new admin
router.post('/add', async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get a specific admin
router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update an admin
router.put('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    admin.update(req.body);
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete an admin
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    admin.destroy();
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Export the router

module.exports = router;
