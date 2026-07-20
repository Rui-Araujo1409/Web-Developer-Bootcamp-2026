const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//a parte estranha é na construção normal do esquema iremos colocar apenas o email (pois não é usado para verificar a autenticação?)
const utilizadorSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

//esta parte é que vai adicionar um user e password ao esquema
//  e gerir toda a parte da autenticação
utilizadorSchema.plugin(passportLocalMongoose.default);

const Utilizador = mongoose.model("Utilizadore", utilizadorSchema);

module.exports = Utilizador;