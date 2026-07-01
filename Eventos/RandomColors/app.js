const botão = document.querySelector("button");
const texto = document.querySelector("h1");


botão.addEventListener("click", () => {
const novaCor = document.body.style.backgroundColor = mudarCor();
    texto.innerText = novaCor;
});

const mudarCor = () => {
    let cor1 = Math.floor(Math.random() * 255) + 1;
    let cor2 = Math.floor(Math.random() * 255) + 1;
    let cor3 = Math.floor(Math.random() * 255) + 1;
    return `rgb(${cor1}, ${cor2}, ${cor3})`;
}