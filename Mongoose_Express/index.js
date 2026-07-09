const express = require("express");
const app = express();
const methodOverride = require("method-override");
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
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//criar a rota para ter a lista de todos os produtos
//como a consulta ao MongoDB demora, a alternativa é criar uma
//fx async para receber o pedido, este é o padrão para as consultas à BD
app.get("/produtos", async (req, res) => {
    const produtos = await Produto.find({});
    res.render("produtos/index", { produtos });
})

//rota para o form para criar um novo produto
app.get("/produtos/novo", (req,res) => {
    res.render("produtos/novo");
})

// a rota para oo pedido de criar o produto à BD implica async
app.post("/produtos", async (req, res) => {
    const novoProduto = new Produto(req.body);
    console.log(novoProduto);
    await novoProduto.save();
    res.redirect(`/produtos/${novoProduto._id}`);
})

//assim que o path tem :id as rotas seguintes com o mesmo
//padrão (neste caso /produtos/) têm que usar o :id
//rota para ver detalhes do produto
app.get("/produtos/:id", async (req, res) => {
    const {id} = req.params;
    const produto = await Produto.findById(id);
    res.render("produtos/detalhe", {produto});
})

//rota para o form para editar
app.get("/produtos/:id/editar", async (req,res) => {
    const {id} = req.params;
    const produto = await Produto.findById(id);
    res.render("produtos/editar", {produto});
})

//rota para inserir a alteração no MongoDB
app.put("/produtos/:id", async (req,res) => {
    const {id} = req.params;
    const produto = await Produto.findByIdAndUpdate(id, req.body, {runValidators: true, returnDocument:'after'});
    res.redirect(`/produtos/${produto._id}`);
})






app.listen(3000, () => console.log("ligado na porta 3000"));