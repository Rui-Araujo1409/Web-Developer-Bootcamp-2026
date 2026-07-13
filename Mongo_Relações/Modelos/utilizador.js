const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const conectarMongoBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado ao MongoDB");
        return mongoose;
    } catch (err) {
        console.log("Erro na ligação ao MongoDB")
        console.log(err);
    }
}

conectarMongoBD();

const utilizadorSchema = mongoose.Schema({
    nome: String,
    apelido: String,
    moradas: [
        {
            //se não quiser que o mongoose crie um id para estes objectos
            //_id: {_id: false},
            rua: String,
            localidade: String,
            concelho: String,
            distrito: String
        }
    ]
})


const Utilizador = mongoose.model("Utilizador", utilizadorSchema);

const criarUtilizador = async () => {
    const u = new Utilizador({
        nome: "Ioachim",
        apelido: "Araújo",

    })
    u.moradas.push({
        rua: "Muncii",
        localidade: "Trampa",
        concelho:"Bârlad",
        distrito: "Vaslui"
    })
    const res = u.save();
    console.log(res);
}

//criarUtilizador();

//fx para adicionar moradas
const adicionarMorada = async (id) => {
    const utilizador = await Utilizador.findById(id);
    utilizador.moradas.push({
        rua: "Largo da Igreja",
        localidade: "Sigoelos",
        concelho: "Paredes de Coura",
        distrito: "Viana do Castelo"
    })
    await utilizador.save();
};

adicionarMorada("6a555d666eb42785a8812414");