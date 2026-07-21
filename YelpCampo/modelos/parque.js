const mongoose = require("mongoose");
const Avaliação = require("./avaliações"); //este é essencial para o middleware apagar as avaliações quando se apaga um campo
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
    //esta propriedade é para apresentar quem criou o parque
    autor: {
        type: Schema.Types.ObjectId,
        //cuidado aqui, tem de ser "Utilizadore", o outro modelo "Utilizador" deixou de se usar
        ref: "Utilizadore"
    },
    avaliações: [{
        type: Schema.Types.ObjectId,
        ref: "Avaliação"
    }]
});

//middleware para apagar todas as avaliações do campo apagado
ParqueSchema.post("findOneAndDelete", async function(doc) { //o doc é o obj do campo
    if(doc) { //para o caso de não haver campo,não se apaga nada
        //o remove() foi descontinuado no Mongoose, aqui o que estamos a dizer é:
        //no MongoDB, apaga todas as avaliações que têm um id no array doc.avaliações
        await Avaliação.deleteMany({_id: {$in: doc.avaliações}}) 
    }
})


module.exports = mongoose.model("Parques", ParqueSchema);