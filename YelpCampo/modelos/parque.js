const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParqueSchema = new Schema({
    título: String,
    imagem: String,
    preço: {
        type: Number,
        min: 1
    },
    descrição: String,
    localização: String,
    avaliações: [{
        type: Schema.Types.ObjectId,
        ref: "Avaliação"
    }]
});

module.exports = mongoose.model("Parques", ParqueSchema);