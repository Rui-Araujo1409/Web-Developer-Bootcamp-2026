const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

//a extensão do Joi para proteger HTML
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {"string.escapeHTML": "{{#label}} must not include HTML!"},
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const limpar = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {}
        });
        if(limpar !== value) return helpers.error("string.escapeHTML", {value})
          return limpar;
      }
    }
  }
})

const Joi = BaseJoi.extend(extension);

  module.exports.parqueEsquema = Joi.object({
        título: Joi.string().required().escapeHTML(),
        localização: Joi.string().required().escapeHTML(),
        preço: Joi.number().required().min(10),
       // imagem: Joi.string().required(),
        descrição: Joi.string().required().escapeHTML(),
        apagarImagem: Joi.array()
    });

module.exports.avaliaçãoEsquema = Joi.object({
  avaliação: Joi.string().required().escapeHTML(),
  pontuação: Joi.number().required().min(1).max(5)
})
    