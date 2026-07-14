//este modelo apresenta a relação de um para paletes

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//desconstrução do Schema do mongoose para uma var
const {Schema} = mongoose;

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

//no um para paletes, o processo é o inverso do para muitos,
//um utilizador pode ter dezenas de milhares de tweets,
//mas um tweet só pode ter um utilizador
//o objectid do pai vai ser associado ao filho (neste caso o tweet)
//é no esquema do filho vai estar a referência ao objectid do pai

const utilizadorSchema = new Schema({
    username: String,
    idade: Number
});

const tweetSchema = new Schema({
    texto: String,
    gostos: Number,
    utilizador: {
        type: Schema.Types.ObjectId, ref: "Utilizador"
    }
})

const Utilizador = mongoose.model("Utilizador", utilizadorSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

//fx para criar o utilizador e tweets
/* const criarTweets = async () => {
    //const u = await new Utilizador({username: "exorcist69", idade: 53});
    const u = await Utilizador.findOne({username: "exorcist69"});
    const tweet2 = await new Tweet({texto: "já estou a cair para o lado", gostos: 7});
    tweet2.utilizador = u;
   // u.save();
    tweet2.save();
}

criarTweets(); */

//fx para popular as referências no MongoDB, mas aqui vamos popular apenas com o username
/* const encontrarTweet = async () => {
    const tweet = await Tweet.findOne({}).populate("utilizador", "username");
    console.log(tweet);
} */
//versão para popular todos os tweets  com o user
const encontrarTweet = async () => {
    const tweet = await Tweet.find({}).populate("utilizador");
    console.log(tweet);
}

encontrarTweet();