import ItemListaCompras from "./ItemListaCompras";

function ListaCompras({ item }) {
    const éAdquirido = item.adquirido;
    
    //a propriedade key é definida neste componente, não no ItemListaCompras
    //podemos colocar as porpriedades por extenso, exemplo, item={el.item} key={el.id} quantidade={el.quantidade} adquirido = {el.adquirido}
    //ou usar o spread{...el}, pois no componente ItemListaCompras estou a usar como parâmetros as chaves das propriedades
    return (
        <ul>
            {item.map(el => (
                <ItemListaCompras key={el.id} {...el}/>
            ))}
        </ul>
    )
}

export default ListaCompras;