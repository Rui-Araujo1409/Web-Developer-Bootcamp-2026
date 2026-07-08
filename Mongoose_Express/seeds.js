//Este ficheiro serve para fazer acções no MongoBD de forma isolada
//do index.js

const mongoose = require("mongoose");
const Produto = require("./Modelos/produto");
const dotenv = require("dotenv").config();

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

/* const produto1 = new Produto({
    nome: "Tangerina",
    preço: 10,
    categoria: "fruta"
}); */

/* const criarProduto1 = async () => {
    try {
        await produto1.save();
        console.log("O produto foi inserido");
    } catch (err) {
        console.log(err);
    }
}

criarProduto1(); */

const listaProdutos = [
    { nome: "Leite", preço: 1, categoria: "lacticínios" }, 
    { nome: "Tomates", preço: 2, categoria: "vegetais" }, 
    { nome: "Couves", preço: 3, categoria: "Vegetais" }, 
    { nome: "Melão", preço: 1.5, categoria: "fruta" }
];



const inserirProdutosIniciais = async () => {
    try {
        const dados = await Produto.insertMany(listaProdutos);
        console.log("Funcionou");
        console.log(dados);
    } catch(err) {
        console.log(err);
    }
};

inserirProdutosIniciais();