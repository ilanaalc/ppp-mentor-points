const request = require('supertest');
const postCadastroAdmin = require('../fixtures/postCadastroAdmin.json');
const postCadastroAluno = require('../fixtures/postCadastroAluno.json');
require('dotenv').config();

const cadastrarAdmin= async () => {
    const bodyUsersRegister = {...postCadastroAdmin}
    const response = await request(process.env.API_BASE_URL)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(bodyUsersRegister);

    return response;
}

const cadastrarAluno= async () => {
    const bodyUsersRegister = {...postCadastroAluno}
    const response = await request(process.env.API_BASE_URL)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(bodyUsersRegister);

    return response;
}

module.exports = {
    cadastrarAdmin,
    cadastrarAluno,
}
