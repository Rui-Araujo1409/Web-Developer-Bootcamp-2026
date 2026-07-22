//este é o ficheiro onde vão estar os métodos para as rotas dos parques
//que de facto são as fxs que estavam no callback das rotas
const Parque = require("../modelos/parque");
//o cloudinary para apagar as imagens do cloudinary quando as apagamos do MongoDB
const {cloudinary} = require("../cloudinary/index");

const índice = async (req, res) => {
    const parques = await Parque.find({});
    res.render("parques/index", { parques });
}

const novoFormCriarParque = (req, res) => {
    //este código pode ir para um middleware
    /*     if (!req.isAuthenticated()) {
            req.flash("erro", "Tem de estar autenticado.");
            return res.redirect("/utilizador/entrar");
        } */
    res.render("parques/novo");
}

const criarParque = async (req, res, next) => {
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
    //para inserir o path e filename no campo "imagens"
    //vamos buscar os dados ao body do req.files, mas como definimos que vai ser um array no modelo
    //vamos usar o .map para percorrer o array e extrair esses campo para um obj
    novoParque.imagens = req.files.map(item => ({ url: item.path, filename: item.filename }))
    //linha para buscar o id do autor do campo
    novoParque.autor = req.user._id;
    await novoParque.save();
    req.flash("sucesso", "Campo criado com sucesso!");
    req.flash("error", "Parece que houve um erro...");
    res.redirect(`/parques/${novoParque._id}`);
}

const detalheParque = async (req, res, next) => {
    const id = req.params.id
    const { sucesso, error } = req.flash;
    const parque = await Parque.findById(id).populate({
        path: "avaliações", //aqui é mais complicado, estamos a popular no parque o campo "avaliações",
        populate: {          //agora queremos dentro das "avaliações" popular o campo "autor"
            path: "autor"   //e no populate seguinte é para o campo autor mas do parque
        }
    }).populate("autor"); //para popular propriedades basta encadear o populate
    //if (!parque) { next(new AppErros("Parque não existe", 404)); };
    //o mesmo mas com Flash
    if (!parque) {
        req.flash("error", "O parque não existe");
        return res.redirect("/parques");
    };
    res.render("parques/detalhe", { parque });
}

const formEditarParque = async (req, res) => {
    const id = req.params.id;
    const parqueActual = await Parque.findById(id);
    if (!parqueActual) {
        req.flash("error", "O parque não existe");
        return res.redirect("/parques");
    };
    res.render("parques/editar", { parqueActual });
}

const gravarEditarParque = async (req, res) => {
    const id = req.params.id;
    //alteração para introduzir permissões que protejam a rota (depois este código vai para um middleware)
    //primeiro encontrar o parque
    /*     const parqueEditar = await Parque.findById(id);
        //lógica para confirmar se o dono do parque é o que está logado
        if (!parqueEditar.autor.equals(req.user._id)) {
            req.flash("error", "Não tem permissões para tal.");
            return res.redirect(`/parques/${id}`);
        } */
    const parqueEditado = await Parque.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' });
    const imgs = req.files.map(item => ({ url: item.path, filename: item.filename }));
    //o operador spread vai inserir os items do array criado com o map
    //se inserisse apenas no push o imgs ele iria criar um array dentro de um array
    parqueEditado.imagens.push(...imgs);
    await parqueEditado.save();
    //lógica para apagar imagens seleccionadas (propriedade apagarImagem[])
    //mas apenas se esse array não estiver vazio (o array está no req.body)
    if (req.body.apagarImagem) {
        //para apagar do cloudinary chamar o método destroy em uploader e o parâmetro é o filename
        //que é retirado do loop que passa pelo array req.body.apagarImagem
        for (let filename of req.body.apagarImagem) {
            await cloudinary.uploader.destroy(filename);
        }
        //$pull retira elemento de um array (imagens) cujo filename esteja presente ($in) no req.body.apagarImagem
        await parqueEditado.updateOne({ $pull: { imagens: { filename: { $in: req.body.apagarImagem } } } });
    }
    req.flash("sucesso", "Campo actualizado com sucesso!");
    res.redirect(`/parques/${parqueEditado._id}`);
}

const apagarParque = async (req, res) => {
    const id = req.params.id;
    const parqueEliminar = await Parque.findByIdAndDelete(id);
    res.render("parques/apagar");
}


module.exports = {
    índice,
    novoFormCriarParque,
    criarParque,
    detalheParque,
    formEditarParque,
    gravarEditarParque,
    apagarParque
}