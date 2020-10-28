const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {

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

    const heroi = new Heroi(Commander);

    try {

        if (Commander.cadastrar) {
            delete heroi.id;

            const resultado = await Database.cadastrar(heroi);
            if (!resultado) {
                console.error('Heroi não cadastrado');
                return;
            }
            console.log('Heroi cadastrado com sucesso!');
        }
        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id);
            if (!resultado) {
                console.error('Não foi possível remover um herói');
                return;
            }
            console.log('Heroi removido com sucesso!');
        }
        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar);

            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);
            if (!resultado) {
                console.error('Não foi possível atualizar um herói');
                return;
            }
            console.log('Heroi atualizado com sucesso!');
        }
        if (Commander.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }

        
    } catch (error) {
        console.error('deu ruim', error);
    }
}

main();