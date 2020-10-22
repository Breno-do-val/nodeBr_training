const service = require('./service');

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = [];

    for (let indice= 0; indice < this.length; index++) {
        const resultado = callback(this[indice], indice);
        novoArrayMapeado.push(resultado);
    }

    return novoArrayMapeado;
}

async function main() {
    try {
        const results = await service.obterPessoas('a');
        //const names = [];
        // results.results.forEach(element => {
        //     names.push(element.name);
        // });
        // const names = results.results.map(item => item.name);
        const names = results.results.meuMap(function (pessoa, indice) {
            return `[${indice}] ${pessoa.name}`;
        })
        console.log('names', names);
    } catch (error) {
        console.error("erro: ", erro);
    }
}

main();