const express = require("express");
const rota = express.Router();

//aqui vou construir todas as rotas que dizem respeito ao abrigo
///rota para todos os abrigos
rota.get("/", (req,res) => {
    res.send("Todos os abrigos");
})

rota.post("/", (req,res) => {
    res.send("Criar um abrigo");
})

rota.get("/:id", (req, res) => {
    res.send("Ver um abrigo");
})

rota.get("/:id/editar", (req,res) => {
    res.send("Editar um abrigo");
})

rota.delete("/:id", (req,res) => {
    res.send("Apagar um abrigo");
})

//depois temos de exportar a routa
module.exports = rota;