import { useState } from "react";

const fxTeste = () => {
    console.log("A criar o tabuleiro")
    const tabuleiro = Array(1000);
    return tabuleiro;
}

export default function Teste() {
    //se usar uma fx como inicializador do estado (como aqui ao criar o tabuleiro)
    //devemos colocar a fx sem os () senão ela corre sempre que se clica no botão
    //embora o react ignore a execução nos re-render, mesmo sem os () o react executa
    //a fx no início do render, depois irá ignorar
   const [tabuleiro, definirTabuleiro] = useState(fxTeste);
    return (
    <button onClick={() => definirTabuleiro("Boas!")}>Clique para mudar estado</button>
    )
} 