const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const Produto = require("./Modelos/produto");

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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//criar a rota para ter a lista de todos os produtos
//como a consulta ao MongoDB demora, a alternativa é criar uma
//fx async para receber o pedido, este é o padrão para as consultas à BD
app.get("/produtos", async (req, res) => {
    const produtos = await Produto.find({});
    res.render("produtos/index", {produtos});
})










app.listen(3000, () => console.log("ligado na porta 3000"));