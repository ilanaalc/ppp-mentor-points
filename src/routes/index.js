const express = require('express');

const userRoutes = require('./userRoutes');
const prizeRoutes = require('./prizeRoutes');
const challengeRoutes = require('./challengeRoutes');
const couponRoutes = require('./couponRoutes');
const adminRoutes = require('./adminRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/prizes', prizeRoutes);
router.use('/challenges', challengeRoutes);
router.use('/coupons', couponRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
