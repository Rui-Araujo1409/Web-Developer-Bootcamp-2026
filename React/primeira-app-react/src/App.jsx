import './App.css'
import Cumprimentar from './Cumprimentar'
import Dados from './Dados'
import ListaEscolha from './ListaEscolha'

function App() {
  //para usar vários parâmetros no Props, separam com um espaço (em vez de ,)
  //para usar parâmetros não-string, usar {}
  return (
    <div>
      {/* <Cumprimentar pessoa="Rui" local="Massamá" /> 
      <Cumprimentar pessoa="Ana" local="Bârlad"/>
      <Cumprimentar pessoa="Ioachim" local="Bârlad" /> */}
    {/*   <Dados />
      <Dados lados={10}/>
      <Dados lados={20}/> */}
      {/* <ListaEscolha valores={[1,2,3]}/> */}
    </div>
  )
}

export default App
