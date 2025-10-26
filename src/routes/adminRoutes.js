const express = require('express');
const { listStudents, listStudentsByClass } = require('../controllers/adminController');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/students', authenticateJWT, isAdmin, listStudents);
router.get('/students/class/:classId', authenticateJWT, isAdmin, listStudentsByClass);

module.exports = router;
