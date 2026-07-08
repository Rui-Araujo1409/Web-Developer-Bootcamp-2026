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

//construir o Virtual, que é um método mas o que retorna uma propriedade que existe apenas do lado
//do Mongoose, não existe no MongoDB, por exemplo, aqui em vez de ter 3 propriedades na BD (nome próprio, apelido e nome completo)
//temos apenas duas na BD e é o que precisamos para construir o nome completo, que podemos depois usar do lado do Mongoose
pessoaSchema.virtual("nomeCompleto").get(function () {
    console.log(`${this.nome} ${this.apelido}`);
})

//Construir o middleware, acções que são realzadas no Mongoose antes e depois de 
//executar algo para o MongoDB
//pre - antes
pessoaSchema.pre("save", async function () {
    this.nome = "Joaquim";
    this.apelido = "Fortu de Araújo";
    console.log("A gravar");
});
//post - após
pessoaSchema.post("save", async function () {
    console.log("Guardado");
});


//construir o modelo
const Pessoa = mongoose.model("Pessoa", pessoaSchema);

//criar uma pessoa

const rui = new Pessoa({nome: "Rui", apelido: "Araújo"});
await rui.save();
//usar o virtual (sem os ())
rui.nomeCompleto;
