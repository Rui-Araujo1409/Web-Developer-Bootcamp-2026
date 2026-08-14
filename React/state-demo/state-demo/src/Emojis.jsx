import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Emojis() {
    const [emojis, definirEmojis] = useState([{ id: uuid(), emoji: ":)" }]);
    const adicionarEmojis = () => {
        //antes de usar o uuid
        //definirEmojis((emojiAnterior) => [...emojiAnterior, "XD"]);
        //depois de usar o uuid tem que se colocar o obj
        definirEmojis((emojiAnterior) => [...emojiAnterior, { id: uuid(), emoji: "XD" }]);
    }
    const apagarEmoji = (id) => {
        //vamos definir o novo estado dos emojis com o .filter
        //nota: vou usar o prev como modelo para o estado anterior
        definirEmojis((prev) => prev.filter(el => el.id !== id));
    }

    const mudarTodosEmojis = () => {
        definirEmojis(prev => prev.map(el => ({...el, emoji:"(Y)"})))
    }
    return (
        <div>
            {emojis.map((el) => (
                <p
                //para apagar o emoji, se colocarmos apenas a fx (como no criar emoji), exemplo: fx(el.id), o problema é que 
                //assim a fx é executada imediatamente (por causa dos ()), assim vamos criar um fx
                //que chama a fx que vamos construir
                onClick={() => apagarEmoji(el.id)}
                    key={el.id}
                    style={{ fontSize: "4rem" }}>
                    {el.emoji}
                </p>))}
            <button onClick={adicionarEmojis}>Mudar Emoji</button>
            <button onClick={mudarTodosEmojis}>Mudar todos emojis</button>
        </div>
    )
}