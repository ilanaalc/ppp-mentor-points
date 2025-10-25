const db = require('./db');

function createCoupon({ userId, challengeId, teamId }) {
  const coupon = {
    id: db.couponSeq++,
    userId,
    challengeId,
    teamId: teamId || null
  };
  db.coupons.push(coupon);
  return coupon;
}

function listCouponsByUser(userId) {
  return db.coupons.filter(c => c.userId == userId);
}

function removeCoupon(id) {
  const idx = db.coupons.findIndex(c => c.id == id);
  if (idx !== -1) db.coupons.splice(idx, 1);
}

function removeCouponsByTeam(teamId) {
  db.coupons = db.coupons.filter(c => c.teamId != teamId);
}

module.exports = { createCoupon, listCouponsByUser, removeCoupon, removeCouponsByTeam };
