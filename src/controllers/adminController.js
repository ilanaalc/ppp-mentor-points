const db = require('../models/db');

function listStudents(req, res) {
  const students = db.users
    .filter(u => !u.isAdmin)
    .map(u => ({ id: u.id, name: u.name }));
  res.json(students);
}

module.exports = { listStudents };
