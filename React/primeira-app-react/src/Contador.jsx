//se criar um contador em JS vanilla não vai funcionar
//pois o React não vai renovar a view sempre que eu clicar no botão para incrementar
//tem que se usar o Hook useState(param), que retorna um array [state, setState] => este é a norma do React
//o primeiro valor é o estado inicial que queremos definir, aqui será o param = 0, e o setState, será a fx que 
//altera o estado, aqui será a fx que incrementa em 1 unidade o estado original
//NOta: tem que se importar o hook useState, e os hooks têm de ser usados dentro de um componente React
//o que quer dizer que a fx para o contador tem que ser definida dentro do componente
import { useState } from "react";

function Contador() {
    //a norma é desestruturar o array retornado pelo hook
    //Nota: o hook tem 
    const [num, setNum] = useState(0);
    const mudarNum = () => setNum(num + 1);
    return (
        <div>
            <p>O contador é: {num} </p>
            <button onClick={mudarNum}>Aumentar +1</button>
        </div>
    )
}

export default Contador;