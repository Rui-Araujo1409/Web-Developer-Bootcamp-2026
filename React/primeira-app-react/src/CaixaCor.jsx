import { useState } from "react";
import "./CaixaCor.css";

function CaixaCor() {
    const num1 = Math.floor(Math.random() * 255);
    const num2 = Math.floor(Math.random() * 255);
    const num3 = Math.floor(Math.random() * 255);
    const rgb = `rgb(${num1}, ${num2}, ${num3})`;
    const [cor, definirRgb] = useState(rgb)
    const mudarCor = () => definirRgb(rgb);
    //const estilo = {backgroundColor: rgb}

    return (
        <div className="CaixaCor" onClick={mudarCor} style={{ backgroundColor: rgb }}>
        </div>
    )

}

export default CaixaCor;