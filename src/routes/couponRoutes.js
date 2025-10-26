const express = require('express');
const { listCouponsByUser, listCouponsByClass, removeCoupon } = require('../controllers/couponController');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/class/:classId', authenticateJWT, listCouponsByClass);
router.get('/:userId', authenticateJWT, listCouponsByUser);
router.delete('/:id', authenticateJWT, isAdmin, removeCoupon);

module.exports = router;
