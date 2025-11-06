const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');

require('dotenv').config();

describe('Consultar Desafios por Turma', () => {
    describe('GET /challenges{classId}', () => {
        it('017 - Deve retornar 200 ao consultar desafios por um aluno informando a turma que faz parte', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .get('/challenges/T2')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
        });

        it('018 - Deve retornar 403 e mensagem de erro ao consultar desafios por um aluno informando uma turma que não faz parte', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .get('/challenges/T1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.error).to.be.equal('Acesso Negado. O aluno não possui vínculo com a turma informada');
        });

        it('019 - Deve retornar 200 ao consultar desafios por um administrador', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .get('/challenges/T2')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
        });

        it('020 - Deve retornar uma lista vazia ao consultar desafios de uma turma que não possui desafios cadastrados', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .get('/challenges/T1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.body).to.be.lengthOf(0);
        });

        it('021 - Deve retornar 401 e mensagem de token não informado ao consultar desafios sem informar um token', async () => {

            const response = await request(process.env.API_BASE_URL)
            .get('/challenges/T1')
            .set('Content-Type', 'application/json')

            expect(response.statusCode).to.be.eql(401);
            expect(response.body.error).to.be.equal('Token não fornecido');
        });
        
    });
});