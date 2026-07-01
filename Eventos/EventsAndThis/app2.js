// se usar uma arrow o "this" não funciona
function teste() {
this.innerText = "testatdo";
};

const h1 = document.querySelector("h1");
h1.addEventListener("click", teste);