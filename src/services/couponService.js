const couponModel = require('../models/couponModel');

function listCouponsByUser(userId) {
  return couponModel.listCouponsByUser(userId);
}

function removeCoupon(id) {
  couponModel.removeCoupon(id);
}

module.exports = { listCouponsByUser, removeCoupon };
