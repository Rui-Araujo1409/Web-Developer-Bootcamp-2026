const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const methodOverride = require("method-override");
const path = require("path");
const morgan = require("morgan");
const engine = require("ejs-mate");
const Parque = require("./modelos/parque");
const AppErros = require("./utils/appErros");
const Joi = require("joi"); //
const { parqueEsquema, avaliaçãoEsquema } = require("./esquemaJoi.js");
const Avaliação = require("./modelos/avaliações.js");
const sessão = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("passport-local");
const Utilizador = require("./modelos/utilizador.js");


//importar rotas
const rotaParques = require("./rotas/parques.js");
const rotaAvaliação = require("./rotas/avaliação.js");
const rotaUtilizador = require("./rotas/utilizador.js");

//CONEXÂO ao MONGODB
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
//parece servir para ouvir eventos na ligação e lidar com erros
//será que a fx anterior chega?
const db = mongoose.connection;
db.on("erro", console.error.bind(console, "erro de conexão:"));
db.once("aberta", () => {
    console.log("BD conectada");
})

conectarMongoBD();

//MIDDLEWARE
app.engine("ejs", engine);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(flash());
morgan("tiny");
app.use(express.static(path.join(__dirname, "public"))); //middleware para servir os items estáticos

///Sessão
const sessãoConfig = {
    secret: "nikita",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60* 24 * 7,
        maxAge: 1000 * 60 * 60* 24 * 7,
    }
}

app.use(sessão(sessãoConfig));




///PASSPORT (tem que estar depois do middleware da sessão)
app.use(passport.initialize()); //para injectar o passport dentro do obj req, sem isto o resto não funciona
app.use(passport.session()); //para usar a estratégia com sessões com login persistentes (para não obrigar o utilizador a ter de fazer logins constantes)
//vamos dizer ao passport para usar a estratégia local com o modelo que criamos
//sendo que o método authenticate() vem com o passport-local-mongoose
passport.use(new passportLocal(Utilizador.authenticate()));
//agora vamos dizer ao passport para usar o username nas sessões
passport.serializeUser(Utilizador.serializeUser()); //para guardar um user na sessão, os métodos são do passport-local-mongoose (não do passport, mas dá confusão...)
passport.deserializeUser(Utilizador.deserializeUser()); //para retirar um user da sessão

///Flash
//middleware do Flash e Passport
app.use((req,res,next) => {
    res.locals.utilizadorCorrente = req.user;
    res.locals.sucesso = req.flash("sucesso");
    res.locals.error = req.flash("error"); //aqui tem de ser "error" por causa do flashFailure do passport.authenticate, com "erro" a mensagem não aparece
    next();
})

//ROTAS


/* app.use("/criarutilizador", async (req,res) => {
    //criar utilizador, com email e um username (que não está no esquema base, mas no passportLocal)
    const utilizador = new Utilizador({email: "nada@gmail.com", username : "rui"}); //tem que ser username!!
    //agora vou usar o método register para criar uma pass encriptada para esse utilizador
    const novoUtilizador = await Utilizador.register(utilizador, "nikita");
    //ver o que dá?
    res.send(novoUtilizador);
}) */

//Rerouting das rotas parques
app.use("/parques", rotaParques);
//Rerouting das rotas avaliação
app.use("/parques", rotaAvaliação);
//Rerouting das rotas utilizadores
app.use("/utilizador", rotaUtilizador);

app.get("/", (req, res) => {
    res.render("home");
})

//Middleware para os erros
app.all("/{*path}", (req, res, next) => {
    next(new AppErros("Página não encontrada", 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Algo correu mal..." } = err;
    res.status(statusCode).render("erros", { message, statusCode });
})


//Abrir servidor
app.listen(3000, () => console.log("Conectado na porta 3000"));