const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
const { cadastrarDesafioComCupomExtra} = require('../helpers/cadastrarDesafio');
require('dotenv').config();

describe('Completar Desafios', () => {
    describe('POST /challenges/complete', () => {
        it('031 - Deve retornar 200 e uma mensagem de sucesso ao registrar a conclusão de um desafio para um aluno com um usuário administrador', async () => {
            await cadastrarAluno();
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();
            await cadastrarDesafioComCupomExtra();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges/complete')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userId: 1,
                    challengeId: 2,
                    challengeTitle: 'Desafio 2 - Testes de API Rest com Cypress',
                    teamId: 10
                });

            expect(response.statusCode).to.be.eql(200);
            expect(response.body.message).to.be.equal('Desafio concluído e cupom gerado');
        });

        it('032 - Deve retornar 400 e uma mensagem de erro ao registrar a conclusão de um desafio para um aluno que não existe', async () => {
            await cadastrarAluno();
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();
            await cadastrarDesafioComCupomExtra();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges/complete')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userId: 2,
                    challengeId: 2,
                    challengeTitle: 'Desafio 2 - Testes de API Rest com Cypress',
                    teamId: 12
                });

            expect(response.statusCode).to.be.eql(400);
            expect(response.body.message).to.be.equal('Erro ao gerar o cupom: O aluno informado não foi encontrado');
        });

        it('033 - Deve retornar 400 e uma mensagem de erro ao registrar a conclusão de um desafio para um aluno com um nome de desafio que não existe', async () => {
            await cadastrarAluno();
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();
            await cadastrarDesafioComCupomExtra();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges/complete')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userId: 2,
                    challengeId: 5,
                    challengeTitle: 'Desafio 2 - Testes de API Rest com Cypress',
                    teamId: 12
                });

            expect(response.statusCode).to.be.eql(400);
            expect(response.body.error).to.be.equal('Desafio não encontrado');
        });

        it('034 - Deve retornar 400 e uma mensagem de erro ao cadastrar conclusão de um desafio sem informar todos os dados obrigatórios', async () => {
            await cadastrarAluno();
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();
            await cadastrarDesafioComCupomExtra();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges/complete')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userId: null,
                    challengeId: null,
                    challengeTitle: '',
                    teamId: null
                });

            expect(response.statusCode).to.be.eql(400);
            expect(response.body.error).to.be.equal('Usuário, desafio e título do desafio são obrigatórios');
        });

        it('035 - Deve retornar 403 e uma mensagem de acesso não permitido ao registrar a conclusão de um desafio para um aluno com um usuário aluno', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();
            await cadastrarDesafioComCupomExtra();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges/complete')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userId: 1,
                    challengeId: 2,
                    challengeTitle: 'Desafio 2 - Testes de API Rest com Cypress',
                    teamId: 10
                });

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.error).to.be.equal('Acesso restrito a administradores');
        });

        it('038 - Deve retornar 200 e uma mensagem de sucesso ao registrar a conclusão de um desafio para um aluno sem informar o teamId', async () => {
            await cadastrarAluno();
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();
            await cadastrarDesafioComCupomExtra();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges/complete')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userId: 1,
                    challengeId: 2,
                    challengeTitle: 'Desafio 2 - Testes de API Rest com Cypress',
                    teamId: ''
                });

            expect(response.statusCode).to.be.eql(200);
            expect(response.body.message).to.be.equal('Desafio concluído e cupom gerado');
        });

        it('042 - Deve retornar 403 e uma mensagem de operação não permitida ao registrar a conclusão de um desafio para um administrador', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();
            await cadastrarDesafioComCupomExtra();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges/complete')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    userId: 1,
                    challengeId: 2,
                    challengeTitle: 'Desafio 2 - Testes de API Rest com Cypress',
                    teamId: ''
                });

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.message).to.be.equal('Acesso não permitido: Os cupons só podem ser gerados para alunos');
        });        
    });
});
