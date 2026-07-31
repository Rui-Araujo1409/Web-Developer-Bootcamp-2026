import "./Cumprimentar.css";

export default function Cumprimentar ({pessoa = "Todos vós", local = "Nenhures"}) { //Props: o normal é desestruturar o parâmetro, colocar {pessoa} em vez de props.pessoa
        //console.log(props.pessoa);
    return (
        <>
            <h1 className="Cumprimentar">Bem vindo, {pessoa}!</h1>
            <h2>Espero que em {local} esteja tudo bem.</h2>
        </>
    )
}