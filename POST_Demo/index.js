const express = require("express");
const path = require("path");
const app = express();

const comentários = [
    {
        username: "João",
        texto: "Este é o comentário do João."
    },
    {
        username: "Pedro",
        texto: "Este é o comentário do Pedro."
    },
    {
        username: "Maria",
        texto: "Este é o comentário da Maria."
    },
    {
        username: "Ana",
        texto: "Este é o comentário da Ana."
    }
];

//importante para interpretar o body que vem no POST com o application/x-www-form-urlencoded (que é o que o <form> utiliza)
app.use(express.urlencoded({extended: true}));
//para interpretar corpo do pedido (em JSON) com application/json
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//implementar a rota para o GET index
app.get("/comentarios", (req, res) => {
    res.render("comentários/index", {comentários});
})

app.get("/tacos", (req,res) => {
    res.send("GET /tacos resposta");
})

app.post("/tacos", (req,res) => {
    //por defeito o req.body é undefined
    console.log(req.body);
    const {carne, qtd} = req.body;
    res.send(`POST resposta. O pedido foi: Taco de ${carne} e a quantidade é: ${qtd}.`);
})










app.listen(3000, () => {
console.log("A ouvir na porta 3000")
})