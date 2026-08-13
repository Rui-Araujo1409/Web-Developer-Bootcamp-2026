import { useState } from "react";

export default function Emojis () {
    const [emojis, definirEmojis] = useState([":)"]);
    const mudarEmojis = () => {
        definirEmojis((emojiAnterior) => [...emojiAnterior, "XD"]);
    }
    return (
        <div>
            {emojis.map((el,idx) => (<p key={idx} style={{fontSize:"4rem"}}>{el}</p>))}
            <button onClick={mudarEmojis}>Mudar Emoji</button>
        </div>
    )
}