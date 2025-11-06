const request = require('supertest');
const { cadastrarAdmin } = require('../helpers/cadastrarUsuario');
const { gerarTokenAdmin } = require('../helpers/gerarToken');
const postPremio = require('../fixtures/postPremio.json');
require('dotenv').config();

const cadastrarPremio = async () => {
    const bodyPostPrizes = {...postPremio}
    await cadastrarAdmin();
    let token = await gerarTokenAdmin();

    const response = await request(process.env.API_BASE_URL)
        .post('/prizes')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyPostPrizes);

    return response.body;
}

module.exports = {
    cadastrarPremio
}
