const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { authenticateJWT, isStudent } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateJWT, isStudent, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
