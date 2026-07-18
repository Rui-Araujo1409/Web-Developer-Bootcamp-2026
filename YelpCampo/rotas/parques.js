const express = require("express");
const rota = express.Router();
//tem que se importar o modelo
const Parque = require("../modelos/parque");
//e importar o util erros
const AppErros = require("../utils/appErros");
//importar Esquema Joi
const { parqueEsquema} = require("../esquemaJoi.js");


//fx para a validação, aqui tem de se acrescentar o next() para o fluxo continuar
const validarParque = (req, res, next) => {
    {
        //depois passamos o esquema para o seu próprio ficheiro
        /*   const parqueEsquema = Joi.object({
          título: Joi.string().required(),
          localização: Joi.string().required(),
          preço: Joi.number().required().min(10),
          imagem: Joi.string().required(),
          descrição: Joi.string().required()
      }) */
        //retirar o obj error da validação
        const { error } = parqueEsquema.validate(req.body);
        if (error) {
            //o retorno de error.details é um array, constroi-se uma string com o retorno
            const msg = error.details.map((item) => item.message).join(",");
            return next(new AppErros(msg, 400));
        } else {
            next();
        }
    }
}

//as rotas estáticas têm de ser colocadas antes das dinâmicas

///rotas estáticas
rota.get("/", async (req, res) => {
    const parques = await Parque.find({});
    res.render("parques/index", { parques });
})

rota.get("/novo", (req, res) => {
    res.render("parques/novo");
})

rota.post("/", validarParque, async (req, res, next) => {
    //construir o esquema com o Joi
    //para o primeiro exemplo construi-se o esquema dentro da routa
    //mas como se quer reutilizar o melhor é criar uma fx (ver mais acima)
    /*  const parqueEsquema = Joi.object({
         título: Joi.string().required(),
         localização: Joi.string().required(),
         preço: Joi.number().required().min(10),
         imagem: Joi.string().required(),
         descrição: Joi.string().required()
     })
     //retirar o obj error da validação
     const  {error} = parqueEsquema.validate(req.body);
     if(error) {
         //o retorno de error.details é um array, constroi-se uma string com o retorno
         const msg = error.details.map((item) => item.message).join(",");
        return next(new AppErros(msg, 400));
     }  */

    const novoParque = new Parque(req.body);
    await novoParque.save();
    req.flash("sucesso", "Campo criado com sucesso!");
    req.flash("erro", "Parece que houve um erro...");
    res.redirect(`/parques/${novoParque._id}`);
})


//rotas dinâmicas
rota.get("/:id", async (req, res, next) => {
    const id = req.params.id
    const {sucesso, erro} = req.flash;
    const parque = await Parque.findById(id).populate("avaliações");
    //if (!parque) { next(new AppErros("Parque não existe", 404)); };
    //o mesmo mas com Flash
    if (!parque) { 
        req.flash("erro", "O parque não existe");
        return res.redirect("/parques");
     };
    res.render("parques/detalhe", { parque });
})



rota.get("/:id/editar", async (req, res) => {
    const id = req.params.id;
    const parqueActual = await Parque.findById(id);
    if (!parqueActual) { 
        req.flash("erro", "O parque não existe");
        return res.redirect("/parques");
     };
    res.render("parques/editar", { parqueActual });
})

rota.put("/:id", validarParque, async (req, res) => {
    const id = req.params.id;
    const parqueEditado = await Parque.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' });
    req.flash("sucesso", "Campo actualizado com sucesso!");
    res.redirect(`/parques/${parqueEditado._id}`);
})

rota.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const parqueEliminar = await Parque.findByIdAndDelete(id);
    res.render("parques/apagar");
})


module.exports = rota;