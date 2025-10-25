const express = require('express');
const { listChallengesByClass, createChallenge, removeChallenge, updateChallenge, completeChallenge, addExtraPoints } = require('../controllers/challengeController');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/:classId', authenticateJWT, listChallengesByClass);
router.post('/', authenticateJWT, isAdmin, createChallenge);
router.delete('/:id', authenticateJWT, isAdmin, removeChallenge);
router.put('/:id', authenticateJWT, isAdmin, updateChallenge);
router.post('/complete', authenticateJWT, isAdmin, completeChallenge);

module.exports = router;
