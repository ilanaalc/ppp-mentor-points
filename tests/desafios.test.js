const request = require('supertest');
const { expect } = require('chai');
const { cadastrarAdmin, cadastrarAluno } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin, gerarTokenAluno } = require('../helpers/gerarToken');
const postDesafiosSemCupomExtra = require('../fixtures/postDesafiosSemCupomExtra.json');
const postDesafiosComCupomExtra = require('../fixtures/postDesafiosSemCupomExtra.json');

require('dotenv').config();

describe('Desafios', () => {
    describe('POST /challenges', () => {
        it('013 - Deve retornar 201 e um id ao cadastrar um desafio informando todos os dados obrigatórios válidos', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(postDesafiosSemCupomExtra);

            expect(response.statusCode).to.be.eql(201);
            expect(response.body).to.have.property('id');
        });

        it('014 - Deve retornar 400 e mensagem de erro por ausência de campos obrigatórios ao cadastrar um novo desafio', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: "",
                    description: "",
                    classId: "",
                    extraCoupon: false
                });

            expect(response.statusCode).to.be.eql(400);
            expect(response.body.error).to.be.equal('Título, descrição e turma são obrigatórios');
        });

        it('015 - Deve retornar 401 e mensagem de acesso não permitido ao criar desafio por um usuário com perfil de aluno', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(postDesafiosSemCupomExtra);

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.error).to.be.equal('Acesso restrito a administradores');
        });

        it('016 - Deve retornar 401 e mensagem de token não informado ao criar desafio sem informar um token', async () => {

            const response = await request(process.env.API_BASE_URL)
                .post('/challenges')
                .set('Content-Type', 'application/json')
                .send(postDesafiosComCupomExtra);

            expect(response.statusCode).to.be.eql(401);
            expect(response.body.error).to.be.equal('Token não fornecido');
        });

    });

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


    describe('DELETE /challenges{id}', () => {
        it('026 - Deve retornar 204 ao remover um desafio existente por um administrador', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .delete('/challenges/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(204);
         });

        it('027 - Deve retornar 403 e mensagem de acesso não permitido ao remover um desafio existente por um aluno', async () => {
            await cadastrarAluno();
            let token = await gerarTokenAluno();

            const response = await request(process.env.API_BASE_URL)
            .delete('/challenges/1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(403);
            expect(response.body.error).to.be.equal('Acesso restrito a administradores');
         });

        it('028 - Deve retornar 400 e mensagem de desafio não existente ao remover um desafio que não existe', async () => {
            await cadastrarAdmin();
            let token = await gerarTokenAdmin();

            const response = await request(process.env.API_BASE_URL)
            .delete('/challenges/21')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).to.be.eql(400);
            expect(response.body.error).to.be.equal('O desafio informado não existe');
        });
    });
});

