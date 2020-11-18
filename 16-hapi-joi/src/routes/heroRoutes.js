const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');

class HeroRoutes extends BaseRoute{
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
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
            handler: async (request, headers) => {
                try {
                    const { 
                        skip, limit, nome 
                    } = request.query;

                    const query = {
                        nome: {$regex: `.*${nome}*.`}
                    };

                    return await this.db.read(nome ? query : {}, skip, limit);
                    
                } catch (error) {
                    console.log('Deu ruim', erro);
                    return "Erro interno do servidor";
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const id = request.params.id;
                    const payload = request.payload;
                    const dadosString = JSON.stringify(payload);
                    const dados = JSON.parse(dadosString);

                    const result = await this.db.update(id, dados);

                    if (result.nModified !== 1) {
                        return {
                            message: 'Não foi possível atualizar'
                        }
                    }

                    return {
                        message: 'Heroi atualizado com sucesso!'
                    }


                } catch (error) {
                    console.error('DEU RUIM', error);
                    return 'Erro interno';
                }
            }
        }
    }
}

module.exports = HeroRoutes;