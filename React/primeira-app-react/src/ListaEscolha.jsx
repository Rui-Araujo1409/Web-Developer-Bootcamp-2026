export default function ListaEscolha ({valores}) {
const index = Math.floor(Math.random() * valores.length);
    return (
        <>
        <p>A lista de valores é: {valores}</p>
        <p>O número aleatório é: {valores[index]}</p>
        </>
    )
}