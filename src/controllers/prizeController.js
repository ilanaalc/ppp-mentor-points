const prizeService = require('../services/prizeService');

function listPrizes(req, res) {
  const prizes = prizeService.listPrizes();
  res.json(prizes);
}

function createPrize(req, res) {
  try {
    const prize = prizeService.createPrize(req.body);
    res.status(201).json(prize);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { listPrizes, createPrize };
