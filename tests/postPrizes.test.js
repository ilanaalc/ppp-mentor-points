const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
const postPremio = require('../fixtures/postPremio.json');

require('dotenv').config();

describe('Cadastrar Prêmios', () => {
    describe('POST /prizes', () => {
        it('051 - Deve retornar 201 e um id ao cadastrar um prêmio informando todos os dados obrigatórios válidos por um usuário administrador', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
                .post('/prizes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(postPremio);

            expect(response.statusCode).to.be.eql(201);
            expect(response.body).to.have.property('id');
        });

        it('052 - Deve retornar 403 e mensagem de acesso não permitido ao cadastrar prêmio por um aluno', async () => {
            await cadastrarAluno()
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
                .post('/prizes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(postPremio);

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.error).to.be.equal('Acesso restrito a administradores');
        });

        it('053 - Deve retornar 401 e mensagem de token não informado ao criar prêmio sem informar um token', async () => {

            const response = await request(process.env.API_BASE_URL)
                .post('/prizes')
                .set('Content-Type', 'application/json')
                .send(postPremio);

            expect(response.statusCode).to.be.eql(401);
            expect(response.body.error).to.be.equal('Token não fornecido');
        });

        it('054 - Deve retornar 400 e mensagem de prêmio já existente ao criar prêmio com dados existentes', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
                .post('/prizes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(postPremio);

            expect(response.statusCode).to.be.eql(400);
            expect(response.body).to.have.property('O prêmio informado existe');
        });
    });
});