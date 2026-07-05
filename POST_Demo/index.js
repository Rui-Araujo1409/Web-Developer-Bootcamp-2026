const express = require("express");
const path = require("path");
const {v4: uuid} = require("uuid");
const app = express();


const comentários = [
    {
        id: uuid(),
        username: "João",
        texto: "Este é o comentário do João."
    },
    {
        id: uuid(),
        username: "Pedro",
        texto: "Este é o comentário do Pedro."
    },
    {
        id: uuid(),
        username: "Maria",
        texto: "Este é o comentário da Maria."
    },
    {
        id: uuid(),
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

//um GET para servir o formulário, que vai enviar os dados via POST para outra rota
app.get("/comentarios/novo", (req,res) => {
    res.render("comentários/novo");
})

app.post("/comentarios", (req,res) => {
    const {username, texto} = req.body;
    comentários.push({username, texto, id: uuid()});
    //o .redirect serve para evitar reenviar o post com os dados no body
    res.redirect("/comentarios");
})

app.get("/comentarios/:id", (req,res) => {
    const {id} = req.params;
    //lógica para encontrar no array o obj com o id (o parseInt é necessário porque o id que
    //vem do req.params é um string => antes de usar o UUID)
    const comentário = comentários.find(com => com.id === id);
    res.render("comentários/mostrar", {comentário});
})

app.patch("/comentarios/:id", (req,res) => {
    const {id} = req.params;
    //guardar o novo texto numa var
    const novoComentário = req.body.texto;
    //procurar o texto actual com o ID
    const comentário = comentários.find(com => com.id === id);
    //substituir o texto pelo novo
    comentário.texto = novoComentário;
    //depois redireccionar para a lista
    res.redirect("/comentarios");
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