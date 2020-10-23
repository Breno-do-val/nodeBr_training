const axios = require('axios');

const URL = `https://swapi.dev/api/people`;

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`;
    const result = await axios.get(url);
    return result.data;
}

module.exports = {
    obterPessoas
}
