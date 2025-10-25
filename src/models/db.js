// Banco de dados em memória
const db = {
  users: [],
  prizes: [],
  challenges: [],
  coupons: [],
  teams: [],
  classes: [],
  userSeq: 1,
  prizeSeq: 1,
  challengeSeq: 1,
  couponSeq: 1,
  teamSeq: 1,
  classSeq: 1
};

module.exports = db;
