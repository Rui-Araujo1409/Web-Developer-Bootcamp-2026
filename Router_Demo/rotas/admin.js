const express = require("express");
const rota = express.Router();

//se queremos restringir o acesso a esta rota a uma query no url (exemplo: isAdmin)
//o middleware tem que estar aqui, pois se o colocarmos no index.js
//a lógica irá se aplicar a todas as rotas pedidas (abrigos e gatos)
//e se não tiverem no url a query com o isAdmin, vão falhar
rota.use((req,res,next) => {
    if(req.query.isAdmin) {
        next();
    } else {
        res.send("Nope, não és admin");
    }
})

rota.get("/segredo", (req,res) => {
    res.send("é o segredo");
})

rota.get("/apagartudo", (req,res) => {
    res.send("A apagar TUDO!!");
})




module.exports = rota;