import { useState } from "react";
import "./Interruptor.css"

function Interruptor () {
    //a fx vai inverter o valor do estado
    const [éFeliz, definirFeliz] = useState(true);
    const mudarFeliz = () => definirFeliz(!éFeliz);
    //depois definir o que se apresenta n bloco do react
    return (
        <p className="Interruptor" onClick={mudarFeliz}>{éFeliz ? ":)" : ":("}</p>
    )
}

export default Interruptor;