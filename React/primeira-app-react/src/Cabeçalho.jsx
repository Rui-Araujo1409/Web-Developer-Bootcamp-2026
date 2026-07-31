export default function Cabeçalho ({cor = "lightseagreen", texto, tamanhoFonte}) {
    return <h1 style={{color: cor, fontSize: tamanhoFonte}}>{texto}</h1>
}