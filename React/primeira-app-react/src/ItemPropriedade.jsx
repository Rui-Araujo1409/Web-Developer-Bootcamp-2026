import "./Propriedade.css"

function ItemPropriedade({ nome, pontuação, preço }) {
    return (
        <div className="Propriedade">
            <h2>{nome}</h2>
            <h3>{preço}</h3>
            <h4>{pontuação}</h4>
        </div>
    )
}

export default ItemPropriedade;