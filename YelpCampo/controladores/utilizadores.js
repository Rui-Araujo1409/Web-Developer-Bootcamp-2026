const Utilizador = require("../modelos/utilizador");
const passport = require("passport");


 const formNovoUtilizador = (req, res) => {
    res.render("utilizadores/registrar");
}

const criarNovoUtilizador = async (req, res, next) => {
    //opcional, construir o try catch para o caso do utilizador já existir
    //usar um flash em vez de apresentar uma página de erro
    try {
        const { email, utilizador, password } = (req.body);
        const novoUtilizador = new Utilizador({ email, username: utilizador });
        const utilizadorRegistrado = await Utilizador.register(novoUtilizador, password);
        //se correr tudo bem...
        ///agora o código para fazer o login automático quando alguém se registra
        ///o método helper tem que ter um callback para os erros
        req.login(utilizadorRegistrado, err => {
            if (err) return next(err);
            req.flash("sucesso", "Bemvindo ao YelpCampo!");
            res.redirect("/parques");
        })
    } catch (e) {
        req.flash("error", e.message) //o flash vai mostrar a mensagem que vem com o obj erro
        //redireccionar para o registro
        res.redirect("/utilizador/registrar");
    }
}

const formLogin = (req, res) => {
    res.render("utilizadores/entrar");
}

const autenticarUtilizador = (req, res) => {
    const regressarUrl = res.locals.regressarUrl || "/";
    req.flash("sucesso", "Bem vindo de volta!");
    res.redirect(regressarUrl);
}

const logout = (req, res, next) => {
    //a versão do video (540 Adding logout) só usa o logout();
    //mas houve alterações no Passport e agora tem que haver um callback
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("sucesso", "Até à próxima.");
        res.redirect("/parques");
    })
}


module.exports = {
formNovoUtilizador,
criarNovoUtilizador,
formLogin,
autenticarUtilizador,
logout
}