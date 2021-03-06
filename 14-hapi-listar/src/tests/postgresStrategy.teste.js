const assert = require('assert');
const Postgres = require('./../db/strategies/postgres/postgres');
const HeroiSchema = require('./../db/strategies/postgres/schemas/heroiSchema');
const Context = require('./../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flechas'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Batman',
    poder: 'dinheiro'
}

let context = {};

describe('Postgres Strategy', function () {
    this.timeout(Infinity);
    this.beforeAll(async function() {
        const connection = await Postgres.connect();
        const model = await Postgres.defineModel(connection, HeroiSchema);
        context = new Context(new Postgres(connection, model));
        await context.delete();
        await context.create(MOCK_HEROI_ATUALIZAR);
    })

    it('PostgreSQL Connection', async function() {
        const result = await context.isConnected();
        assert.deepStrictEqual(result, true);
    });

    it('Cadastrar', async function() {
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id;
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('Listar', async function() {
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome});
        delete result.id;
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('Atualizar', async function() {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome});
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        
        const [result] = await context.update(itemAtualizar.id, novoItem);
        const [itemAtualizado] = await context.read({id: itemAtualizar.id});
        assert.deepStrictEqual(result, 1);
        assert.deepStrictEqual(itemAtualizado.nome, novoItem.nome);
    });

    it('Remover por id', async function() {
        const [item] = await context.read({});
        const result = await context.delete(item.id);
        assert.deepStrictEqual(result, 1);
    })
})