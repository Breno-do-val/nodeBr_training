# NodeBr_training
Understanding Node.js fundamentals and best practices.

## Table of Content
* [General info](#general-info)
* [Technologies and Dependencies](#technologies-and-dependencies)
* [Hands-on](#hands-on)
* [License and copyright](#license-and-copyright)
* [Acknowledgements](#acknowledgements)

### General info
Node.js fundamentals course instructed by [Erick Wendel](https://erickwendel.com.br)

### Technologies and dependencies
* Express - Node.js framework
* Axios - Promise based HTTP client for the browser and node.js
* Docker - It creates simple tooling and a universal packaging approach that bundles up all application dependencies inside a container which is then run on Docker Engine.
* PostgreSQL - Open-source relational database management system (RDBMS)
* Sequelize - Promise-based Node.js ORM
* Mongoose - Object modeling tool

### Hands on

----- Study case to show how to improve perfomance by using 'Promise.all()' ----
````
main();
 async function main() {

    try {
        console.time('medida-promise');
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ]);
        const telefone = resultado[0];
        const endereco = resultado[1];
     
        console.log(`
            Nome: ${usuario.nome},
            Telefone: ${telefone.ddd} ${telefone.telefone},
            Endereço: ${endereco.rua}, ${endereco.numero}
        `);
        console.timeEnd('medida-promise');
    } 
    catch (error) {
        console.error('Deu ruim', error);
    }
}

````

---- Benefits of using 'for...in' statement loop for improving performance ----
````
async function main() {
    try {
        const result = await service.obterPessoas('a');
        const names = [];
        console.time('for');
        for (let i = 0; i <= result.results.length -1; i++) {
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        console.timeEnd('for');
        
        console.time('forin');
        for (let i in result.results) {
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        console.timeEnd('forin');

        console.time('forof');
        for (pessoa of result.results) {
            names.push(pessoa.name);
        }
        console.timeEnd('forof');
        console.log('names', names)
    } catch (error) {
        console.error('Erro interno');
    }
}

````

---- Applying TDD with MOCHA ----
````
describe('Suite de manipulacao de herois', async ()=> {

    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    })

    it('deve pesquisar um heroi usando arquivos', async() => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [ resultado ] = await database.listar(expected.id);

        deepStrictEqual(resultado, expected);
    })

})

````

---- Using embedded command line interface to execute CRUD ----
````
Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do heroi")
        .option('-p --poder [value]', "Poder do heroi" )
        .option('-i --id [value]', "Id do heroi" )

        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-l, --listar', "listar um heroi")
        .option('-r, --remover', "remover um heroi por id")
        .option('-a, --atualizar [value]', "atualizar um heroi por id")
        .parse(process.argv)

````

---- Create an instance of PostgreSQL using DOCKER ----
````
docker run `
    --name postgres `
    -e POSTGRES_USER=**** `
    -e POSTGRES_PASSWORD=********** `
    -e POSTGRES_DB=heroes `
    -p 5432:5432 `
    -d `
    postgres

````

---- Using Strategy design patter for using database multi-schema
````
    class ContextStrategy {

    constructor(strategy) {
        this._database = strategy;
    }

    create(item) {
        return this._database.create(item);
    }

    read(item) {
        return this._database.read(item);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id);
    }

}

````

---- Using JOI for query string  validation ----
````
config: {
    validate: {
        failAction: (request, headers, error) => {
            throw error;
        },
        query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100)
        }
    }
},

````

#### License and copyright
MIT.

#### Acknowledgements
Thanks to Erick Wendel whom provided this course.
