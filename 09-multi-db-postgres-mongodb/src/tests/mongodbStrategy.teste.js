const assert = require('assert');
const MongoDb = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');
const { AssertionError } = require('assert');

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
};

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super Teia'
};

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velocidade'
};

let MOCK_HEROI_ID = null;

const context = new Context(new MongoDb());

describe('MongoDB Suite de testes', function() {
    this.beforeAll(async () => {
        await context.connect();
        await context.create(MOCK_HEROI_DEFAULT);
        const result = await context.create(MOCK_HEROI_ATUALIZAR);
        MOCK_HEROI_ID = result._id;
    });

    it('Verificar conexão', async () => {
        const result = await context.isConnected();
        const expected = 'Conectado';

        assert.deepStrictEqual(result, expected);
    });

    it('Cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
        assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
    });

    it('Listar', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome});
        const result = { 
            nome, poder
        };
        assert.deepStrictEqual(result, MOCK_HEROI_DEFAULT);
    });

    it('Atualizar', async() => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        });
        assert.deepStrictEqual(result.nModified, 1);
    });

    it('Remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID);
        assert.deepStrictEqual(result.n, 1);
    })
});
