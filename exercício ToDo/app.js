const listaToDos = ["cozinhar almoço", "levar lixo"];

let comando = "novo";

if(comando === "novo") {
    let toDo = "lavar louça";
    listaToDos.push(toDo);
    console.log(listaToDos);
} else if(comando === "lista") {
   for(let todo of listaToDos) {
    console.log(`${listaToDos.indexOf(todo)}: ${todo}`);
   }
} else if(comando === "apagar Todo") {
    
}

