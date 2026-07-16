const mongoose = require("mongoose");
//para o middleware funcionar temos de importar o modelo do Produto
const Produto = require("./produto");
const {Schema} = mongoose;

const quintaSchema = new Schema({
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

//o Mongoose Middleware tem que ser colocado antes dos Modelos, a seguir aos esquemas
//o middleware pre no caso de apagar a quinta o data está undefined pois é chamado
//antes de apagar a quinta
/* quintaSchema.pre("findOneAndDelete", async function(data) {
    console.log("PRE Middleware");
    console.log(data);
}) */

//este é o que funciona par apagar a quinta e retornar os produtos

quintaSchema.post("findOneAndDelete", async function(quinta) {
//o if para o caso de haver produtos
if(quinta.produtos.length) {
    const dadosApagados = await Produto.deleteMany({_id: {$in: quinta.produtos}}); //o operador crucial é $in do Mongoose
    console.log(dadosApagados);
}
})

const Quinta = mongoose.model("Quinta", quintaSchema);

module.exports = Quinta;