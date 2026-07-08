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
        enum: ["S", "M", "L"]
    }
});


//Instance Methods => métodos criados por nós, mas em vez dos Model Methods que são usados numa classe
//(nos exemplos abaixo, algo como Product.findOne(xxxx), o .findOne() é usado na classe)
//aqui o método que definimos é usado numa instância da classe, ou seja, numa instância da classe Produto
//seja uma bicicleta, capacete, etc... e é definido em cima do Schema => xxSchema.methods.<nome do método> = function () {}
//ou mesmo no esquema exemplo: new Schema({nome: String}, {methods: {dizerAlgo() {console.log("Dizer Algo")}}})
//nota, tem que ser uma declaração de fx tradicional por causa do "this" e tem de estar ANTES da definição do modelo!!
produtoSchema.methods.apresentarSaldo = function () {
    console.log(`O produto ${this.nome} com o preço de ${this.preço}€ está com promoção de 20%!`);
}

//agora um método para a instância mas que faz um pedido ao MongoDB, neste caso um .save()
//para guardar a alteração ao produto, estes métodos servem para criar docs, editar docs, apagar em massa
produtoSchema.methods.adicionarCategoria = function (novaCategoria) {
    this.categorias.push(novaCategoria);
    this.save();
    console.log("categoria alterada");
}

//Static Methods => métodos que se aplicam a todo um modelo (e não a uma instância de um modelo, como os Instance Models)
//declaram-se de forma semelhante, aqui o método vai se aplicar a todos os documentos do modelo
//não precisa de se criar um fx para pesquisar um documento em particular, logo a fx é async
produtoSchema.statics.colocarPromoção = async function () {
    try {
        //usar "this" em vez de especificar o modelo
        await this.updateMany({}, { emPromoção: true, preço: 0 });
        console.log("As promoções foram inseridas");
    } catch (err) {
        console.log(err);
    }
}

//outra fx para retornar os objectos que são "capacete"
produtoSchema.statics.encontrarCapacete = async function () {
    try{
const capacetes = await this.find({nome: "Capacete"});
console.log(capacetes);
    } catch(err) {
        console.log(err)
    }
}


//criar o modelo
const Produto = new mongoose.model("Produto", produtoSchema);

//esta versão criar erro de validação: "Path `nome` is required."
//const bicicleta = new Produto({preço: 599});

//const produtoNovo = new Produto({ nome: "Luvas", preço: 20, categorias: ["segurança", "ciclismo"], tamanho: "L" });
//se acrescentar mais alguma propriedade (como {..., cor: "verde"}) não dá erro mas ignora a propriedade,
//apenas cria no MongoDB nome, preço e emPromoção (com valor por defeito de false)

//fx async para criar o documento
/* const criarProduto = async () => {
    try {
        await produtoNovo.save();
        console.log("produto criado");
    } catch (err) {
        console.log(err);
    }
};

criarProduto(); */

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


//fx async para pesquisar um produto em específico e depois aplicar o método (.apresentarSaldo()) à instância
/* const pesquisarProdutoSaldo = async () => {
    try {
        const produtoEncontrado = await Produto.findOne({ nome: "Luvas" });
        produtoEncontrado.apresentarSaldo();
    } catch (err) {
        console.log(err);
    }
}

pesquisarProdutoSaldo(); */

//fx async para usar o método à instância (.adicionarCategoria())
/* const pesquisarProdutoCategoria = async () => {
    try {
        const produtoEncontrado = await Produto.findOne({ nome: "Cadeado" });
        //como o método faz um pedido ao MongoDB (pelo .save()) e isso demora, tem que ter um await
        await produtoEncontrado.adicionarCategoria("protecção");
        console.log(produtoEncontrado);
    } catch (err) {
        console.log(err);
    }
}

pesquisarProdutoCategoria(); */

//chamar a fx método estático
///Produto.colocarPromoção();

//a 2ª fx método estáttico
//Produto.encontrarCapacete();