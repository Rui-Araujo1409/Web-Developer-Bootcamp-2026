import "./Cumprimentar.css";

export default function Cumprimentar ({pessoa}) { //Props: o normal é desestruturar o parâmetro, colocar {pessoa} em vez de props.pessoa
        //console.log(props.pessoa);
    return (
        <div >
            <h1 className="Cumprimentar">Bem vindo, {pessoa}!</h1>
        </div>
    )
}