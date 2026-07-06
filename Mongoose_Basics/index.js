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
