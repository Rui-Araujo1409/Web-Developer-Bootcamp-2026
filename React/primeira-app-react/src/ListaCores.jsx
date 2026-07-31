export default function ({cores}) {
    //para criar uma lista para o array cores, devemos usar o map
    //const lista = cores.map(cor => <li>{cor}</li>)
    //ou mesmo inserir o loop do .map no return
    return (
        <div>
            <p>Está é a lista de cores:</p>
            <ul>{cores.map(cor => <li style={{color: cor}}>{cor}</li>)}</ul>
        </div>
    )
}