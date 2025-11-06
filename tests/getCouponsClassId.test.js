const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
require('dotenv').config();

describe('Consultar Cupons por Turma', () => {
    describe('GET /coupons/class/{classId}', () => {
        it('043 - Deve retornar 200 ao consultar cupons gerados para uma turma com credenciais de administrador', async () => {
            await cadastrarAluno();
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .get('/coupons/class/T2')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
        });

        it('044 - Deve retornar 200 ao consultar cupons gerados para uma turma com credenciais de aluno', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .get('/coupons/class/T2')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
        });

        it('046 - Deve retornar 200 e uma lista vazia ao consultar cupons de uma turma que não possui cupons cadastrados', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();;

            const response = await request(process.env.API_BASE_URL)
            .get('/coupons/class/T3')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
            expect(response.body).to.be.lengthOf(0);
        });
    });
});
