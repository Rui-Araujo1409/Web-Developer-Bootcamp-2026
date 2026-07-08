const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/teste", (req,res) => {
    res.send("testado com sucesso");
})








app.listen(3000, () => console.log("ligado na porta 3000"));