/*
    0 Obter um usuário
    1 Obter o numero de telefone de um usuário a partir de seu ID
    2 Obter o endereco do usuario pelo id
 */

 const util = require('util');

 const obterEnderecoAsync = util.promisify(obterEndereco);

 function obterUsuario() {
     return new Promise(function resolvePromise(resolve, reject) {
         setTimeout(function () {
             return resolve({
                 id: 1,
                 nome: 'Aladin',
                 dataNascimento: new Date()
             })
         }, 1000);
     })
 }

 function obterTelefone(idUsuario) {
     return new Promise(function resolverPromise(resolve, reject) {
         setTimeout(()=> {
             return resolve({
                 telefone: '1199990022',
                 ddd: 11
             })
         }, 2000);
     })
 }

 function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos Bobos',
            numero: 0
        })
    }, 2000);
 }

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

// const usuarioPromise = obterUsuario();

// usuarioPromise
//     .then(usuario => {
//         return obterTelefone(usuario.id)
//         .then(function resolverTelefone(result) {
//             return {
//                 usuario: {
//                     nome: usuario.nome,
//                     id: usuario.id
//                 },
//                 telefone: result
//             }
//         })
//     })
//     .then(resultado => {
//         const endereco = obterEnderecoAsync(resultado.usuario.id);
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result

//             }
//         })
//     })
//     .then(resultado => {
//     console.log('resultado', resultado);

// })
//     .catch(err => {
//     console.log('deu ruim' + err);
// })

//  obterUsuario(function resolverUsuario(error, usuario) {
//     //  null || "" || 0 === false
//      if (error) {
//          console.error('DEU RUIM em USUARIO', error);
//      }
//      obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.error('DEU RUIM em TELEFONE', error);
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if (error2) {
//                 console.error('DEU RUIM em ENDERECO', error);
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereco: ${endereco.rua}, ${endereco.numero},
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `);
//         });
//      });
//  });
