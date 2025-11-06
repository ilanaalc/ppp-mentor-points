const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
const postDesafiosSemCupomExtra = require('../fixtures/postDesafiosSemCupomExtra.json');

require('dotenv').config();

describe('Atualizar Desafios', () => {
    describe('PUT /challenges{id}', () => {
        it('022 - Deve retornar 200 ao editar um desafio existente por um administrador', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .put('/challenges/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(pos)
            expect(response.statusCode).to.be.eql(200);
        });

        it('023 - Deve retornar 403 ao editar um desafio existente por um aluno', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .put('/challenges/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(postDesafiosSemCupomExtra)

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.error).to.be.equal('Acesso restrito a administradores');
        });

        it('024 - Deve retornar 200 ao editar um desafio existente com os mesmos dados por um administrador', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .put('/challenges/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(postDesafiosSemCupomExtra)

            expect(response.statusCode).to.be.eql(200);
        });

        it('025 - Deve retornar 401 e mensagem de token não informado ao editar um desafio sem informar o token', async () => {

            const response = await request(process.env.API_BASE_URL)
            .put('/challenges/1')
            .set('Content-Type', 'application/json')
            .send(postDesafiosSemCupomExtra)

            expect(response.statusCode).to.be.eql(401);
            expect(response.body.error).to.be.equal('Token não fornecido');
        });
    });
});
