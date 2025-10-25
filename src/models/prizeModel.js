const db = require('./db');

function createPrize({ name, description }) {
  const prize = {
    id: db.prizeSeq++,
    name,
    description
  };
  db.prizes.push(prize);
  return prize;
}

function listPrizes() {
  return db.prizes;
}

module.exports = { createPrize, listPrizes };
