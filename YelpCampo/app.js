const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const methodOverride = require("method-override");
const path = require("path");
const Parque = require("./modelos/parque");


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

//este bloco não aparece na secção do Mongoose do curso
//parece servir apra ouvir eventos na ligação e lidar com erros
//será que a fx anterior chega?
const db = mongoose.connection;
db.on("erro", console.error.bind(console, "erro de conexão:"));
db.once("aberta", () => {
    console.log("BD conectada");
})



conectarMongoBD();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("home");
})

app.get("/criarparque", async (req, res) => {
    const novoParque = new Parque({ título: "Zambujeira", preço: "50€", descrição: "Parque da aldeia da Zambujeira do Mar, perto de onde se fazia o festival Sudoeste", localização: "Zambujeira do mar" });
    await novoParque.save();
    res.send("Campo criado");
})


app.listen(3000, () => console.log("Conectado na porta 3000"));