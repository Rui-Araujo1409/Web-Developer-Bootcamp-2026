//o default será 6 lados para um dado 

export default function ({lados = 6}) {
    const lançamento = Math.floor(Math.random() * lados) + 1;
    return (
        <p>O lançamento do dado de {lados} lados, é: {lançamento}</p>
    )
}