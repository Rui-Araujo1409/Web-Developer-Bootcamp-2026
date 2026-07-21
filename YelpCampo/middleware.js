//importar Esquema Joi Parque e Avaliação
const  {parqueEsquema, avaliaçãoEsquema}  = require("./esquemaJoi.js");
//e importar o util erros
const AppErros = require("./utils/appErros");
const Parque = require("./modelos/parque.js");
//importar modelos
const Avaliação = require("./modelos/avaliações");

const estáLogado = (req, res, next) => {
    //o Passport insere automaticamente no req obj uma propriedade (user)
    //console.log("Req.user...", req.user);
    if (!req.isAuthenticated()) {
        req.session.regressarUrl = req.originalUrl;
        req.flash("error", "Tem de estar autenticado.");
        return res.redirect("/utilizador/entrar");
    }
    next();
};

//middleware para guardar o url original em res.locals (o Passport agora limpa a sessão depois de um login)
const guardarUrlOriginal = (req, res, next) => {
    if (req.session.regressarUrl) {
        res.locals.regressarUrl = req.session.regressarUrl;
    }
    next();
}

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

//middleware para verificar se o utilizador logado é o autor do conteúdo
//e aplica-se a fx a todas as rotas que queremos proteger o acesso à edição, apagar
const verificarAutor = async (req, res, next) => {
    const id = req.params.id;
    const parqueEditar = await Parque.findById(id);
    if (!parqueEditar.autor.equals(req.user._id)) {
        req.flash("error", "Não tem permissões para tal.");
        return res.redirect(`/parques/${id}`);
    }
    next();
}

//middleware para verificar se o utilizador logado é o autor do conteúdo
//e aplica-se a fx a todas as rotas que queremos proteger o acesso à edição, apagar
const verificarAutorAvaliação = async (req, res, next) => {
    const {id, avaliacaoId }= req.params;
    const avaliaçãoEditar = await Avaliação.findById(avaliacaoId);
    if (!avaliaçãoEditar.autor.equals(req.user._id)) {
        req.flash("error", "Não tem permissões para tal.");
        return res.redirect(`/parques/${id}`);
    }
    next();
}


const validarAvaliação = (req,res,next) => {
    const {error} = avaliaçãoEsquema.validate(req.body);
    if(error) {
        const msg = error.details.map((item) => item.message).join(",");
        return next(new AppErros(msg, 400));
    } else {
        next();
    }
}


module.exports = {
    estáLogado,
    guardarUrlOriginal,
    validarParque,
    verificarAutor,
    verificarAutorAvaliação,
    validarAvaliação
};