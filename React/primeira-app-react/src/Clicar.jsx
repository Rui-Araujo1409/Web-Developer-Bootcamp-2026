//No React os eventos são feitos inline, em vez de ser com querySelector, vars, addEventListener, etc...
//e define-se o callback antes da fx React

const noCLicar = () => console.log("Clicou no botão");

const sobrePassar = () => console.log("Passou por cima do elemento parágrafo");

function Clicar() {
    return (
        <div>
            <p onMouseOver={sobrePassar}>Clicar no botão</p>
            <button onClick={noCLicar}>Clicar!</button>
        </div>
    )
}
export default Clicar;