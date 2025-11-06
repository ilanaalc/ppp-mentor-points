const request = require('supertest');
const postLoginAdmin = require('../fixtures/postLoginAdmin.json');
const postLoginAluno = require('../fixtures/postLoginAluno.json')
require('dotenv').config();

const gerarTokenAdmin = async () => {
    const bodyUsersLogin = {...postLoginAdmin}
    const response = await request(process.env.API_BASE_URL)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(bodyUsersLogin);

    return response.body.token;
}

const gerarTokenAluno = async () => {
    const bodyUsersLogin = {...postLoginAluno}
    const response = await request(process.env.API_BASE_URL)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(bodyUsersLogin);

    return response.body.token;
}

module.exports = {
    gerarTokenAdmin,
    gerarTokenAluno,
}

