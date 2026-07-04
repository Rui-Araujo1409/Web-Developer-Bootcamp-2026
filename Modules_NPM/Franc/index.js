const franc = require("franc");
const langs = require("langs");

let texto = process.argv[2];

const langCode = franc(texto);
const língua = langs.where("3", langCode);
console.log(língua.local);