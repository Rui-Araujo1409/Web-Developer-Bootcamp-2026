import './App.css'
import Cumprimentar from './Cumprimentar'
import Dados from './Dados'
import ListaEscolha from './ListaEscolha'
import DuploDados from './DuploDados'
import Cabeçalho from './Cabeçalho'
import ListaCores from './ListaCores'
import Slot from './Slot'
import ListaCompras from "./ListaCompras"

//vou colcoar ids por causa da propriedade key do React
const dados = [
  {id: 1, item: "Ovos", quantidade: 6, adquirido: false},
  {id: 2, item: "Leite", quantidade: 1, adquirido: true},
  {id: 3, item: "Frango", quantidade: 4, adquirido: false},
  {id: 4, item: "Arroz", quantidade: 2, adquirido: true},
]



function App() {
  //para usar vários parâmetros no Props, separam com um espaço (em vez de ,)
  //para usar parâmetros não-string, usar {}
  return (
    <div>
  {/*     <Cumprimentar pessoa="Rui" local="Massamá" /> 
      <Cumprimentar local="Bârlad"/>
      <Cumprimentar pessoa="Ioachim" />
      <Dados />
      <Dados lados={10}/>
      <Dados lados={20}/>
      <ListaEscolha valores={[1,2,3]}/>
      <DuploDados/>
      <DuploDados/>
      <DuploDados/> */}
      {/* <Cabeçalho cor="#FFF9E4" texto="Lorem Ipsum" tamanhoFonte="50px"/> */}
      {/* <ListaCores cores={["red", "green", "blue", "yellow"]}/>
      <ListaCores cores={["purple", "#FFF9E4", "lightseagreen", "olive"]}/> */}
   {/*    <Slot valor1="X" valor2="X" valor3="X"/>
      <Slot valor1="X" valor2="X" valor3="O"/> */}
      <ListaCompras item={dados}/>
    </div>
  )
}

export default App
