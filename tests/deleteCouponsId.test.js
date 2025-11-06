const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
require('dotenv').config();

describe('Remover Cupons', () => {
    describe('DELETE /coupons{id}', () => {
        it('047 - Deve retornar 204 ao remover um cupom existente por um administrador', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .delete('/coupons/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(204);
         });

        it('048 - Deve retornar 403 e mensagem de acesso não permitido ao remover um cupom existente por um aluno', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .delete('/coupons/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.error).to.be.equal('Acesso restrito a administradores');
         });

        it('049 - Deve retornar 400 e mensagem de cupom não existente ao remover um cupom que não existe', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .delete('/coupons/21')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(400);
            expect(response.body.error).to.be.equal('O cupom informado não existe');
        });

        it('050 - Deve retornar 401 e mensagem de token não informado ao remover um cupom sem informar um token', async () => {

            const response = await request(process.env.API_BASE_URL)
            .delete('/challenges/21')
            .set('Content-Type', 'application/json')

            expect(response.statusCode).to.be.eql(401);
            expect(response.body.error).to.be.equal('Token não fornecido');
        });
    });
});
