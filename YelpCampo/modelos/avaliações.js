const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avaliaçõesSchema = new Schema({
    pontuação: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    avaliação: String
})





module.exports = mongoose.model("Avaliação", avaliaçõesSchema);