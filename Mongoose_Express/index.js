const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const Produto = require("./Modelos/produto");
const Quinta = require("./Modelos/quinta");

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

//ROTAS PARA AS QUINTAS
app.get("/quintas", async (req, res) => {
    const quintas = await Quinta.find({});
    res.render("quintas/index", { quintas })
})

app.delete("/quintas/:id", async (req,res) => {
    const {id} = req.params;
    const apagarQuinta = await Quinta.findByIdAndDelete(id);
    res.redirect("/quintas");
})

app.get("/quintas/nova", (req, res) => {
    res.render("quintas/nova");
})

app.post("/quintas", async (req, res) => {
    const novaQuinta = new Quinta(req.body);
    await novaQuinta.save();
    res.redirect(`/quintas/${novaQuinta._id}`);
})

app.get("/quintas/:id", async (req, res) => {
    const { id } = req.params;
    //const quinta = await Quinta.findById(id);
    //para popular os produtos temos de acrescentar .populate("produtos")
    const quinta = await Quinta.findById(id).populate("produtos");
    res.render("quintas/detalhe", { quinta });
})

//rota para apresentar um formulário para inserir um produto associado a uma quinta
app.get("/quintas/:id/produtos/novo", async (req, res) => {
    const { id } = req.params;
    const quinta = await Quinta.findById(id)
    res.render("produtos/novo2", { categorias, id, quinta })
})

//rota para o post do formulário anterior
app.post("/quintas/:id/produtos", async (req, res) => {
    //id da quinta
    const { id } = req.params;
    //para encontrar a quinta
    const quinta = await Quinta.findById(id);
    //elementos do produto
    const { nome, preço, categoria } = req.body;
    //criar novo produto
    const novoProduto = new Produto({ nome, preço, categoria });
    //associar o produto à quinta
    quinta.produtos.push(novoProduto);
    //associar a quinta ao produto
    novoProduto.quinta = quinta;
    //gravar o produto e quinta
    await novoProduto.save();
    await quinta.save();
    res.redirect(`/quintas/${id}`);
})

//ROTAS DOS PRODUTOS

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
    res.render("produtos/novo", { categorias });
})

// a rota para o pedido de criar o produto à BD implica async
app.post("/produtos", async (req, res) => {
    const novoProduto = new Produto(req.body);
    console.log(novoProduto);
    await novoProduto.save();
    res.redirect(`/produtos/${novoProduto._id}`);
})

//assim que o path tem :id as rotas seguintes com o mesmo
//padrão (neste caso /produtos/) têm que usar o :id
//rota para ver detalhes do produto
app.get("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const produto = await Produto.findById(id).populate("quinta");
    res.render("produtos/detalhe", { produto });
})

//rota para o form para editar
app.get("/produtos/:id/editar", async (req, res) => {
    const { id } = req.params;
    const produto = await Produto.findById(id);
    res.render("produtos/editar", { produto, categorias });
})

//rota para inserir a alteração no MongoDB
app.put("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const produto = await Produto.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' });
    res.redirect(`/produtos/${produto._id}`);
})

//rota para apagar o produto
app.delete("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const apagarProduto = await Produto.findByIdAndDelete(id);
    res.redirect("/produtos");
})




app.listen(3000, () => console.log("ligado na porta 3000"));