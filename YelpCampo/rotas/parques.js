const express = require("express");
const rota = express.Router();
const passport = require("passport");
//tem que se importar o modelo
const Parque = require("../modelos/parque");
//importar o middleware do verficar o login
const { estáLogado } = require("../middleware.js");
const {validarParque, verificarAutor} = require("../middleware.js");
//importar os controladores
const parques = require("../controladores/parques.js");


//as rotas estáticas têm de ser colocadas antes das dinâmicas

///rotas estáticas
////user o método .route() para agrupar no mesmo path os vários tipos de pedido http

rota.route("/")
.get(parques.índice)
.post(estáLogado, validarParque, parques.criarParque);

rota.get("/novo", estáLogado, parques.novoFormCriarParque);


//rotas dinâmicas
rota.route("/:id")
.get(parques.detalheParque)
.put(estáLogado, validarParque, verificarAutor, parques.gravarEditarParque)
.delete(estáLogado, verificarAutor, parques.apagarParque);

rota.get("/:id/editar", estáLogado, verificarAutor, parques.formEditarParque);


module.exports = rota;