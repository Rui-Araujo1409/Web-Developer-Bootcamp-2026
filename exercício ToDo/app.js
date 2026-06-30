const listaToDos = ["cozinhar almoço", "levar lixo"];

let comando = prompt("O que quer fazer?");

while (comando !== "sair") {
    if (comando === "novoToDo") {
        let toDo = prompt("Insira o Novo ToDo");
        listaToDos.push(toDo);
        console.log(listaToDos);
    } else if (comando === "lista") {
        for (let todo of listaToDos) {
            console.log("******************");
            console.log(`${listaToDos.indexOf(todo)}: ${todo}`);
            console.log("******************");
        }
    } else if (comando === "apagarToDo") {
        let index = 2;
        listaToDos.splice(index,1);
        console.log(listaToDos);
    } else if(comando === "sair") {
        console.log("Saiu da app...")
        break;
    }
}

