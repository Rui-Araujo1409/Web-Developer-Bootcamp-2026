const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passportLocalMongoose = require('passport-local-mongoose');
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

//o método estático (ou seja, para todas as instâncias de utilizador) tem de estar antes do modelo
//e a fx tem de ser tradicional para usar o this, que refere o modelo do Utilizador

utilizadorSchema.statics.encontrarEValidar = async function (utilizador, password) {
    const utilizadorEncontrado = await this.findOne({nome: utilizador});
     const validarPass = await bcrypt.compare(password, utilizadorEncontrado.password);
     return validarPass ? utilizadorEncontrado : false; //o return é preciso!
}

//a fx para encriptar a pass vai ser com um middleware pre, NOTA: no middleware PRE já não se usa next
//mas sim uma fx async/await
utilizadorSchema.pre("save", async function() {
    //método para verificar se a pass foi modificada
    if(!this.isModified("password")) return; //será para um utilizador que crie várias contas com a mesma pass? se a pass não foi modificada, sai da fx
    this.password = await bcrypt.hash(this.password, 12);
    }) 

const Utilizador = mongoose.model("Utilizador", utilizadorSchema);

module.exports = Utilizador;