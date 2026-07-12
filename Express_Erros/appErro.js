//definir a classe personalizada para lidar com os erros 
//é um extend da classe Error, e tem que se usar message e status
class AppErros extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = AppErros;