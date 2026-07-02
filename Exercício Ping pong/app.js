const bj1 = document.querySelector("#j1");
const bj2 = document.querySelector("#j2");
const limpar = document.querySelector("#limpar");
const r1 = document.querySelector("#r1");
const r2 = document.querySelector("#r2");

bj1.addEventListener("click", () => jogar1());

bj2.addEventListener("click", () => jogar2());

limpar.addEventListener("click", () => reset());

const jogar1 = () => {
    let valorActual = parseInt(r1.innerText);
    valorActual++;
    r1.innerText = valorActual;
}

const jogar2 = () => {
    let valorActual = parseInt(r2.innerText);
    valorActual++;
    r2.innerText = valorActual;
}

const reset = () => {
    r1.innerText = 0;
    r2.innerText = 0;
}
