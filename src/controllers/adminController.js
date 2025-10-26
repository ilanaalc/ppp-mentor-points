const db = require('../models/db');

function listStudents(req, res) {
  const students = db.users
    .filter(u => !u.isAdmin)
    .map(u => ({ id: u.id, name: u.name, email: u.email, classId: u.classId }));
  res.json(students);
}

function listStudentsByClass(req, res) {
  const { classId } = req.params;
  const students = db.users
    .filter(u => !u.isAdmin && u.classId === String(classId))
    .map(u => ({ id: u.id, name: u.name, classId: u.classId }));
  res.json(students);
}

module.exports = { listStudents, listStudentsByClass };
