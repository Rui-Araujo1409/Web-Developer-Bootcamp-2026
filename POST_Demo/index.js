const express = require("express");

const app = express();

//importante para interpretar o body que vem no POST com o application/x-www-form-urlencoded (que é o que o <form> utiliza)
app.use(express.urlencoded({extended: true}));
//para interpretar corpo do pedido (em JSON) com application/json
app.use(express.json());

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