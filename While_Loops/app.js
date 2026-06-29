let maximo = parseInt(prompt("Insira um número máximo"));
console.log(maximo);

while (!maximo) {
    maximo = parseInt(prompt("Insira um número válido!"));
}

const numAlvo = Math.floor(Math.random() * maximo + 1);
console.log(numAlvo);

let palpite = parseInt(prompt("Insira um palpite"));
let tentativas = 1;

while (palpite !== numAlvo) {
    tentativas++;
    if (palpite < numAlvo) {
        palpite = parseInt(prompt("Demasiado baixo. Insira outro palpite"));
    } else {
        palpite = parseInt(prompt("Demasiado alto. Insira outro palpite"));
    }
}

alert(`Acertou! O número era o ${numAlvo}. Precisou de ${tentativas} tentativa(s) para acertar.3`);