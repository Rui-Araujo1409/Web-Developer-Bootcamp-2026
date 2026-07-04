const piadas = require("give-me-a-joke");
const cores = require("colors");
//console.dir(piadas);
piadas.getRandomDadJoke(function (joke) {
    console.log(cores.rainbow(joke));
})