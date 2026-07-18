const express = require("express");
const servidor = express();
const sessão = require("express-session");

servidor.use(sessão({
    secret: "nikita",
    resave: false, //o default é true mas a config default está obsoleta
    saveUninitialized: false  //idem
}));

servidor.get("/contadorvisitas", (req,res) => {
    req.session.contar ? req.session.contar +=1 : req.session.contar = 1;
    res.send(`Você viu esta página ${req.session.contar} vezes`);
})

servidor.get("/registrar", (req,res) => {
    const {utilizador = "Anónimo"} = req.query;
    req.session.utilizador = utilizador;
    res.redirect("/acolher");
})

servidor.get("/acolher", (req,res) => {
    const {utilizador} = req.session;
    res.send(`Bem vindo, ${utilizador}`);
})


servidor.listen(3000, () => console.log("Servir porta 3000"));