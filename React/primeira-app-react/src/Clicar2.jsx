function Clicar2 ({mensagem, textoBotão}) {
    const alerta = () => alert(mensagem);
    return (
        <button onClick={alerta}>{textoBotão}</button>
    )
}

export default Clicar2;