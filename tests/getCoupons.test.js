const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
const { cadastrarDesafioComCupomExtra} = require('../helpers/cadastrarDesafio');
require('dotenv').config();

describe('Consultar Cupons', () => {
    describe('GET /coupons/{userId}', () => {
        it('039 - Deve retornar 200 ao consultar cupons gerados para um aluno com credenciais de administrador', async () => {
            await cadastrarAluno();
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .get('/coupons/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
        });

        it('040 - Deve retornar 200 ao consultar cupons gerados para um aluno com credenciais de aluno', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .get('/coupons/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
        });
    });
});
