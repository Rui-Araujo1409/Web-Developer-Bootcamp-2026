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

app.get("/parques", async (req, res) => {
    const parques = await Parque.find({});
    res.render("parques/index", { parques });
})

app.get("/parques/:id", async (req, res) => {
    const id = req.params.id
    const parque = await Parque.findById(id);
    res.render("parques/detalhe", { parque });
})

app.get("/novo", (req, res) => {
    res.render("parques/novo");
})

app.post("/parques", async (req, res) => {
    const novoParque = new Parque(req.body);
    await novoParque.save();
    res.redirect(`/parques/${novoParque._id}`);
})

app.get("/parques/:id/editar", async (req, res) => {
    const id = req.params.id;
    const parqueActual = await Parque.findById(id);
    res.render("parques/editar", { parqueActual });
})

app.put("/parques/:id", async (req, res) => {
    const id = req.params.id;
    const parqueEditado = await Parque.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' });
    res.redirect(`/parques/${parqueEditado._id}`);
})

app.delete("/parques/:id", async (req,res) => {
const id = req.params.id;
const parqueEliminar = await Parque.findByIdAndDelete(id);
res.render("parques/apagar");
})

app.listen(3000, () => console.log("Conectado na porta 3000"));