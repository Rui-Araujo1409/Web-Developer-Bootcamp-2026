const express = require("express");
const rota = express.Router();
//importar modelos
const Avaliação = require("../modelos/avaliações");
const Parque = require("../modelos/parque");
//importar Esquema Joi
const { avaliaçãoEsquema } = require("../esquemaJoi.js");
const {validarAvaliação, estáLogado, verificarAutorAvaliação} = require("../middleware.js");
//importar controlador
const avaliações = require("../controladores/avaliações.js");


rota.post("/:id/avaliacao", estáLogado, validarAvaliação, avaliações.criarAvaliação);

rota.delete("/:id/avaliacao/:avaliacaoId", estáLogado, verificarAutorAvaliação, avaliações.apagarAvaliação)




module.exports = rota;