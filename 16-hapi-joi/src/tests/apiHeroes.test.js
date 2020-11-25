const assert = require('assert');
const api = require('../api');

const TOKEN = 'eyaldvnfdavfdavNLKFWJKDvWJKOEF2io3';

const MOCK_ID = "";

const headers = {
    Authotization: TOKEN
}

function cadastrar() {
    return app.inject({
        method: 'POST',
        url: '/herois',
        payload: {
            nome: 'Flash',
            poder: 'Velocidade'
        }
    });
}

describe('API Heroes test suite', function ()  {
    this.beforeAll(async () => {
        app = await api
        const result = await cadastrar()
        
        MOCK_ID = JSON.parse(result.payload)._id
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            headers,
            url: '/herois'
        })
        const statusCode = result.statusCode 
        
        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })

    it('cadastrar /herois', async () => {
        const result = await cadastrar()
        assert.deepStrictEqual(result.statusCode, 200)
        assert.deepStrictEqual(JSON.parse(result.payload).nome, "Flash")

    })

    it('não deve cadastrar com payload errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: {
                NAME: 'Flash'
            }
        })
        const payload = JSON.parse(result.payload)
        assert.deepStrictEqual(result.statusCode, 400)
        assert.ok(payload.message.search('"nome" is required') !== -1)
    })
    it('atualizar /herois/{id}', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${MOCK_ID}`,
            headers,
            payload: {
                nome: 'Canário Negro',
                poder: 'Grito'
            }
        })
        assert.deepStrictEqual(result.statusCode, 200) 
        assert.deepStrictEqual(JSON.parse(result.payload).nModified, 1)

    })
    it('remover /herois/{id}', async () => {
        const result =  await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${MOCK_ID}` 
        })
        assert.deepStrictEqual(result.statusCode, 200) 
        assert.deepStrictEqual(JSON.parse(result.payload).n, 1)
    })
})