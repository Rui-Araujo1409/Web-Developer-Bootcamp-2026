//Uma forma de adicionar condições no JSX, se quisermos o h1 sempre presente
/* export default function DuploDados () {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;
    return (
        <>

        <h1>{num1 === num2 ? "Ganhou! XD" : "Perdeu... :("}</h1> 
        <p>Número 1: {num1}</p>
        <p>Número 2: {num2}</p>   
        </>
    )
} */
//outra forma é colocar o html dentro da condição e das {}, e aqui só aparece o h3 dinamicamente quando se ganha
/* export default function DuploDados () {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;
    return (
        <>
        <h1>Duplo Dados!</h1>
        {num1 === num2 ? <h3>Ganhou! XD</h3> : null}
        <p>Número 1: {num1}</p>
        <p>Número 2: {num2}</p>   
        </>
    )
} */

//ainda outra forma de escrever o resultado anterior é colocar um &&/AND e a expressão que ser quer mostrar
//sem o operador ternário, o h3 só é mostrado se a condição se cumprir
export default function DuploDados () {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;
    return (
        <>
        <h1>Duplo Dados!</h1>
        {num1 === num2 && <h3>Ganhou! XD</h3>}
        <p>Número 1: {num1}</p>
        <p>Número 2: {num2}</p>   
        </>
    )
}