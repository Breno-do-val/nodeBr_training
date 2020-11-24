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
                tags: ['api'],
                description: 'Deve listar herois',
                notes: 'pode paginar resultados e filtrar por nome',
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
                tags: ['api'],
                description: 'Deve atualizar heroi por id',
                notes: 'Pode atualizar qualquer campo',
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

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Deve remover heroi por id',
                notes: 'O Id tem que ser válido',
                validade: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params;
                    const resultado = await this.db.delete(id);
                    if (resultado.nModified != 1 ) {
                        return {
                            message: 'Não foi possivel remover o item'
                        }
                    }
                    return {
                        message: 'Item Removido com sucesso'
                    }         
                } catch (error) {
                    console.error("Deu ruim", erro);
                    return 'Erro interno'
                }
            }
        }
    }
}

module.exports = HeroRoutes;