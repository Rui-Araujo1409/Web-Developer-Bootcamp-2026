const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParqueSchema = new Schema({
    título: String,
    preço: String,
    descrição: String,
    localização: String
});

module.exports = mongoose.model("Parques", ParqueSchema);