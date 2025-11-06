const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
const { cadastrarPremio } = require('../helpers/cadastrarPremio');
require('dotenv').config();

describe('Consultar Prêmios', () => {
    describe('GET /prizes', () => {
        it('058 - Deve retornar 200 e uma lista vazia ao consultar prêmios sem prêmio disponíveis ', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .get('/prizes')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.body).to.be.lengthOf(0);
        });

        it('055 - Deve retornar 200 ao consultar prêmios por um usuário administrador', async () => {
            await cadastrarPremio();
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .get('/prizes')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
            expect(response.body).to.be.lengthOf(1);
        });

        it('056 - Deve retornar 200 ao consultar prêmios por um aluno', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .get('/prizes')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
            expect(response.body).to.be.lengthOf(1);
        });

        it('057 - Deve retornar 401 e mensagem de token não informado ao consultar prêmios sem informar um token', async () => {

            const response = await request(process.env.API_BASE_URL)
            .get('/prizes')
            .set('Content-Type', 'application/json')

            expect(response.statusCode).to.be.eql(401);
            expect(response.body.error).to.be.equal('Token não fornecido');
        });   
    });
});