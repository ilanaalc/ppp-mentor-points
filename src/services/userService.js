const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require('../middleware/auth');

async function registerUser(data) {
  if (!data.name || !data.email || !data.password) {
    throw new Error('Nome, email e senha são obrigatórios');
  }
  if (!data.isAdmin && (!data.classId || typeof data.classId !== 'string')) {
    throw new Error('O campo turma é obrigatório para alunos');
  }
  if (userModel.findUserByEmail(data.email)) {
    throw new Error('Email já cadastrado');
  }
  const user = userModel.createUser(data);
  return { id: user.id, name: user.name, email: user.email, classId: user.classId, isAdmin: user.isAdmin };
}

async function loginUser({ email, password }) {
  const user = userModel.findUserByEmail(email);
  if (!user) throw new Error('Usuário não encontrado');
  if (!bcrypt.compareSync(password, user.password)) throw new Error('Senha inválida');
  const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, SECRET, { expiresIn: '1d' });
  return { token, user: { id: user.id, name: user.name, email: user.email, classId: user.classId, isAdmin: user.isAdmin } };
}

module.exports = { registerUser, loginUser };
