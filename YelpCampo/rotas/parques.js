const express = require("express");
const rota = express.Router();
const passport = require("passport");
//tem que se importar o modelo
const Parque = require("../modelos/parque");
//importar o middleware do verficar o login
const { estáLogado } = require("../middleware.js");
const {validarParque, verificarAutor} = require("../middleware.js");
//importar o multer para lidar com upload de ficheiros pelo formulário
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
//importar os controladores
const parques = require("../controladores/parques.js");


//as rotas estáticas têm de ser colocadas antes das dinâmicas

///rotas estáticas
////user o método .route() para agrupar no mesmo path os vários tipos de pedido http

rota.route("/")
.get(parques.índice)
//.post(estáLogado, validarParque, parques.criarParque);
.post(upload.single("imagem"), (req,res) => {
    res.send(req.body, req.file);
})

rota.get("/novo", estáLogado, parques.novoFormCriarParque);


//rotas dinâmicas
rota.route("/:id")
.get(parques.detalheParque)
.put(estáLogado, validarParque, verificarAutor, parques.gravarEditarParque)
.delete(estáLogado, verificarAutor, parques.apagarParque);

rota.get("/:id/editar", estáLogado, verificarAutor, parques.formEditarParque);


module.exports = rota;