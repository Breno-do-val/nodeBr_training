const assert = require('assert');
const api = require('./../api');

describe('Suite de testes da API Hero', function() {
    this.beforeAll(async () => {
        app = await api;
    });

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepStrictEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });
})