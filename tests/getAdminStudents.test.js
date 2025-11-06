const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
require('dotenv').config();

describe('Consultar Alunos', () => {
    describe('GET /admin/students', () => {
        it('059 - Deve retornar 200 ao consultar alunos por um usuário administrador', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .get('/admin/students')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(200);
            expect(response.body).to.be.lengthOf(1);
        });

        it('060 - Deve retornar 403 e mensagem de acesso não permitido ao consultar alunos por um aluno', async () => {
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .get('/admin/students')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.error).to.be.equal('Acesso restrito a administradores');
        });

        it('061 - Deve retornar 401 e mensagem de token não informado ao consultar alunos sem informar um token', async () => {

            const response = await request(process.env.API_BASE_URL)
            .get('/admin/students')
            .set('Content-Type', 'application/json')

            expect(response.statusCode).to.be.eql(401);
            expect(response.body.error).to.be.equal('Token não fornecido');
        });   
    });
});