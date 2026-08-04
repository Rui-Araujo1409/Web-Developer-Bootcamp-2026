//se o obj tiver poucas propriedades (como neste caso), podemos desestruturar por propriedades
//de outra forma seria melhor colocar o obj como parâmetro
//e colocamos os estilos na sua própria var

function ItemListaCompras ({item, quantidade, adquirido}) {
    //colocar dois operadores ternários no estilo
    const estilos = { textDecoration: adquirido ? "line-through" : "", color: adquirido ? "red" : "" };
return (
    <li style={estilos}>
                {item}, {quantidade}
            </li>)
}

export default ItemListaCompras;