const challengeModel = require('../models/challengeModel');
const couponModel = require('../models/couponModel');
const db = require('../models/db');

function listChallengesByClass(classId) {
  return challengeModel.listChallengesByClass(String(classId));
}

function createChallenge(data) {
  if (!data.title || !data.description || !data.classId || typeof data.classId !== 'string') throw new Error('Título, descrição e turma (string) são obrigatórios');
  return challengeModel.createChallenge(data);
}

function removeChallenge(id) {
  challengeModel.removeChallenge(id);
}

function updateChallenge(id, data) {
  return challengeModel.updateChallenge(id, data);
}

function completeChallenge({ userId, challengeId, teamId }) {
  if (!userId || !challengeId) throw new Error('Usuário e desafio são obrigatórios');
  // Se teamId não for informado, tenta buscar do usuário
  let resolvedTeamId = teamId;
  if (typeof resolvedTeamId === 'undefined' || resolvedTeamId === null) {
    const user = db.users.find(u => u.id == userId);
    if (user && user.teamId) {
      resolvedTeamId = user.teamId;
    }
  }
  couponModel.createCoupon({ userId, challengeId, teamId: resolvedTeamId });
}


module.exports = { listChallengesByClass, createChallenge, removeChallenge, updateChallenge, completeChallenge };
