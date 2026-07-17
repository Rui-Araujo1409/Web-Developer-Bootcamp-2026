const express = require("express");
const rota = express.Router();

rota.get("/", (req,res) => {
    res.send("Ver todos os gatos");
})

rota.post("/", (req,res) => {
    res.send("Adicionar um gato");
})

rota.get("/:id", (req, res) => {
    res.send("Ver um gato");
})

rota.get("/:id/editar", (req,res) => {
    res.send("Editar um gato");
})

rota.delete("/:id", (req,res) => {
    res.send("Tirar um gato");
})

module.exports = rota;