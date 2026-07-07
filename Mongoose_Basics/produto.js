const mongoose = require("mongoose");
const dotenv = require("dotenv");


//Conexão ao MongoDB
//Importante: para criar uma BD nova no MongoDB tem que se inserir o nome da BD no url da ligação, antes do ?
const conectarMongoBD = async () => {
    try {
        await mongoose.connect("mongodb+srv://rui1409_db_user:5zUk18Kz4KlyTwp2@cluster0.xkdudas.mongodb.net/BDfilmes?appName=Cluster0");
        console.log("Conectado ao MongoDB");
        return mongoose;
    } catch (err) {
        console.log(err);
    }
}

conectarMongoBD();