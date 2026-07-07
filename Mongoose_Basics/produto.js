const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


//Conexão ao MongoDB
//Importante: para criar uma BD nova no MongoDB tem que se inserir o nome da BD no url da ligação, antes do ?
const conectarMongoBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado ao MongoDB");
        return mongoose;
    } catch (err) {
        console.log(err);
    }
}

conectarMongoBD();

//definir o esquema com validações
const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    preço: {
        type: Number, //aqui a validação não é estrita, aceita 599 ou "599", rejeita "asdassda"
        required: true
    }
});

//criar o modelo
const Produto = new mongoose.model("Produto", produtoSchema);

//esta versão criar erro de validação: "Path `nome` is required."
//const bicicleta = new Produto({preço: 599});

const bicicleta = new Produto({nome: "BTT", preço: 999});
//se acrescentar mais alguma propriedade (como {..., cor: "verde"}) não dá erro mas ignora a propriedade,
//apenas cria no MongoDB nome e preço 

//fx async para criar o documento
/* const criarBicicleta = async () => {
    try {
        await bicicleta.save();
        console.log("bicicleta criada");
    } catch(err) {
        console.log(err);
    } 
};*/
