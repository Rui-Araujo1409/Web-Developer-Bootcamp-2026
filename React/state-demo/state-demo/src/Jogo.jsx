import { useState } from "react";

export default function Jogo() {
    const resultadosObj = { j1: 0, j2: 0 };
    const [resultado, definirResultado] = useState(resultadosObj);
    //o useState com obj e arrays funciona de forma diferente, não dá para usar o obj/array original, 
    //pois é apenas uma referência na memória, o react não assume que exista uma alteração no obj em si
    //para "obrigar" o react a fazer o re-render, temos de criar uma cópia do obj/array original e adicionar a alteração
    //a cópia faz-se com o {...x}/[...x]
    const mudarResultadoJ1 = () => {
        //semm fx callback seria:
        //const novoResultado = {...resultado, j1: resultado.j1 + 1}
        //definirResultado(novoResultado);
        //com fx callback
        definirResultado((anteriorResultado) => ({ ...anteriorResultado, j1: anteriorResultado.j1 + 1 })
            //se fizesse (x) => {} depois tem que ter return por causa das {}, ex:
            //return {...resultado, j1: anteriorResultado.j1 + 1}
        );
    }
    const mudarResultadoJ2 = () => {
        definirResultado((anteriorResultado) => ({ ...anteriorResultado, j2: anteriorResultado.j2 + 1 }));
    }

    return (
        <div>
            <p>Jogador 1:{resultado.j1}</p>
            <p>Jogador 2:{resultado.j2}</p>
            <button onClick={mudarResultadoJ1}>+1 J1</button>
            <button onClick={mudarResultadoJ2}>+1 J2</button>
        </div>
    )
}