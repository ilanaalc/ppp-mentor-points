const request = require('supertest');
require('dotenv').config();

async function cadastrarUsuario() {
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

module.exports = {
    cadastrarUsuario
}
