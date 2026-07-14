//este modelo apresenta a relação de um para muitos

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//desconstrução do Schema do mongoose para uma var
const {Schema} = mongoose;

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

//definir o modelo dos "filhos" ou seja dos que vão ser muitos, os produtos

const produtoSchema = new Schema({
    nome: String,
    preço: Number,
    estação: {
        type: String,
        enum: ["Primavera", "Verão", "Outono", "Inverno"]
    }
});

//definir o esquema e modelo do "pai", a quinta

const quintaSchema = new Schema({
    nome: String,
    localidade: String,
    //aqui vou apontar esta propriedade para um ObjectId dentro do Schema (por extenso seria mongoose.Schema.Types.ObjectId)
    //e tenho que colocar uma propriedade ref que vai apontar para uma colecção no MongoDB
    produtos: [{type: Schema.Types.ObjectId, ref: "Produto"}]
})


//definir os modelos
const Produto = mongoose.model("Produto", produtoSchema);

const Quinta = mongoose.model("Quinta", quintaSchema);

/* Produto.insertMany([
    {
    nome: "Melão verde",
    preço: 5,
    estação: "Verão"
},{
    nome: "Melão branco",
    preço: 3,
    estação: "Verão"
},
{
    nome: "Meloa",
    preço: 4,
    estação: "Primavera"
}
]) */


const criarQuinta = async () => {
const quinta = await new Quinta({nome: "Quinta das Vacas", localidade: "Alguidar de Baixo"});
const melão = await Produto.findOne({nome: "Melão branco"});
quinta.produtos.push(melão);
await quinta.save();
console.log(quinta);
}

//criarQuinta();


const criarProduto = async (nome, preço) => {
    const quinta = await Quinta.findOne({nome: "Quinta das Vacas"})
    const uva = await new Produto({nome , preço});
    quinta.produtos.push(uva);
    quinta.save()
};

//criarProduto("Uva branca", 6);

//no console (apenas se vê os IDs dos produtos)
//se quisermos ver toda a info do produto temos de usar o método .populate(),
//com a referência (ref) da propriedade a que queremos apontar, aqui .populate(produtos)
const encontrarQuinta = async (nome) => {
    const quinta = await Quinta.findOne({nome}).populate("produtos");
    console.log(JSON.stringify(quinta, null, 2));
}

encontrarQuinta("Quinta das Vacas");


