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

//importar rotas
const rotaParques = require("./rotas/parques.js");
const rotaAvaliação = require("./rotas/avaliação.js");

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

///Flash
//middleware do Flash
app.use((req,res,next) => {
    res.locals.sucesso = req.flash("sucesso");
    res.locals.erro = req.flash("erro");
    next();
})


//ROTAS
app.get("/", (req, res) => {
    res.render("home");
})

//rotas parques
app.use("/parques", rotaParques);
//rotas avaliação
app.use("/parques", rotaAvaliação);

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