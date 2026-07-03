// https://swapi.tech/api/people/15

const pedido = new XMLHttpRequest();

pedido.onload = function() {
    console.log("Funcionou");
    const dados = JSON.parse(this.responseText);
    console.log(dados.result.properties.name)
}

pedido.onerror = function() {
    console.log("erro");
    console.log(this);
}

pedido.open("GET", "https://swapi.tech/api/people/14");
pedido.send();