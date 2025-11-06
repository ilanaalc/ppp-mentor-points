const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario')
require('dotenv').config();

describe('Login', () => {
    describe('POST /users/login', () => {
        it('Deve retornar 200 e um token JWT ao informar credenciais válidas de um usuário com perfil de aluno', async () => {
            await cadastrarAluno();

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
        
        it('Deve retornar 200 e um token JWT ao informar credenciais válidas de um usuário com perfil administrador', async () => {
            await cadastrarAdmin();

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

        it('Deve retornar 400 por ausência de campos obrigatórios ao realizar o login', async () => {
            const response = await request(process.env.API_BASE_URL)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: '',
                password: ''
            });

            expect (response.statusCode).to.be.eql(400);
            expect (response.body.error).to.be.equal('E-mail e senha são obrigatórios');
        });

        it('Deve retornar 401 e mensagem de erro ao informar credenciais inválidas', async () => {
            const response = await request(process.env.API_BASE_URL)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'julio@mentoria.com',
                password: '123'
            });

            expect (response.statusCode).to.be.eql(401);
            expect (response.body.error).to.be.equal('Senha inválida');
        });        
    });
});