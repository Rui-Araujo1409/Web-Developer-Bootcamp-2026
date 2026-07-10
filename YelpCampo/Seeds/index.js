const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Parque = require("../modelos/parque");
const cidades = require("./cidades");
const {descriptores, sítios} = require("./seedhelpers")




const amostra = lista => lista[Math.floor(Math.random() * lista.length)];



//fx para limpar a BD

const seedBD = async () => {
    try {
        await Parque.deleteMany({});
        console.log("limpinho da silva");
        for (let i = 0; i < 50; i++) {
            const aleatório = Math.floor(Math.random() * 1000);
            const parque = new Parque({
                localização: `${cidades[aleatório].city}, ${cidades[aleatório].state}`,
                título: `${amostra(descriptores)} ${amostra(sítios)}`
            })
            await parque.save();
        }
        console.log("criados os novos campos");
    } catch (err) {
        console.log(err);
    }
};

const conectarMongoBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado ao MongoDB");
        await seedBD();
        return mongoose;
    } catch (err) {
        console.log("Erro na ligação ao MongoDB")
        console.log(err);
    } finally {
        await mongoose.disconnect();
        console.log("desligado da BD");
    }
}


conectarMongoBD();