//Fetch com Promise
fetch("https://swapi.tech/api/people/13")
.then(resposta => {
    console.log("Sucesso, resposta com Promise");
    return resposta.json();
})
.then(dados => {
    console.log("Dados recebidos:", dados.result.properties.name);
})
.catch(err => {
    console.log("erro", err);
});

//Fetch com Async Await
const teste = async (url) => {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        console.log("Sucesso, resposta com Async Await");
        console.log("Dados recebidos:", dados.result.properties.name);
    } catch(err) {
        console.log("Erro: ", err)
    }
}

teste("https://swapi.tech/api/people/14");

