const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno} = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
require('dotenv').config();

describe('Desafios', () => {
    describe('POST /challenges', () => {
        it('Deve retornar 201 e um id ao cadastrar um desafio informando todos os dados obrigatórios válidos', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();
            const response = await request(process.env.API_BASE_URL)
                .post('/challenges')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: "Desafio 1 - Testes de API Rest com SuperTest",
                    description: "Desenvolva Testes de API Rest com SuperTest",
                    classId: "T2",
                    extraCoupon: false
                });

            expect(response.statusCode).to.be.eql(201);
            expect(response.body).to.have.property('id');
        });
    });
});