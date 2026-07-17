const express = require("express");
const servidor = express();
//aqui vamos importar as routas
const rotasAbrigos = require("./rotas/abrigos");
const rotasGatos = require("./rotas/gatos");
const rotasAdmin = require("./rotas/admin");

//aqui vai ser o middleware para usar as rotas
//o 1ª parâmetro é uma string onde definimos um prefixo para as rotas importadas
//aqui prefirmos usar a home como prefixo, mas podia ser
//("/lojas", rotasLocais) e as rotas ficavam /lojas/oeiras/, por exemplo
//servidor.use("/", rotasAbrigos); 
//vou fazer um prefixo /abrigos
//assim se por qualquer razão quiser mudar o prefixo, mudo apenas aqui
servidor.use("/abrigos", rotasAbrigos);
//exemplo
//servidor.use("/criadores", rotasAbrigos);
servidor.use("/gatos", rotasGatos);
servidor.use("/", rotasAdmin);

servidor.listen(3000, () => console.log("A ouvir na porta 3000"));