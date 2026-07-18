const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const utilizadorSchema = new Schema({
    nome: {
        type: String,
        require: [true, "Nome é obrigatório"]
    },
    password: {
        type: String,
        required: [true, "Palavra-passe é obrigatória"]
    }
})


const Utilizador = mongoose.model("Utilizador", utilizadorSchema);

module.exports = Utilizador;