const estáLogado = (req, res, next) => {
    //o Passport insere automaticamente no req obj uma propriedade (user)
    //console.log("Req.user...", req.user);

    if (!req.isAuthenticated()) {
        req.session.regressarUrl = req.originalUrl;
        req.flash("erro", "Tem de estar autenticado.");
        return res.redirect("/utilizador/entrar");
    }
    next();
};

//middleware para guardar o url original em res.locals (o Passport agora limpa a sessão depois de um login)
const guardarUrlOriginal = (req, res, next) => {
    if (req.session.regressarUrl) {
        res.locals.regressarUrl = req.session.regressarUrl;
    }
    next();
}

module.exports = {
    estáLogado,
    guardarUrlOriginal
};