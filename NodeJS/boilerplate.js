const fs = require("fs");

const pasta = process.argv[2] || "Projecto";

//para criar pasta
fs.mkdirSync(pasta);

//para criar ficheiros dentro de uma pasta

fs.writeFileSync(`${pasta}/index.html`, "");
fs.writeFileSync(`${pasta}/styles.css`, "");
fs.writeFileSync(`${pasta}/app.js`, "");