const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


//Conexão ao MongoDB
//Importante: para criar uma BD nova no MongoDB tem que se inserir o nome da BD no url da ligação, antes do ?
const conectarMongoBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB3_URI);
        console.log("Conectado ao MongoDB");
        return mongoose;
    } catch (err) {
        console.log(err);
    }
}

conectarMongoBD();

//construir o esquema
const pessoaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    apelido: {
        type: String,
        required: true
    }
});

//construir o Virtual, que é um método mas o que retorna uma propriedade comporta-se como uma propriedade
pessoaSchema.virtual("nomeCompleto").get(function () {
    console.log(`${this.nome} ${this.apelido}`);
})

//construir o modelo
const Pessoa = mongoose.model("Pessoa", pessoaSchema);

//criar uma pessoa

const rui = new Pessoa({nome: "Rui", apelido: "Araújo"});
await rui.save();
//usar o virtual (sem os ())
rui.nomeCompleto;
