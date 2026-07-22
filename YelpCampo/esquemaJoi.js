const Joi = require("joi");

  module.exports.parqueEsquema = Joi.object({
        título: Joi.string().required(),
        localização: Joi.string().required(),
        preço: Joi.number().required().min(10),
       // imagem: Joi.string().required(),
        descrição: Joi.string().required(),
        apagarImagem: Joi.array()
    });

module.exports.avaliaçãoEsquema = Joi.object({
  avaliação: Joi.string().required(),
  pontuação: Joi.number().required().min(1).max(5)
})
    