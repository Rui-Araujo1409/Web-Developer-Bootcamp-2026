export default function Slot ({valor1, valor2, valor3}) {
    const ganhouTexto = "Você ganhou!!";
    const perdeuTexto = "Você perdeu...";
    const extraTexto = "Parabéns!"
    const seGanhou = valor1 === valor2 && valor1 === valor3;
    const estilos = {color : seGanhou ? "green" : "red"};
    return (
        <div>
            <h1>{valor1} {valor2} {valor3}</h1>
            <h2 style={estilos}>{seGanhou ? ganhouTexto : perdeuTexto} </h2>
            {seGanhou && <h3>{extraTexto}</h3>}
        </div>
    )
}