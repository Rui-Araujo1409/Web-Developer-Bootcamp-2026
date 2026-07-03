//https://api.tvmaze.com/search/shows?q=


const formulário = document.querySelector("#formulário");

formulário.addEventListener("submit",async (e) => {
    e.preventDefault();
    const termoPesquisa = formulário.elements.pesquisa.value;
    //com o termo da consulta inserido directamente no url
    //const resultado = await axios(`https://api.tvmaze.com/search/shows?q=${termoPesquisa}`);
    //com o termo da consulta usando o axios (params => obj)
    //const config = {params: {q:termoPesquisa}};
    //com dois termos
    const config = {params: {q:termoPesquisa, genre: "drama"}};
    const resultado = await axios("https://api.tvmaze.com/search/shows", config);
    criarImagem(resultado.data);
    formulário.elements.pesquisa.value = "";
})


const criarImagem = (dados) => {
    for(resultado of dados) {
        const imagem = document.createElement("img");
        imagem.src = resultado.show.image.medium;
        document.body.append(imagem);
    }
}
