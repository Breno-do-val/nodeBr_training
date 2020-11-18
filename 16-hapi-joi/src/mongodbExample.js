const Mongoose = require('mongoose');

Mongoose.connect('mongodb://brenodoval:minhasenhasecreta@localhost:27017/herois', { useNewUrlParser: true}, function (error) {
    if (!error) return;
    console.log('Falha na conexão', error);
});

const connection = Mongoose.connection;

connection.once('open', () => console.log('Database rodando'));

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});

const model = Mongoose.model('herois', heroiSchema);

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    });
    console.log('Result cadastrar', resultCadastrar)

    const listItems = await model.find();
    console.log('items', listItems);
}

main();
