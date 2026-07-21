const express = require("express");
const rota = express.Router();
const passport = require("passport");
//tem que se importar o modelo
const Parque = require("../modelos/parque");
//e importar o util erros
const AppErros = require("../utils/appErros");
//importar Esquema Joi
const { parqueEsquema } = require("../esquemaJoi.js");
//importar o middleware do verficar o login
const { estáLogado } = require("../middleware.js");
const parque = require("../modelos/parque");


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

rota.get("/novo", estáLogado, (req, res) => {
    //este código pode ir para um middleware
    /*     if (!req.isAuthenticated()) {
            req.flash("erro", "Tem de estar autenticado.");
            return res.redirect("/utilizador/entrar");
        } */
    res.render("parques/novo");
})

rota.post("/", estáLogado, validarParque, async (req, res, next) => {
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
    //linha para buscar o id do autor do campo
    novoParque.autor = req.user._id;
    await novoParque.save();
    req.flash("sucesso", "Campo criado com sucesso!");
    req.flash("error", "Parece que houve um erro...");
    res.redirect(`/parques/${novoParque._id}`);
})


//rotas dinâmicas
rota.get("/:id", async (req, res, next) => {
    const id = req.params.id
    const { sucesso, error } = req.flash;
    const parque = await Parque.findById(id).populate("avaliações").populate("autor"); //para popular propriedades basta encadear o populate
    //if (!parque) { next(new AppErros("Parque não existe", 404)); };
    //o mesmo mas com Flash
    if (!parque) {
        req.flash("error", "O parque não existe");
        return res.redirect("/parques");
    };
    res.render("parques/detalhe", { parque });
})



rota.get("/:id/editar", estáLogado, async (req, res) => {
    const id = req.params.id;
    const parqueActual = await Parque.findById(id);
    if (!parqueActual) {
        req.flash("error", "O parque não existe");
        return res.redirect("/parques");
    };
    res.render("parques/editar", { parqueActual });
})

rota.put("/:id", estáLogado, validarParque, async (req, res) => {
    const id = req.params.id;
    //alteração para introduzir permissões que protejam a rota
    //primeiro encontrar o parque
    const parqueEditar = await Parque.findById(id);
    //lógica para confirmar se o dono do parque é o que está logado
    if (!parqueEditar.autor.equals(req.user._id)) {
        req.flash("error", "Não tem permissões para tal.");
        return res.redirect(`/parques/${id}`);
    }
    const parqueEditado = await Parque.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' });
    req.flash("sucesso", "Campo actualizado com sucesso!");
    res.redirect(`/parques/${parqueEditado._id}`);
})

rota.delete("/:id", estáLogado, async (req, res) => {
    const id = req.params.id;
    const parqueEliminar = await Parque.findByIdAndDelete(id);
    res.render("parques/apagar");
})


module.exports = rota;