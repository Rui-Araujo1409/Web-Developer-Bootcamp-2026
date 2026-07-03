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

resultado(4);


