import './App.css'
import Cumprimentar from './Cumprimentar'
import Dados from './Dados'
import ListaEscolha from './ListaEscolha'
import DuploDados from './DuploDados'
import Cabeçalho from './Cabeçalho'
import ListaCores from './ListaCores'

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
      <ListaCores cores={["red", "green", "blue", "yellow"]}/>
      <ListaCores cores={["purple", "#FFF9E4", "lightseagreen", "olive"]}/>
    </div>
  )
}

export default App
