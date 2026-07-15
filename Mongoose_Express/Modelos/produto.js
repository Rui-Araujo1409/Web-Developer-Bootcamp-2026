const mongoose = require("mongoose");
const {Schema} = mongoose;

const produtoSchema = new Schema({
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
    },
    //vamos inserir aqui a relação com a quinta
    quinta:{type: Schema.Types.ObjectId, ref: "Quinta"}
});

const Produto = mongoose.model("Produto", produtoSchema); 

module.exports = Produto;