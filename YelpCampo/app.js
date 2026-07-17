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

app.engine("ejs", engine);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//fx para a validação, aqui tem de se acrescentar o next() para o fluxo continuar
const validarParque = (req, res, next) => {
    {
        //depois passamos o esquema para o seu próprio ficheiro
        /*   const parqueEsquema = Joi.object({
          título: Joi.string().required(),
          localização: Joi.string().required(),
          preço: Joi.number().required().min(10),
          imagem: Joi.string().required(),
          descrição: Joi.string().required()
      }) */
        //retirar o obj error da validação
        const { error } = parqueEsquema.validate(req.body);
        if (error) {
            //o retorno de error.details é um array, constroi-se uma string com o retorno
            const msg = error.details.map((item) => item.message).join(",");
            return next(new AppErros(msg, 400));
        } else {
            next();
        }
    }
}

const validarAvaliação = (req,res,next) => {
    const {error} = avaliaçãoEsquema.validate(req.body);
    if(error) {
        const msg = error.details.map((item) => item.message).join(",");
        return next(new AppErros(msg, 400));
    } else {
        next();
    }
}

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/parques", async (req, res) => {
    const parques = await Parque.find({});
    res.render("parques/index", { parques });
})

app.get("/parques/:id", async (req, res, next) => {
    const id = req.params.id
    const parque = await Parque.findById(id).populate("avaliações");
    if (!parque) { next(new AppErros("Parque não existe", 404)); };
    res.render("parques/detalhe", { parque });
})

app.get("/novo", (req, res) => {
    res.render("parques/novo");
})

app.post("/parques", validarParque, async (req, res, next) => {
    //construir o esquema com o Joi
    //para o primeiro exemplo construi-se o esquema dentro da routa
    //mas como se quer reutilizar o melhor é criar uma fx (ver mais acima)
    /*  const parqueEsquema = Joi.object({
         título: Joi.string().required(),
         localização: Joi.string().required(),
         preço: Joi.number().required().min(10),
         imagem: Joi.string().required(),
         descrição: Joi.string().required()
     })
     //retirar o obj error da validação
     const  {error} = parqueEsquema.validate(req.body);
     if(error) {
         //o retorno de error.details é um array, constroi-se uma string com o retorno
         const msg = error.details.map((item) => item.message).join(",");
        return next(new AppErros(msg, 400));
     }  */
    const novoParque = new Parque(req.body);
    await novoParque.save();
    res.redirect(`/parques/${novoParque._id}`);
})

app.get("/parques/:id/editar", async (req, res) => {
    const id = req.params.id;
    const parqueActual = await Parque.findById(id);
    res.render("parques/editar", { parqueActual });
})

app.put("/parques/:id", validarParque, async (req, res) => {
    const id = req.params.id;
    const parqueEditado = await Parque.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' });
    res.redirect(`/parques/${parqueEditado._id}`);
})

app.delete("/parques/:id", async (req, res) => {
    const id = req.params.id;
    const parqueEliminar = await Parque.findByIdAndDelete(id);
    res.render("parques/apagar");
})

app.post("/parques/:id/avaliacao", validarAvaliação, async (req, res) => {
    const { id } = req.params;
    const parque = await Parque.findById(id);
    const avaliação = new Avaliação(req.body);
    parque.avaliações.push(avaliação);
    await avaliação.save();
    await parque.save();
    res.redirect(`/parques/${id}`);
})

app.delete("/parques/:id/avaliacao/:avaliacaoId", async (req,res) => {
    //para usar dois IDs no url tem que se dar nomes diferentes
    const {id, avaliacaoId} = req.params;
    //o operador $pull retira de um array o(s) valor(es) que satisfaçam uma condição
    //neste caso vai ao array da propriedade "avaliações" e retira a instância com o avaliacaoId
    await Parque.findByIdAndUpdate(id, {$pull:{avaliações: avaliacaoId}}); 
    await Avaliação.findByIdAndDelete(avaliacaoId); 
    res.redirect(`/parques/${id}`);
})

app.all("/{*path}", (req, res, next) => {
    next(new AppErros("Página não encontrada", 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Algo correu mal..." } = err;
    res.status(statusCode).render("erros", { message, statusCode });
})

app.listen(3000, () => console.log("Conectado na porta 3000"));