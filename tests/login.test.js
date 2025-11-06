const request = require ('supertest');
const { expect } = require ('chai');
const { cadastrarUsuario, cadastrarUsuarioAdmin, cadastrarUsuarioEstudante } = require ('../helpers/cadastrarUsuario')
require('dotenv').config();

describe('Login', () => {
    describe('POST /users/login', () => {
        it('Deve retornar 200 e um token JWT ao informar credenciais válidas de um usuário com perfil de aluno', async () => {
            await cadastrarUsuarioAdmin();
            const response = await request(process.env.API_BASE_URL)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'julio@mentoria.com',
                password: '123456'
            });
            
            expect (response.statusCode).to.be.eql(200);
            expect (response.body).to.have.property('token');
        });
        
        it('Deve retornar 200 e um token JWT ao informar credenciais válidas de um usuário com perfil administrador', async () => {
            await cadastrarUsuarioEstudante();
            const response = await request(process.env.API_BASE_URL)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'ana@alunomentoria.com',
                password: '123456'
            });

            expect (response.statusCode).to.be.eql(200);
            expect (response.body).to.have.property('token');
        });
    });
});