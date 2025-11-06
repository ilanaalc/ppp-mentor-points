const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
const postDesafiosSemCupomExtra = require('../fixtures/postDesafiosSemCupomExtra.json');
const postDesafiosComCupomExtra = require('../fixtures/postDesafiosComCupomExtra.json');
require('dotenv').config();

describe('Cadastrar Desafios', () => {
    describe('POST /challenges', () => {
        it('013 - Deve retornar 201 e um id ao cadastrar um desafio informando todos os dados obrigatórios válidos', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(postDesafiosSemCupomExtra);

            expect(response.statusCode).to.be.eql(201);
            expect(response.body).to.have.property('id');
        });

        it('014 - Deve retornar 400 e mensagem de erro por ausência de campos obrigatórios ao cadastrar um novo desafio', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: "",
                    description: "",
                    classId: "",
                    extraCoupon: false
                });

            expect(response.statusCode).to.be.eql(400);
            expect(response.body.error).to.be.equal('Título, descrição e turma são obrigatórios');
        });

        it('015 - Deve retornar 401 e mensagem de acesso não permitido ao criar desafio por um usuário com perfil de aluno', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(postDesafiosSemCupomExtra);

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.error).to.be.equal('Acesso restrito a administradores');
        });

        it('016 - Deve retornar 401 e mensagem de token não informado ao criar desafio sem informar um token', async () => {

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges')
                .set('Content-Type', 'application/json')
                .send(postDesafiosComCupomExtra);

            expect(response.statusCode).to.be.eql(401);
            expect(response.body.error).to.be.equal('Token não fornecido');
        });

    });
});