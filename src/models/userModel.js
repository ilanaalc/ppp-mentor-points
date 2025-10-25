const db = require('./db');
const bcrypt = require('bcryptjs');

function createUser({ name, email, password, classId, isAdmin }) {
  if ((!classId || typeof classId !== 'string') && !isAdmin) {
    throw new Error('O campo turma é obrigatório e deve ser string para alunos');
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = {
    id: db.userSeq++,
    name,
    email,
    password: hashedPassword,
  classId: isAdmin ? null : String(classId),
    isAdmin: !!isAdmin
  };
  db.users.push(user);
  return user;
}

function findUserByEmail(email) {
  return db.users.find(u => u.email === email);
}

function findUserById(id) {
  return db.users.find(u => u.id === id);
}

module.exports = { createUser, findUserByEmail, findUserById };
