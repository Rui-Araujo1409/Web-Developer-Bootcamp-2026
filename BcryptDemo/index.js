const bcrypt = require("bcrypt");

//fx para criar a pass encriptada
const encriptarPass = async (pass) => {
   /*  const salt = await bcrypt.genSalt(12); //para criar o salt
    const hash = await bcrypt.hash(pass, salt); //criar o hash */
    //as duas linhas anteriores podem sem simplificadas numa
    const hash = await bcrypt.hash(pass, 12); //os saltrounds são o segundo parâmetro
    //console.log(salt);
    console.log(hash);
}

const verificarPass = async (pass, passHash) => {
    const resultado = await bcrypt.compare(pass, passHash);
    (resultado) ? console.log("Loggado") : console.log("Nope...");
}

//encriptarPass("nikita");

verificarPass("nikita", "$2b$12$xE7dIZyo8mPm6Kxnf4jWgeGbs/gzBV0fziUA9VXRweDDgxbOmn4N6");