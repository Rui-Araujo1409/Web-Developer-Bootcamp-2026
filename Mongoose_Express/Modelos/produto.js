const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    preço: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        lowercase: true,
        enum: ["fruta", "vegetais", "lacticínios"]
    }
});

const Produto = mongoose.model("Produto", produtoSchema); 

module.exports = Produto;