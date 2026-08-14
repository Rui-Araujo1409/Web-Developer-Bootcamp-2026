import { useState } from 'react'
import './App.css'
import Contador from './Contador'
import Teste from './Teste'
import Jogo from './Jogo'
import Emojis from './Emojis'
import Métodos from './Métodos.jsx'
import {v4 as uuid} from "uuid";
import Exercício from './Exercício.jsx'

const carrinho = [
        { id: uuid(), produto: "Cabo HDMI", preço: 12 },
        { id: uuid(), produto: "Pen USB", preço: 30 },
        { id: uuid(), produto: "Rato", preço: 40 }
    ]

function App() {

  return (
    <>
     {/* <Contador/> */}
     {/* <Teste/> */}
     {/* <Jogo/> */}
     {/* <Emojis/> */}
     {/* <Métodos carrinho = {carrinho} /> */}
     <Exercício jogadores={4} limite={5}/>
    </>
  )
}

export default App
