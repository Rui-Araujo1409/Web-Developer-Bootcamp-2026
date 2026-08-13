import { useState } from "react";
import { v4 as uuid } from "uuid";



export default function Métodos({carrinho}) {
const [produto, definirProduto] = useState(carrinho);
//para apagar um produto
const apagarProduto = (id) => {
    console.log(id)
    definirProduto((prev) => prev.filter(el => el.id !== id))
}
//para mudar o nome de todos os produtos
const alterarTodosProdutos = () => definirProduto(prev => prev.map(el => ({...el, produto: el.produto.toLowerCase()})));

//no bloco do react tenho de usar o estado produto e não o carrinho!!
    return (
        <div>
            <ul>{produto.map(el => <li key={el.id} onClick={()=> apagarProduto(el.id)}>Produto: {el.produto}, preço: {el.preço}</li>)}</ul>
            <button onClick={alterarTodosProdutos}>Mudar nome produto</button>
        </div>
    )
} 