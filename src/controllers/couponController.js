const couponService = require('../services/couponService');

function listCouponsByUser(req, res) {
  const { userId } = req.params;
  const coupons = couponService.listCouponsByUser(userId);
  res.json(coupons);
}

function listCouponsByClass(req, res) {
  const { classId } = req.params;
  const coupons = couponService.listCouponsByClass(classId);
  res.json(coupons);
}

function removeCoupon(req, res) {
  try {
    couponService.removeCoupon(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { listCouponsByUser, listCouponsByClass, removeCoupon };
