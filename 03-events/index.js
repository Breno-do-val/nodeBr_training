const EventEmitter = require('events');

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click';
meuEmissor.on(nomeEvento, click => {
    console.log('um usuario cllicou', click);
});

// meuEmissor.emit(nomeEvento, 'na barra de rolagem');
// meuEmissor.emit(nomeEvento, 'no ok');

// let count = 0;
// setInterval(() => {
//     meuEmissor.emit(nomeEvento, 'no ok' + count++);
// }, 1000);

const stdin = process.openStdin();

function main() {
    return new Promise(function (resolve, reject) {
        stdin.addListener('data', value => {
            //console.log(`Voce digitou: ${value.toString().trim()}`);
            resolve(value);
        });
    });
}

main().then(resultado => {
    console.log('resultado da promise', resultado.toString());
})
