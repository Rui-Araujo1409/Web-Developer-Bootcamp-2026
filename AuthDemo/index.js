const express = require("express");
const servidor = express();
const bcrypt = require("bcrypt");
const path = require("path");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const sessão = require("express-session");
const Utilizador = require("./modelos/utilizador")

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

servidor.use(express.urlencoded({ extended: true }));
servidor.use(express.json());
servidor.set("views", path.join(__dirname, "views"));
servidor.set("view engine", "ejs");

servidor.use(sessão({
    secret: "esteéosegredo",
    resave: false, //o default é true mas a config default está obsoleta
    saveUninitialized: false  //idem
}));

//Middleware para verificar se está logado
const requerLogin = (req,res,next) => (!req.session.utilizador_id) ? res.redirect("/entrar") : next();


//rotas estáticas

servidor.get("/", (req, res) => {
    res.send("Homepage!")
})

servidor.get("/registrar", (req, res) => {
    res.render("registrar");
})

servidor.get("/entrar", (req, res) => {
    res.render("entrar");
})


servidor.post("/registrar", async (req, res) => {
    const { utilizador, pass } = req.body;
    //const passEncriptada = await bcrypt.hash(pass, 12); //podemos passar a encriptação para o modelo
    const novoUtilizador = new Utilizador({ nome: utilizador, password: pass});
    await novoUtilizador.save();
    console.log(novoUtilizador);
    //quando se resgistra o _id do Utilizador fica gravado na sessão
    req.session.utilizador_id = novoUtilizador._id;
    res.redirect("/");
})

servidor.post("/entrar", async (req, res) => {
    const { utilizador, pass } = req.body;
/*     const utilizadorVerificar = await Utilizador.findOne({ nome: utilizador });
    const verificaçãoPass = await bcrypt.compare(pass, utilizadorVerificar.password); */
    //depois de criar o método estático no modelo
   const utilizadorEncontrado = await Utilizador.encontrarEValidar(utilizador, pass);
    if (!utilizadorEncontrado) {
        res.redirect("/entrar");
    } else {
        req.session.utilizador_id = utilizadorEncontrado._id;
        res.redirect("/segredo");
    };
})

//rota para o logout, que é apenas tornar a propriedade utilizador_id nula
servidor.post("/sair", (req, res) => {
    req.session.utilizador_id = null;
    //req.session.destroy(); //este método destrói a sessão
    res.redirect("/");
})

servidor.get("/segredo", requerLogin, (req, res) => {
   // (req.session.utilizador_id) ? res.render("segredo") : res.redirect("/entrar"); //se autenticado aparece o formulário para o logout
   //com o middleware requerLogin não preciso de colocar o if else anterior, só o render
   res.render("segredo");
})

servidor.get("/maissegredo", requerLogin, (req, res) => {
   // (req.session.utilizador_id) ? res.render("segredo") : res.redirect("/entrar"); //se autenticado aparece o formulário para o logout
   //com o middleware requerLogin não preciso de colocar o if else anterior, só o render
   res.render("segredo");
})


servidor.listen(3000, () => console.log("servir na porta 3000"));