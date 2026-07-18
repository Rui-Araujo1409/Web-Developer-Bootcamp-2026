const express = require("express");
const servidor = express();
const bcrypt = require("bcrypt");
const path = require("path");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Utilizador = require("./modelos/utilizador")

const conectarMongoBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado ao MongoDB");
        return mongoose;
    } catch (err) {
        console.log("Erro na ligação ao MongoDB")
        console.log(err);
    }
}

conectarMongoBD();

servidor.use(express.urlencoded({ extended: true }));
servidor.use(express.json());
servidor.set("views", path.join(__dirname, "views"));
servidor.set("view engine", "ejs");

//rotas estáticas

servidor.get("/", (req,res) => {
    res.send("Homepage!")
})

servidor.get("/registrar", (req,res) => {
    res.render("registrar");
})

servidor.get("/segredo", (req,res) =>{
    res.send("Isto é o segredo, tem que estar logado");
})

servidor.post("/registrar", async (req,res) => {
const {utilizador, pass} = req.body;
const passEncriptada = await bcrypt.hash(pass, 12); 
const novoUtilizador = new Utilizador({nome: utilizador, password: passEncriptada});
//await novoUtilizador.save();
console.log(novoUtilizador);
res.redirect("/");
})




servidor.listen(3000, () => console.log("servir na porta 3000"));