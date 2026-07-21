const Avaliação = require("../modelos/avaliações");
const Parque = require("../modelos/parque");

const criarAvaliação = async (req, res) => {
    const { id } = req.params;
    const parque = await Parque.findById(id);
    const avaliação = new Avaliação(req.body);
    //inserir o autor 
    avaliação.autor = req.user._id;
    parque.avaliações.push(avaliação);
    await avaliação.save();
    await parque.save();
    req.flash("sucesso", "A avalição foi submetida com sucesso");
    res.redirect(`/parques/${id}`);
}

const apagarAvaliação = async (req,res) => {
    //para usar dois IDs no url tem que se dar nomes diferentes
    const {id, avaliacaoId} = req.params;
    //o operador $pull retira de um array o(s) valor(es) que satisfaçam uma condição
    //neste caso vai ao array da propriedade "avaliações" e retira a instância com o avaliacaoId
    await Parque.findByIdAndUpdate(id, {$pull:{avaliações: avaliacaoId}}); 
    await Avaliação.findByIdAndDelete(avaliacaoId);
    req.flash("sucesso", "A avaliação foi apagada.");
    res.redirect(`/parques/${id}`);
}


module.exports = {
    criarAvaliação,
    apagarAvaliação
}