const express = require('express');
const { listPrizes, createPrize } = require('../controllers/prizeController');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateJWT, listPrizes);
router.post('/', authenticateJWT, isAdmin, createPrize);

module.exports = router;
