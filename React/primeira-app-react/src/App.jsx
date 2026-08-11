import './App.css'
import Cumprimentar from './Cumprimentar'
import Dados from './Dados'
import ListaEscolha from './ListaEscolha'
import DuploDados from './DuploDados'
import Cabeçalho from './Cabeçalho'
import ListaCores from './ListaCores'
import Slot from './Slot'
import ListaCompras from "./ListaCompras"
import ListaPropriedades from './ListaPropriedades'
import Clicar from "./Clicar"
import Formulário from './Formulário'
import Clicar2 from './Clicar2'
import Contador from './Contador'
import Interruptor from './Interruptor'
import InterruptorContador from './InterruptorContador'
import CaixaCor from './CaixaCor'
import CaixasCor from './CaixasCor'

//vou colcoar ids por causa da propriedade key do React
const dados = [
  {id: 1, item: "Ovos", quantidade: 6, adquirido: false},
  {id: 2, item: "Leite", quantidade: 1, adquirido: true},
  {id: 3, item: "Frango", quantidade: 4, adquirido: false},
  {id: 4, item: "Arroz", quantidade: 2, adquirido: true},
]

const propriedades = [
  { id: 129031, nome: "Desert Yurt", pontuação: 4.9, preço: 150 },
  { id: 129331, nome: "Lone Mountain Cabin", pontuação: 4.8, preço: 250 },
  { id: 129032, nome: "Cactus Retreat", pontuação: 4.75, preço: 300 },
  { id: 129033, nome: "Redwood Treehouse Escape", pontuação: 4.9, preço: 120 },
  { id: 129034, nome: "Oceanview Condo", pontuação: 4.7, preço: 140 },
  { id: 129035, nome: "Gold Miner Campground", pontuação: 4.69, preço: 96 },
];


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
      {/* <ListaCompras item={dados}/> */}
      {/* <ListaPropriedades propriedades = {propriedades}/> */}
      {/* <Clicar/> */}
      {/* <Formulário/> */}
      {/* <Clicar2 mensagem="Boas" textoBotão="Clicar aqui"/>
      <Clicar2 mensagem="Não clicar sff" textoBotão="Por favor, não clique aqui"/> */}
      {/* <Contador/> */}
      {/* <Interruptor/> */}
      {/* <InterruptorContador/> */}
      <CaixasCor/>
    </div>
  )
}

export default App
