import { useState } from "react";

export default function Exercício({ jogadores, limite }) {
    const numJogadores = new Array(jogadores).fill(0);
    const [resultado, definirResultado] = useState(numJogadores);
    const incrementarResultado = (idx) => {
        //versão sem a lógica do limite (estava tão bonita...)
        //definirResultado(prev => prev.map((el, i) => i === idx ? el += 1 : el))
        definirResultado(prev => prev.map((el, i) => {
            if (i === idx) {
                el += 1;
                if (el >= limite) {
                    alert(`O jogador ${i + 1} ganhou!`);
                    limparResultado();
                } else {
                    return el;
                }
            } else {
                return el
            }
        }))
    }
    const limparResultado = () => {
        definirResultado(numJogadores);
    }
    return (
        <div>
            <ul>
                {resultado.map((el, idx) => (<li key={idx}>Jogador{idx + 1}: {el} <button onClick={() => incrementarResultado(idx)}>+1</button></li>))}
            </ul>
            <button onClick={limparResultado}>Limpar</button>
        </div>
    )
}




//método para alterar um elemento específico de um array/array-objs
/* prev.map(el => {
    if(el.id === id) {
        return {...prev, propriedade: "XXX"};
    } else {
        return el;
    }
}) */