export default function ({lados}) {
    const lançamento = Math.floor(Math.random() * lados) + 1;
    return (
        <p>O lançamento do dado de {lados} lados, é: {lançamento}</p>
    )
}