const express = require("express");
const servidor = express();
const sessão = require("express-session");

servidor.use(sessão({
    secret: "nikita",
    resave: true, //o default é true mas a config default está obsoleta
    saveUninitialized: true  //idem
}));

servidor.get("/contadorvisitas", (req,res) => {
    req.session.contar ? req.session.contar +=1 : req.session.contar = 1;
    res.send(`Você viu esta página ${req.session.contar} vezes`);
})




servidor.listen(3000, () => console.log("Servir porta 3000"));