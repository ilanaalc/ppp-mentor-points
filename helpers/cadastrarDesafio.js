const request = require('supertest');
const postDesafiosSemCupomExtra = require('../fixtures/postDesafiosSemCupomExtra.json');
const postDesafiosComCupomExtra = require('../fixtures/postDesafiosComCupomExtra.json');
require('dotenv').config();

const cadastrarDesafioComCupomExtra= async () => {
    const bodyPostChallenges = {...postDesafiosComCupomExtra}
    await cadastrarAdmin();
    let token = await gerarTokenAdmin();

    const response = await request(process.env.API_BASE_URL)
        .post('/challenges')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyPostChallenges);

    return response.body.id;
}

const cadastrarDesafioSemCupomExtra= async () => {
    const bodyPostChallenges = {...postDesafiosSemCupomExtra}
    await cadastrarAdmin();
    let token = await gerarTokenAdmin();

    const response = await request(process.env.API_BASE_URL)
        .post('/challenges')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyPostChallenges);

    return response.body.id;
}


module.exports = {
    cadastrarDesafioComCupomExtra,
    cadastrarDesafioSemCupomExtra,
}
