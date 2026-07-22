const mongoose = require("mongoose");
const Avaliação = require("./avaliações"); //este é essencial para o middleware apagar as avaliações quando se apaga um campo
const Schema = mongoose.Schema;

//para criar os thumbnails o processo é criar um esquema para as imagens (que vai ficar aninhado no esquema Parque)
const ImagemSchema = new Schema({
    url: String,
    filename: String
})

//depois criar um virtual para este esquema
ImagemSchema.virtual("miniatura").get(function () {
    //vamos substituir o "/upload" na url do cloudinary por "/upload/w_300"
    //depois no template é colocar imagem.miniatura em vez de imagem.url
    return this.url.replace("/upload", "/upload/w_200");
});

const ParqueSchema = new Schema({
    título: String,
    imagens: [ImagemSchema],
    preço: {
        type: Number,
        min: 1
    },
    descrição: String,
    //esta propriedade segue o standard do GeoJSON
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
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

//middleware post (não tem nada a haver com o pedido HTTP) para apagar todas as avaliações do campo apagado
ParqueSchema.post("findOneAndDelete", async function (doc) { //o doc é o obj do campo
    if (doc) { //para o caso de não haver campo,não se apaga nada
        //o remove() foi descontinuado no Mongoose, aqui o que estamos a dizer é:
        //no MongoDB, apaga todas as avaliações que têm um id no array doc.avaliações
        await Avaliação.deleteMany({ _id: { $in: doc.avaliações } })
    }
})


module.exports = mongoose.model("Parques", ParqueSchema);