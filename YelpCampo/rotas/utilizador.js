const Utilizador = require("../modelos/utilizador");
const express = require("express");
const rota = express.Router();
const passport = require("passport");

//rotas para criar o utilizador
rota.get("/registrar", (req, res) => {
    res.render("utilizadores/registrar");
})

rota.post("/registrar", async (req, res) => {
    //opcional, construir o try catch para o caso do utilizador já existir
    //usar um flash em vez de apresentar uma página de erro
    try {
        const { email, utilizador, password } = (req.body);
        const novoUtilizador = new Utilizador({ email, username: utilizador });
        const utilizadorRegistrado = await Utilizador.register(novoUtilizador, password);
        //se correr tudo bem...
        req.flash("sucesso", "Bemvindo ao YelpCampo!");
        res.redirect("/parques");
    } catch (e) {
        req.flash("error", e.message) //o flash vai mostrar a mensagem que vem com o obj erro
        //redireccionar para o registro
        res.redirect("/utilizador/registrar");
    }
})

//rotas para o login do utilizador
rota.get("/entrar", (req, res) => {
    res.render("utilizadores/entrar");
})

//a rota para autenticar não precisa de async/await, é tudo feito pelo passport
rota.post("/entrar", passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/utilizador/entrar",
}), (req, res) => {
    req.flash("sucesso", "Bem vindo de volta!");
    res.redirect("/");
})

rota.get("/sair", (req, res, next) => {
    //a versão do video (540 Adding logout) só usa o logout();
    //mas houve alterações no Passport e agora tem que haver um callback
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("sucesso", "Até à próxima.");
        res.redirect("/parques");
    })

})

module.exports = rota;