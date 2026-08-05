//o obj "evento" é criado por defeito e para evitar recarregar a págin quando se clica no botão
//usamos o já conhecido .preventDefault();
const fxSubmeterFormulário = (evento) => {
    evento.preventDefault();
console.log("O formulário foi submetido");
}

function Formulário () {
    return (
        <form onSubmit={fxSubmeterFormulário}>
        {/*     <label for="nome">Insira o seu nome: </label>
            <input type="text" name="nome" id="nome" /> */}
            <button>Submeter</button>
        </form>
    )
}

export default Formulário;