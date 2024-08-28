const express = require('express');
const Coupon = require('../models/Coupon');
const router = express.Router();
// Routes
//add new coupon
router.post('/add', async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get a specific coupon
router.get('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (coupon) {
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update a coupon
router.put('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (coupon) {
      await coupon.update(req.body);
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete a coupon
router.delete('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (coupon) {
      await coupon.destroy();
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Export the router
module.exports = router;