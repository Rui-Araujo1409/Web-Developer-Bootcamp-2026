const express = require("express");
const path = require("path");
const app = express();

//para usar o EJS correndo o node em qq directório, temos de mudar a cwd no atributo views no .set
//e para tal temos de usar o módulo PATH do node
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    //res.send("Boas");
    //para usar o EJS usa-se o método .render();
    res.render("home.ejs")
})

app.get("/aleatorio", (req,res) => res.render("aleatorio.ejs"));








app.listen(3000, () => console.log("A ouvir na porta 3000!"));