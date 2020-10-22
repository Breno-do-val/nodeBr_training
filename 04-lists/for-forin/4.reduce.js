const { obterPessoas } = require('./service');

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
    for(let index = 0; index < this.length; index++) {
        valorFinal = callback(valorFinal, this[index], this);
    }
    return valorFinal;
}

async function main() {
    try {
        //const { resultado } = await obterPessoas('a');
        //const pesos = results.map(item => parseInt(item.weight));
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo;
        // }, 0);
        const minhaLista = [
            ['Erick', 'Wendell'],
            ['NodeBr', 'Nerdzao']
        ]
        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo);
        }, [])
        .join(', ');
        console.log('Total: ', total);
    } catch (error) {
        console.error('Deu ruim', error);
    }
}

main();
