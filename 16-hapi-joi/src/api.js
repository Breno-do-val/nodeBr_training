
const Hapi = require('hapi')
const Context =require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema');
const HeroRoutes = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const inert = require('@hapi/inert');
const JWT_SECRET = 'MEU_SEGREDÂO_123';

const app = new Hapi.Server({
    port: 5000
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
}

async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeroiSchema));

    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBr',
            version: 'v1.0'
        },
        lang: 'pt'
    };
    
    await app.register([
        Vision,
        inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        options: {
            expiresIn: 3600
        },
        validate: (dado, request) => {

            return {
                isValid: true
            }
        }
    });

    app.auth.default('jwt');

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ]);

    await app.start();
    console.log('Servidor rodando na porta ', app.info.port);

    return app;
}

module.exports = main();