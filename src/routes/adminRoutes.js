const express = require('express');
const { listStudents } = require('../controllers/adminController');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/students', authenticateJWT, isAdmin, listStudents);

module.exports = router;
