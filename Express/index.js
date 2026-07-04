const express = require("express");
const app = express();

/* app.use((req, res) => {
console.log("Temos um novo pedido!");
//res.send("Boas, recebemos o vosso pedido. Isto é a resposta.");
//res.send({nome:"morticia", idade: 14});
res.send("<h1>Esta é a minha página!</h1>");
}); */

//routing (/gatos, /caes, /)
app.get("/gatos", (req, res) => {
console.log("Pedido para gatos!");
res.send("<h1>MIAU!</h1>");
})

//a expressão em /*/:[var] tem que corresponder à variável que se vai definir no obj e colocar na resposta
//aqui a var tem de ser teste1 (e apenas 1 parâmetro)
app.get("/r/:teste1", (req,res) => {
    const { teste1 } = req.params;
    res.send(`Este é o teste para o PATH parametros. Você escreveu no path do URL: /${teste1}`);
})

//com 2 parâmetros (as variáveis são teste2 e IDart)
app.get("/d/:teste2/:IDart", (req,res) => {
    //console.log(req.params);
    const { teste2, IDart } = req.params;
    res.send(`Este é o segundo teste para o PATH parametros. Você escreveu no path do URL: /${teste2} com o ID: ${IDart}`);
})


app.get("/caes", (req, res) => {
console.log("Pedido para cães!");
res.send("<h1>ÃO ÃO!</h1>");
})

app.get("/", (req, res) => {
console.log("Pedido para a homepage!");
res.send("<h1>Esta é a homepage</h1>");
})

//Para consultas no URL (query)
app.get("/search", (req,res) => {
    console.log(req.query);
    const { animal , cores } = req.query;
    res.send(`Esta é para a query: ${animal} com a cor ${cores}, cuidado com a cor...XD!`);
})

//Usando o POST
app.post("/gatos", (req,res) => {
    console.log("Pedido para gatos mas com POST!");
    res.send("Pedido POST para /gatos");
})


//para paths que não existem, tem que estar no fim pois sobrepõe-se ás outras respostas
app.get("/{*path}", (req,res,next) => res.send("Não conheço esse caminho..."));



app.listen(3000, () => console.log("A ouvir na porta 3000!"))