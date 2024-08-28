const express = require('express');
const Team = require('../models/Team');
const router = express.Router();
// Routes
//add new team
router.post('/add', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get a specific team
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update a team
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (team) {
      await team.update(req.body);
      res.json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete a team
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (team) {
      await team.destroy();
      res.json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Export the router
module.exports = router;