const Utilizador = require("../modelos/utilizador");
const express = require("express");
const rota = express.Router();
const passport = require("passport");
const { guardarUrlOriginal } = require("../middleware.js");
const utilizadores = require("../controladores/utilizadores.js");

//rotas para criar o utilizador



rota.route("/registrar")
.get(utilizadores.formNovoUtilizador)
.post(utilizadores.criarNovoUtilizador);

//rotas para o login do utilizador
rota.route("/entrar")
.get(utilizadores.formLogin)
.post(guardarUrlOriginal, passport.authenticate("local", {  //a rota para autenticar não precisa de async/await, é tudo feito pelo passport
    failureFlash: true,
    failureRedirect: "/utilizador/entrar",
}), utilizadores.autenticarUtilizador);

//rota para o logout
rota.get("/sair", utilizadores.logout);

module.exports = rota;