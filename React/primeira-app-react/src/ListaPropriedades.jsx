import ItemPropriedade from "./ItemPropriedade";
import "./ListaPropriedades.css"


function ListaPropriedades ({propriedades}) {
return (
    <div className="ListaPropriedades">
      {propriedades.map(el => (<ItemPropriedade key = {el.id} {...el}/>))}
      </div>
)
}

export default ListaPropriedades;