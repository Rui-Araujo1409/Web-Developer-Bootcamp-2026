const express = require("express");
const morgan = require("morgan");
const servidor = express();
const AppErros = require("./appErro");

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
    //retornar um Error() em vez de res.send permite usar o middleware para os erros criados por nós
    //throw new Error("Nope, a pass não é essa...");
    //exemplo de uma classe criado por nós para lidar com o erro
    throw new AppErros("é preciso uma pass", 401);
})



//fx para callback para verificar a pass
const fxVerificarPass = (req, res, next) => {
    const { pass } = req.query;
    if (pass === "morticia") {
        next();
    }
    //throw new Error("Nope, a pass não é essa...");
    throw new AppErros("é preciso uma pass", 401);
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

servidor.get("/erro", (req,res) => {
    galinha.voa();
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
servidor.use((req, res, next) => res.send("Nope, não existe..."));

/* servidor.use((err, req, res, next) => {
    console.log("*********************************");
    console.log("**************ERRO***************");
    console.log("*********************************");
    console.log(err);
    //depois podemos colocar um res.status().send() para apresentar algo
    //res.status(500).send("Oh pá, algo não correu bem...");
    //mas como o res.send() pára o fluxo, podemos colocar um next() mas aqui
    //se queremos passar o fluxo para outra fx para lidar com o erro temos que colocar
    //next(err) err é o parâmetro no erro middlware
    //next(err);
}) */

    //criar um error handler para erros que não têm status (exemplo, error de sintaxe)
    servidor.use((err, req, res, next) => {
        //retirar o statusCode do obj err (que vem da classe AppErros) e dar um default de 500, idem para a mensagem
        const {status = 500, message = "Algo correu mal..."} = err;
        res.status(status).send(message);
    })

servidor.listen(3000, () => console.log("A ouvir na porta 3000"));