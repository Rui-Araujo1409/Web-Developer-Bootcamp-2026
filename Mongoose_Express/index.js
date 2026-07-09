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

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//criar a rota para ter a lista de todos os produtos
//como a consulta ao MongoDB demora, a alternativa é criar uma
//fx async para receber o pedido, este é o padrão para as consultas à BD
app.get("/produtos", async (req, res) => {
    const produtos = await Produto.find({});
    res.render("produtos/index", { produtos });
})

app.get("/produtos/novo", (req,res) => {
    res.render("produtos/novo");
})



//o pedido de criar o produto à BD implica async
app.post("/produtos", async (req, res) => {
    const novoProduto = new Produto(req.body);
    console.log(novoProduto);
    await novoProduto.save();
    res.redirect(`/produtos/${novoProduto._id}`);
})


//assim que o path tem :id as rotas seguintes com o mesmo
//padrão (neste caso /produtos/) têm que usar o :id
app.get("/produtos/:id", async (req, res) => {
    const {id} = req.params;
    const produto = await Produto.findById(id);
    res.render("produtos/detalhe", {produto});
})

app.get("/produtos/:id/editar", async (req,res) => {
    const {id} = req.params;
    const produto = await Produto.findById(id);
    res.render("produtos/editar", {produto});
})







app.listen(3000, () => console.log("ligado na porta 3000"));