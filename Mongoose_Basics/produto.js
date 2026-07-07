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
        required: true,
        min: [1, "Vender de graça? nope"] //se colocar apenas o 0 a validação é por defeito, para retornar uma mensagem de erro personalizada, usa-se um
                                         //array [valor,mensagem] como neste caso 
    },
    emPromoção: {
        type: Boolean,
        default: false //aqui definimos um valor por defeito para esta propriedade que vai ser "false"
    },
    categorias: [String], //aqui definimos que o valor será um array de strings
    qtd: { //vamos definir um obj nesta propriedade que vai ter os dados sobre as quantidades disponíveis
        online: {
            type: Number,
            default: 0
        },
        naLoja: {
            type: Number,
            default: 0
        }
    },
    tamanho: {
        type: String,
        enum: ["S","M","L"]
    }
});

//criar o modelo
const Produto = new mongoose.model("Produto", produtoSchema);

//esta versão criar erro de validação: "Path `nome` is required."
//const bicicleta = new Produto({preço: 599});

const produtoNovo = new Produto({ nome: "Luvas", preço: 20, categorias: ["segurança","ciclismo"], tamanho: "L" });
//se acrescentar mais alguma propriedade (como {..., cor: "verde"}) não dá erro mas ignora a propriedade,
//apenas cria no MongoDB nome, preço e emPromoção (com valor por defeito de false)

//fx async para criar o documento
const criarProduto = async () => {
    try {
        await produtoNovo.save();
        console.log("produto criado");
    } catch (err) {
        console.log(err);
    }
};

criarProduto();

//para usar a validação ao actualizar um documento, temos que especificar que queremos usar a validação (runValidators: true)
//na parte das opções neste caso do método .findOneAndUpdate()
/* const alterarProduto = async () => {
    try {
        await Produto.findOneAndUpdate({ nome: "Cadeado" }, { preço: -1 }, { returnDocument: "after", runValidators: true });
        console.log("produto actualizado")
    } catch (err) {
        console.log(err)
    }
}

alterarProduto(); */