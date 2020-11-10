const ICrud = require('./interfaces/interfaceCrud');
const Mongoose = require('mongoose');

const STATUS = {
    0: 'Desconectado',
    1: 'Conectando',
    2: 'Conectado',
    3: 'Desconectando'
}

class MongoDB extends ICrud {
    
    constructor() {
        super();
        this._herois = null;
        //this._driver = null;
        this._connection = null;
    }
    
    async isConnected() {
        const state = STATUS[this._connection.readyState]
        
        if(state === 'Conectado') return state;
        
        if(state === 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 2000));

        return STATUS[this._connection.readyState];

    }
    
    defineModel() {
        heroiSchema = new Mongoose.Schema({
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
        this._herois = Mongoose.model('herois', heroiSchema);
    }
    
    connect() {
        Mongoose.connect('mongodb://brenodoval:minhasenhasecreta@localhost:27017/herois', { useNewUrlParser: true}, function (error) {
            if (!error) return;
            console.log('Falha na conexão', error);
        });
        
        this._connection = Mongoose.connection;

        this._connection.once('open', () => console.log('Database rodando'));
        
    }

    async create(item) {    
        const resultCadastrar = await model.create({
            nome: 'Batman',
            poder: 'Dinheiro'
        });
        console.log('Result cadastrar', resultCadastrar)
    }

}

module.exports = MongoDB;