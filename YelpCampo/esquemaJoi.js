const Joi = require("joi");

  module.exports.parqueEsquema = Joi.object({
        título: Joi.string().required(),
        localização: Joi.string().required(),
        preço: Joi.number().required().min(10),
        imagem: Joi.string().required(),
        descrição: Joi.string().required()
    })
    