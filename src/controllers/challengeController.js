const challengeService = require('../services/challengeService');

function listChallengesByClass(req, res) {
  const { classId } = req.params;
  const challenges = challengeService.listChallengesByClass(classId);
  res.json(challenges);
}

function createChallenge(req, res) {
  try {
    const challenge = challengeService.createChallenge(req.body);
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function removeChallenge(req, res) {
  try {
    challengeService.removeChallenge(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function updateChallenge(req, res) {
  try {
    const challenge = challengeService.updateChallenge(req.params.id, req.body);
    res.json(challenge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function completeChallenge(req, res) {
  try {
    challengeService.completeChallenge(req.body);
    res.status(200).json({ message: 'Desafio concluído e cupom gerado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


module.exports = { listChallengesByClass, createChallenge, removeChallenge, updateChallenge, completeChallenge };
