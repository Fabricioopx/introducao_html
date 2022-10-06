//obter os elementos da pasta
const frm = document.querySelector("form");
const dvPalco = document.querySelector("#divPalco");

//constante para definir o numero de poltronas
const POLTRONAS = 240;

//vetor com as poltronas reservadas pelo cliente
const reservas = [];

window.addEventListener("load", () => {

    //se houver dados dalvos em localstorage, faz um split(",") e atribui esses dados ao array, caso contrário, inicializamos o array
     const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(",")

    //montar o numero total de poltronas (definidas pela constante)
    for(let i = 1; i <= POLTRONAS; i++){
        const figure = document.createElement("figura");
        const imgStatus = document.createElement("img");

        //se a posicão estiver ocupada, exibe a imagem ocupada, senão, a imagem disponivel
        imgStatus.src = ocupada
     
    }
})