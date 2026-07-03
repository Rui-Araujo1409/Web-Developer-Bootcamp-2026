/* axios.get("https://swapi.tech/api/people/13")
.then(resposta => console.log("Sucesso:", resposta.data.result.properties.name)) */

//usar async await com Axios
const resultado = async (id) => {
    try {
    const resposta = await axios.get(`https://swapi.tech/api/people/${id}`);
    console.log("Sucesso:", resposta.data.result.properties.name);
    } catch(err) {
        console.log("Erro: ", err);
    }  
}


//com Headers

const botão = document.querySelector("#botão");
const texto = document.querySelector("#piadas");

const dadJoke = async () => {
    try {
        //colocar o header config numa var(obj), podia colocar tudo no 2º parâmetro no axios
        const config = { headers: { Accept: "application/json"}};
        const resposta = await axios("https://icanhazdadjoke.com/", config);
        //console.log(resposta);
        return resposta.data.joke;
    } catch (error) {
        console.log("Erro", error);
    }
}

//como o dadJoke retorna uma Promise, temos que usar uma fx Async Await para usar o resultado
const novaPiada = async () => {
    const piada = await dadJoke();
    texto.innerText = piada;
}

botão.addEventListener("click", () => {
    novaPiada();
})
