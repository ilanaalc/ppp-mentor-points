const db = require('./db');

function createChallenge({ title, description, classId, extraCoupon }) {
  const challenge = {
    id: db.challengeSeq++,
    title,
    description,
    classId: String(classId),
    extraCoupon: !!extraCoupon
  };
  db.challenges.push(challenge);
  return challenge;
}

function listChallengesByClass(classId) {
  return db.challenges.filter(c => c.classId === String(classId));
}

function findChallengeById(id) {
  return db.challenges.find(c => c.id == id);
}

function removeChallenge(id) {
  const idx = db.challenges.findIndex(c => c.id == id);
  if (idx !== -1) db.challenges.splice(idx, 1);
}

function updateChallenge(id, data) {
  const challenge = findChallengeById(id);
  if (challenge) Object.assign(challenge, data);
  return challenge;
}

module.exports = { createChallenge, listChallengesByClass, findChallengeById, removeChallenge, updateChallenge };
