const express = require("express");
const morgan = require("morgan");
const servidor = express();


servidor.use(morgan("dev"));

servidor.get("/", (req,res) => {
    res.send("Bem vindo!");
})

servidor.get("/gatos", (req,res) => {
    res.send("Miau!");
})




servidor.listen(3000, () => console.log("A ouvir na porta 3000"));