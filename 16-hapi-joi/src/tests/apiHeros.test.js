const assert = require('assert');
const api = require('./../api');

const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Negro',
    poder: 'A mira'
};

const MOCK_ID = null;

describe('Suite de testes da API Hero', function() {
    this.beforeAll(async () => {
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(result.payload)
        });
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id
    });

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois',
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepStrictEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('Listar /herois - deve retornar apenas 3 registros', async () => {
        const TAMANHO_LIMITE = 3;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepStrictEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE);
    });

    it('Listar /herois - deve filtrar um item', async () => {
        const NAME = 'Homem Aranha-1605109425197'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepStrictEqual(statusCode, 200);
        assert.ok(dados[0].nome === NAME);
    });

    it('Atualizar PATCH - /herois/:id', async () => {
        const _id = MOCK_ID;
        const expected = {
            poder: 'Super Mira'
        }
        
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepStrictEqual(dados.message, 'HEROI atualizado com sucesso');
    })
})