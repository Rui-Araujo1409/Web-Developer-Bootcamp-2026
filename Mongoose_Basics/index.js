const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


//Importante: para criar uma BD nova no MongoDB tem que se inserir o nome da BD no url da ligação, antes do ?
const conectarMongoBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB2_URI);
        console.log("Conectado ao MongoDB");
        return mongoose;
    } catch (err) {
        console.log(err);
    }
}

conectarMongoBD();

//criar o esquema de dados para cada obj (mongoose.Schema({})), neste caso, filme (o esquema vai indicar quais os tipos de valores as propriedades irão ter)
const filmeSchema = new mongoose.Schema({
    título: String,
    ano: Number,
    pontuação: Number,
    restrição: String,
    emStream: Boolean
});

//depois de criar o esquema temos de criar o modelo (mongoose.model({})), que é uma classe que vai definir uma colecção no MongoDB
//existem dois parâmetros (String, $var com Schema); o nome da var (e da String tem que ter maiúscula inicial)
//depois o mongoose ao enviar os dados, irá criar a colecção, torna o "Filme" em "filmes"
const Filme = mongoose.model("Filme", filmeSchema);

//usar o modelo para criar um obj (Taxi Driver)
/* const taxiDriver = new Filme({
    título: "Taxi Driver",
    ano: 1976,
    pontuação: 8.2,
    restrição: "M/16",
    emStream: true
}); */

//tentar enviar um conjunto de dados, método .insertMany usado no modelo (com a var Filme), não precisa de usar a classe
//é async logo usar cllaback, Promise ou Async Await

/* const listaInserir = [
    {
        título: "2001: Odisseia no espaço",
        ano: 1968,
        pontuação: 8.3,
        restrição: "M/12",
        emStream: true
    },
    {
        título: "Shining",
        ano: 1980,
        pontuação: 8.4,
        restrição: "M/16",
        emStream: true
    },
    {
        título: "Joker",
        ano: 2019,
        pontuação: 8.3,
        restrição: "M/14",
        emStream: true
    },
    {
        título: "Donnie Darko",
        ano: 2001,
        pontuação: 8.0,
        restrição: "M/16",
        emStream: false
    }
]
 */
// a fx com o async await
/* const inserirFilmesMongoDB = async () => {
    try {
        const dados = await Filme.insertMany(listaInserir);
        console.log("Funcionou");
        console.log(dados);
    } catch(err) {
        console.log(err);
    }
}

inserirFilmesMongoDB(); */

//para alterar um documento (o primeiro que satisfaz a query do título)
//await Filme.updateOne({título: "Shining"}, {emStream: false})

//para alterar vários documentos (usar o operador $in do Mongo)
// await Filme.updateMany({título: {$in:["2001: Odisseia no espaço", "Donnie Darko"]}}, {pontuação: 8.5})


//para encontrar e alterar um documento (no video ele não usa o $set), pelos vistos as versões mais recentes do mongoose, o método dele não funciona?
//a opção {returnDocument: 'after'} serve para retornar o objecto novo (por defeito retorna o antigo)
//await Filme.findOneAndUpdate({título: "Shining"},{pontuação: 8.5},{returnDocument: 'after'});

//para encontrar um documento e apagar (retorna um objecto com o documento apagado)
//await Filme.findOneAndDelete({título: "Taxi Driver"})