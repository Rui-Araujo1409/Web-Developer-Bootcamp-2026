const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Parque = require("../modelos/parque");
const cidades = require("./cidades");
const { descriptores, sítios } = require("./seedhelpers")




const amostra = lista => lista[Math.floor(Math.random() * lista.length)];



//fx para limpar a BD

const seedBD = async () => {
    try {
        await Parque.deleteMany({});
        console.log("limpinho da silva");
        for (let i = 0; i < 50; i++) {
            const preço = Math.floor(Math.random() * 50) + 10;
            const aleatório = Math.floor(Math.random() * 1000);
            const parque = new Parque({
                autor: '6a5e28a351db71c79cb4d358',
                localização: `${cidades[aleatório].city}, ${cidades[aleatório].state}`,
                título: `${amostra(descriptores)} ${amostra(sítios)}`,
                imagens: [
                    {
                        url: "https://res.cloudinary.com/jn84c9nh/image/upload/v1784724778/553-400x400_mqjbwh.jpg",
                        filename: "YelpCampo/553-400x400_mqjbwh"
                    },
                    {
                        url: "https://res.cloudinary.com/jn84c9nh/image/upload/v1784725028/kristaps-ungurs-i7YqXV2m7BQ-unsplash_kbigwm.jpg",
                        filename: "YelpCampo/kristaps-ungurs-i7YqXV2m7BQ-unsplash_kbigwm"
                    }
                ],
                descrição: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                preço
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

