const express = require("express");
const morgan = require("morgan");
const engine = require("ejs-mate");
const servidor = express();


servidor.engine("ejs", engine);
//O Middleware são fxs que correm sempre que existe um pedido
//e com o next(), passam o fluxo para o próximo middleware ou rota (se existirem)
//sem o next() o fluxo pára aqui
servidor.use(morgan("dev"));
/* servidor.use((req,res,next) => {
    console.log("Este é o meu primeiro middleware.");
    return next(); //usa-se o return para garantir que depois do next() não corre mais nada no middleware
})
servidor.use((req,res,next) => {
    console.log("Este é o meu segundo middleware.");
    return next();
}) */

//middleware para inserir uma data no pedido
servidor.use((req, res, next) => {
    //console.log(req.method = "GET", req.path); //muda todos os pedidos para GET
    req.dataPedido = Date.now();
    next();
})

//middleware que só corre num path específico
servidor.use("/gatos", (req, res, next) => {
    console.log("Os gatos são fixes.");
    next();
})

//middleware para proteger uma rota específica
//se quisermos proteger várias rotas, este método não dá
//tem que se definir uma fx e usá-la como parâmetro callback no xxx.get da rota que se pretende proteger
//exemplo: servidor.get("/gatos", fxCallback, (req,res) => { código })
servidor.use("/segredo", (req, res, next) => {
    const { pass } = req.query;
    if (pass === "nikita") {
        next();
    }
    res.send("Nope, a pass não é essa...");
})


//fx para callback para verificar a pass
const fxVerificarPass = (req, res, next) => {
    const { pass } = req.query;
    if (pass === "morticia") {
        next();
    }
    res.send("Nope, a pass não é essa...");
}


servidor.get("/", (req, res) => {
    const data = new Date(req.dataPedido).toLocaleString();
    console.log(`A data do pedido foi: ${data}`);
    res.send("Bem vindo!");
})

servidor.get("/gatos", (req, res) => {
    const data = new Date(req.dataPedido).toLocaleString();
    console.log(`A data do pedido foi: ${data}`);
    res.send("Miau!");
})

servidor.get("/segredo", (req, res) => {
    res.send("A nikita foi o meu primeiro animal de estimação");
})

servidor.get("/segredo2", fxVerificarPass, (req, res) => {
    res.send("A morticia foi o meu segundo animal de estimação");
})

//este middleware só corre quando nenhum pedido feito corresponde a uma rota
//serve para construir uma resposta 404
//pode ser res.status(404).send(XXXX) para o cliente receber um status 404
servidor.use((req, res, next) => res.send("Nope, não existe..."))


servidor.listen(3000, () => console.log("A ouvir na porta 3000"));