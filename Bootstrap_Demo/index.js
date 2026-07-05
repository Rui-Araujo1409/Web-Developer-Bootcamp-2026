const express = require("express");
const path = require("path");
const app = express();
const redditData = require("./views/data.json");

//para servir ficheiros estáticos (css, js, imgs) usar o métido .use (serve sempre o que está no bloco sempre
//que exite um pedido) e nos parâmetros colocar xxx.static. O detalhe está no path, pois temos a mesma situação
//que o EJS, temos de fazer o path.join para correr o código independente do ponto onde arrancamos o servidor
app.use(express.static(path.join(__dirname, "/public")));

//para usar o EJS correndo o node em qq directório, temos de mudar a cwd no atributo views no .set
//e para tal temos de usar o módulo PATH do node
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    //res.send("Boas");
    //para usar o EJS usa-se o método .render();
    res.render("home.ejs")
})

app.get("/aleatorio", (req,res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    //para passar algo para o template, uso um 2º parâmetro no .render, que é um obj (pode ser key:value ou apenas uma var)
    res.render("aleatorio.ejs", { num });
});

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    const dados = redditData[subreddit];
    //console.log(dados);
    (dados) ? res.render("subreddit.ejs", { ...dados }) : res.render("nope", {subreddit});
})

app.get("/gatos", (req,res) => {
    const gatos = ["nikita", "morticia", "garfield", "tucha"];
    res.render("gatos", {gatos});
})





app.listen(3000, () => console.log("A ouvir na porta 3000!"));