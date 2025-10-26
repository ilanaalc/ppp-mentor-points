const couponModel = require('../models/couponModel');
const db = require('../models/db');

function listCouponsByUser(userId) {
  return couponModel.listCouponsByUser(userId);
}

function listCouponsByClass(classId) {
  // Buscar todos os usuários da turma
  const usersInClass = db.users.filter(u => u.classId === String(classId) && !u.isAdmin);
  const userIds = usersInClass.map(u => u.id);
  
  // Buscar todos os cupons dos usuários dessa turma
  const coupons = couponModel.listCouponsByUserIds(userIds);
  
  // Adicionar o nome do aluno a cada cupom
  return coupons.map(coupon => {
    const user = usersInClass.find(u => u.id === coupon.userId);
    return {
      ...coupon,
      userName: user ? user.name : null
    };
  });
}

function removeCoupon(id) {
  couponModel.removeCoupon(id);
}

module.exports = { listCouponsByUser, listCouponsByClass, removeCoupon };
