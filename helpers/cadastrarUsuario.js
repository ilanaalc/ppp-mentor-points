const request = require('supertest');
require('dotenv').config();

async function cadastrarUsuarioAdmin() {
    const response = await request(process.env.API_BASE_URL)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send({
            name: "Julio",
            email: "julio@mentoria.com",
            password: "123456",
            classId: "",
            isAdmin: true
        });

    return response;
}

async function cadastrarUsuarioEstudante() {
    const response = await request(process.env.API_BASE_URL)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send({
            name: "Ana",
            email: "ana@alunomentoria.com",
            password: "123456",
            classId: "T2",
            isAdmin: false
        });

    return response;
}

module.exports = {
    cadastrarUsuarioAdmin,
    cadastrarUsuarioEstudante
}
