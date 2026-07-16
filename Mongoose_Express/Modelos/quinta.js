const mongoose = require("mongoose");
const {Schema} = mongoose;

const quitaSchema = new Schema({
    nome: {
        type: String,
        required: [true, "A quinta deve ter um nome."]
    },
    localidade: String,
    email: {
        type: String,
        required: [true, "Precisa de inserir um email"]
    },
    produtos: [{
        type: Schema.Types.ObjectId,
        ref: "Produto"
    }]
})

const Quinta = mongoose.model("Quinta", quitaSchema);

module.exports = Quinta;