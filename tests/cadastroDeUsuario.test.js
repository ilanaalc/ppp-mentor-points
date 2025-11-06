const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin } = require('../helpers/cadastrarUsuario')
require('dotenv').config();


describe ('Cadastro de Usuário', () => {
    describe ('POST /users/register', () => {
        it ('Deve retornar 201 e um id ao informar todos os dados obrigatórios de um aluno', async () => {
            const response = await request(process.env.API_BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                name: `user_${Math.random()}`,
                email: `user_${Math.random()}@alunomentoria.com`,
                password: '123456',
                classId: 'T2',
                isAdmin: false
            });

            expect (response.statusCode).to.be.eql(201);
            expect (response.body).to.have.property('id');
        });

        it ('Deve retornar 201 e um id ao informar todos os dados obrigatórios de um administrador', async () => {
            const response = await request(process.env.API_BASE_URL)

            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                name: `user_${Math.random()}`,
                email: `user_${Math.random()}@mentoria.com`,
                password: '123456',
                classId: '',
                isAdmin: true
            });

            expect (response.statusCode).to.be.eql(201);
            expect (response.body).to.have.property('id');
        });

        it ('Deve retornar 400 por ausência de informação obrigatória ao realizar cadastro de um aluno sem informar a turma', async () => {
            const response = await request(process.env.API_BASE_URL)

            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                name: `user_${Math.random()}`,
                email: `user_${Math.random()}@alunomentoria.com`,
                password: '123456',
                classId: '',
                isAdmin: false
            });

            expect (response.statusCode).to.be.eql(400);
            expect (response.body.error).to.equal('O campo turma é obrigatório para alunos');
        });

        it ('Deve retornar 400 por ausência de campos obrigatórios ao cadastrar um novo usuário', async () => {
            const response = await request(process.env.API_BASE_URL)

            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                name: '',
                email: '',
                password: '',
                classId: '',
                isAdmin: false
            });

            expect (response.statusCode).to.be.eql(400);
            expect (response.body.error).to.equal('Nome, email e senha são obrigatórios');
        });

        it ('Deve retornar 400 por cadastro de usuário com domínio de e-mail inválido', async () => {
            const response = await request(process.env.API_BASE_URL)

            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                name: `user_${Math.random()}`,
                email: `user_${Math.random()}@email.com.br`,
                password: '123456',
                classId: 'T1',
                isAdmin: true
            });

            expect (response.statusCode).to.be.eql(400);
            expect (response.body.error).to.equal('O domínio de e-mail informado não é válido');
        });
        it ('Deve retornar 400 por cadastro de usuário com um e-mail já utilizado', async () => {
            await cadastrarAdmin();
            
            const response = await request(process.env.API_BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                name: 'Julio',
                email: 'julio@mentoria.com',
                password: '123456',
                classId: '',
                isAdmin: true
            });

            expect (response.statusCode).to.be.eql(400);
            expect (response.body.error).to.equal('Email já cadastrado');
        });
    });
});