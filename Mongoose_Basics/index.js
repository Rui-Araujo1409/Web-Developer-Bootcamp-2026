const mongoose = require("mongoose");

const conectarMongoBD = async () => {
    try {
        await mongoose.connect("mongodb+srv://rui1409_db_user:5zUk18Kz4KlyTwp2@cluster0.xkdudas.mongodb.net/?appName=Cluster0/BDfilmes");
        console.log("Conectado ao MongoDB");
        return mongoose;
    } catch(err) {
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
const Filme = mongoose.model("Filme", filmeSchema);

//usar o modelo para criar um obj (Taxi Driver)
const taxiDriver = new Filme({
    título: "Taxi Driver",
    ano: 1976,
    pontuação: 8.2,
    restrição: "M/16",
    emStream: true
});