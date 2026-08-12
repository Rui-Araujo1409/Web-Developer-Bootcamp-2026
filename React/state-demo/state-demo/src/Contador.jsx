import { useState } from "react";

function Contador () {
    const [num, definirContador] = useState(0);
    const incrementar = () =>{
        //a forma correcta como usar NO USEsTATE um valor inicial será com uma fx callback
        //exemplo aqui se colocasse apenas num+1 nas 3 fxs no render o incremento seria sempre 1 (e não 3)
        //com a fx callback o valor inicial é actualizado entre cada expressão
        definirContador((valorInicial) => valorInicial+1);
        definirContador((valorInicial) => valorInicial+1);
        definirContador((valorInicial) => valorInicial+1);
    } 
    return (
        <div>
            <p>{num}</p>
            <button onClick={incrementar}>+3</button>
        </div>
    )
}

export default Contador;