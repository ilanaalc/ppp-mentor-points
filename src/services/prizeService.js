const prizeModel = require('../models/prizeModel');

function listPrizes() {
  return prizeModel.listPrizes();
}

function createPrize(data) {
  if (!data.name || !data.description) throw new Error('Nome e descrição são obrigatórios');
  return prizeModel.createPrize(data);
}

module.exports = { listPrizes, createPrize };
