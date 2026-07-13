const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Joi = require("joi");

const Produto = require("./Modelos/produto");
const AppErros = require("../Express_Erros/appErro");

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//este array serve par criar dinâmicamente as opções das categorias
//no html da view novo
const categorias = ["fruta", "vegetais", "lacticínios", "frutos secos"];

//criar a rota para ter a lista de todos os produtos
//como a consulta ao MongoDB demora, a alternativa é criar uma
//fx async para receber o pedido, este é o padrão para as consultas à BD
app.get("/produtos", async (req, res) => {
    //adicionar a lógica para consultar por categorias
    const { categoria } = req.query;
    if (categoria) {
        const produtos = await Produto.find({ categoria });
        res.render("produtos/index", { produtos, categoria });
    } else {
        const produtos = await Produto.find({});
        res.render("produtos/index", { produtos, categoria: "Todos os produtos" });
    }

})

//rota para o form para criar um novo produto
app.get("/produtos/novo", (req, res) => {
    //throw new AppErros("Nope!", 401); //para testar se a classe e o middleware estão a funcionar (fx sync)
    res.render("produtos/novo", { categorias });
})

//Outro método para lidar com erros em fx async e para evitar ter que escrever sempre try...catch em todas as rotas
//é envolver a fx callback numa outra fx que vai fazer o catch ao erro, exemplo:
//irei usar esta fx utilitária na rota para editar um produto (e funcionou!)
//não é preciso usar no Xpress 5
const wrapAsync = (fx) => {
    return function (req,res,next) {
        fx(req,res,next).catch(err => next(err));
    }
}

// a rota para o pedido de criar o produto à BD implica async
///O Express 5 trata lida automaticamente com erros criados por
///rotas ou middleware que retorna uma Promise e chama next(err) automaticamente
app.post("/produtos", async (req, res, next) => {
    //este try catch replica o que o xpress 5 faz automaticamente na mesma situação
    try {
        const novoProduto = new Produto(req.body);
        await novoProduto.save();
        res.redirect(`/produtos/${novoProduto._id}`);
    } catch (e) {
        //next(res.send("Nope"));
        next(e);
    }

})

//assim que o path tem :id as rotas seguintes com o mesmo
//padrão (neste caso /produtos/) têm que usar o :id
//rota para ver detalhes do produto
//para lidar com erros em fxc async, o throw new AppErros não vai funcionar
//tem que se usar o next e como parâmetro do next coloca-se então o new xxx
//exemplo; next(new AppErros("xxx", xxx)) => o next então é o 3º parâmetro na fx async
app.get("/produtos/:id", async (req, res, next) => {
    const { id } = req.params;
    const produto = await Produto.findById(id);
    if (!produto) {
        //o return pára o fluxo e evita o erro do ejs disparado pela linha seguinte
        //também podia usar um if else ou ternário
        //if(!produto) {return next(new AppErros("Produto não encontrado", 404));} else {res.render("produtos/detalhe", { produto });}
        return next(new AppErros("Produto não encontrado", 404));
    }
    res.render("produtos/detalhe", { produto });
})

//rota para o form para editar
app.get("/produtos/:id/editar", async (req, res, next) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findById(id);
        //aqui com o try catch não dá para usar o ternário => !produto ? next(new AppErros("xxx", 404)) : res.render("produtos/editar", { produto, categorias });
        ///o catch nunca dispara pois o erro do mongoose do id é resolvido com o if else, erro de validação passa para a rota PUT
        if (!produto) {
            throw new AppErros("Produto não encontrado", 404)
        } else {
            res.render("produtos/editar", { produto, categorias });
        }
    } catch (e) {
        next(e);
    }
})

//rota para inserir a alteração no MongoDB
//testar o wrapAsync
app.put("/produtos/:id", wrapAsync(async (req, res, next) => {
    //aqui o try catch funciona porque é na validação que o mongoose dá o erro
        const { id } = req.params;
        const produto = await Produto.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' });
        res.redirect(`/produtos/${produto._id}`);
}))

//rota para apagar o produto
app.delete("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const apagarProduto = await Produto.findByIdAndDelete(id);
    res.redirect("/produtos");
})

//como lidar com erros específicos do Mongoose
//fx para lidar com os erros
const lidarErroValidação = (err) => {
    console.log(err.errors.properties);
    //para esta fx retornar algo tem de ter return
    return err;
    //também se pode criar um erro com a classe (mensagem personalizada, e a que vem do obj err e o statusCode)
    //return new AppErros(`Validação falhou...${err.message}`, 400);
}

app.use((err, req,res,next) => {
    console.log(err.name);
    //especificar que tipo de erro vai ser tratado com a fx anterior
    if(err.name === "ValidationError") {
        err = lidarErroValidação(err)
    }
    next(err);
})


app.use((err, req, res, next) => {
    const { status = 500, message = "Ups, algo correu mal..." } = err;
    res.status(status).send(message);
})

app.listen(3000, () => console.log("ligado na porta 3000"));