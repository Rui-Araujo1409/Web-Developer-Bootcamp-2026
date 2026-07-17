const express = require("express");
const servidor = express();
const cookieParser = require("cookie-parser"); //é preciso instalar este middleware para popular req.cookies
                                               // com um obj com os nomes dos cookies como chaves (neste caso as keys são nome e animal)

servidor.use(cookieParser("esteéosegredo")); //a string é como o cookieParser vai assinar os cookies para depois validar se a integridade se mantêm

servidor.get("/boas", (req,res) => {
    console.log(req.cookies);
    //então podemos desconstruir o obj para retornar algo na resposta
    const {nome = "Anónimo", animal} = req.cookies;
    res.send(`Bem vindo(a) ${nome}, tu és um ${animal}`);
})

servidor.get("/definirnome", (req,res) => {
    res.cookie("nome","morticia"); //método para enviar um cookie
    res.cookie("animal", "gato");
    res.send("Enviei um cookie");
})

//rota para criar cookies assinados
servidor.get("/cookieassinado", (req,res) => {
    //o {signed:true} é o parâmtero necessário para assinar os cookies
    res.cookie("fruta", "uva", {signed: true});
    res.send("cookie assinado!")
    //se alterarmos completamente o valor do cookie no devtools, o objecto retornado fica vazio
    //se mudarmos apenas a string que está rodeada pelo código(aqui "uva") vai retornar {"fruta": false"}
    //reconhece o código mas também que algo aconteceu
})

//rota para verificar o cookie assinado
servidor.get("/verificarcookie", (req,res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
})

servidor.listen(3000, () => console.log("A ouvir na porta 3000"))