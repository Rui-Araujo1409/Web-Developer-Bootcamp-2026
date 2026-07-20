const estáLogado = (req,res,next) => {
    //o Passport insere automaticamente no req obj uma propriedade (user)
    //console.log("Req.user...", req.user);
        if (!req.isAuthenticated()) {
        req.flash("erro", "Tem de estar autenticado.");
        return res.redirect("/utilizador/entrar");
    }
    next();
};

module.exports = estáLogado;