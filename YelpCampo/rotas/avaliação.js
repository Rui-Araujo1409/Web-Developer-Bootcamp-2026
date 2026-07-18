const express = require("express");
const rota = express.Router();
//importar modelos
const Avaliação = require("../modelos/avaliações");
const Parque = require("../modelos/parque");
//importar Esquema Joi
const { avaliaçãoEsquema } = require("../esquemaJoi.js");



const validarAvaliação = (req,res,next) => {
    const {error} = avaliaçãoEsquema.validate(req.body);
    if(error) {
        const msg = error.details.map((item) => item.message).join(",");
        return next(new AppErros(msg, 400));
    } else {
        next();
    }
}

rota.post("/:id/avaliacao", validarAvaliação, async (req, res) => {
    const { id } = req.params;
    const parque = await Parque.findById(id);
    const avaliação = new Avaliação(req.body);
    parque.avaliações.push(avaliação);
    await avaliação.save();
    await parque.save();
    req.flash("sucesso", "A avalição foi submetida com sucesso");
    res.redirect(`/parques/${id}`);
})

rota.delete("/:id/avaliacao/:avaliacaoId", async (req,res) => {
    //para usar dois IDs no url tem que se dar nomes diferentes
    const {id, avaliacaoId} = req.params;
    //o operador $pull retira de um array o(s) valor(es) que satisfaçam uma condição
    //neste caso vai ao array da propriedade "avaliações" e retira a instância com o avaliacaoId
    await Parque.findByIdAndUpdate(id, {$pull:{avaliações: avaliacaoId}}); 
    await Avaliação.findByIdAndDelete(avaliacaoId);
    req.flash("sucesso", "A avaliação foi apagada.");
    res.redirect(`/parques/${id}`);
})




module.exports = rota;