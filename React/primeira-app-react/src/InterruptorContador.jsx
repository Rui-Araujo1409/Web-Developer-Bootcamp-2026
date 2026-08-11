import { useState } from "react";
import "./Interruptor.css"

function InterruptorContador() {
    //a fx vai inverter o valor do estado
    const [éFeliz, definirFeliz] = useState(true);
    //cada useState é independente
    const [num, definirContador] = useState(0);
    console.log(`O componente foi refeito, o contador é ${num}`);
    const mudarFeliz = () => definirFeliz(!éFeliz);
    const mudarNum = () => definirContador(num + 1);
    console.log(`O botão foi clicado, o contador é ${num}`);
    //depois definir o que se apresenta n bloco do react
    return (
        <div>
            <p className="Interruptor" onClick={mudarFeliz}>{éFeliz ? ":)" : ":("}</p>
            <p>O contador é: {num} </p>
            <button onClick={mudarNum}>Aumentar +1</button>
        </div>
    )
}

export default InterruptorContador;