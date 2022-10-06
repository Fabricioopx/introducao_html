//obter os elementos da pasta
const frm = document.querySelector("form");
const dvPalco = document.querySelector("#divPalco");

//constante para definir o numero de poltronas
const POLTRONAS = 240;

//vetor com as poltronas reservadas pelo cliente
const reservas = [];

window.addEventListener("load", () => {
    //operador ternario
    //se houver dados dalvos em localstorage, faz um split(",") e atribui esses dados ao array, caso contrário, inicializamos o array
     const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(",")
    : [];

    //montar o numero total de poltronas (definidas pela constante)
    for(let i = 1; i <= POLTRONAS; i++){
        const figure = document.createElement("figura");
        const imgStatus = document.createElement("img");

        //se a posicão estiver ocupada, exibe a imagem ocupada, senão, a imagem disponivel
        imgStatus.src = ocupadas.includes(i,toString())
        ?"img/ocupada.jpg"
        :"img/disponivel.jpg";
        imgStatus.className = "poltrona";

        const figuraCap = document.createElement("figcaption");

        const zeros = i < 10 ? "00" : i < 100 ? "0" : "";

        const num = document.createTextNode(`[${zeros}${1}]`);

        figuraCap.appendChild(num);
        figure.appendChild(imgStatus);
        figure.appendChild(figuraCap);

        if(i % 24 == 12) figure.style.marginRight = "60px"

        dvPalco.appendChild(figure);

        (i % 24 == 0 ) && dvPalco.appendChild(document.createElement("br"));
     }
})