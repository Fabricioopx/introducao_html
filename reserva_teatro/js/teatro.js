const frm = document.querySelector('form')
const divPalco = document.querySelector('#divPalco')

// constante para definir o número de poltronas

const POLTRONAS = 248

// vetor com as poltronas reservadas pelo cliente

const reservadas = [];

window.addEventListener('load', () => {


    // operador ternário
    // se huver dados salvos em localstorage, faz um split(',') e atribui esses dados ao array, caso contrário, inicializamos o array
    const ocupadas = localStorage.getItem('teatroOcupadas') ? localStorage.getItem('teatroOcupadas').split(';') : []

    // montar o número total de poltronas definidas pela constante
    for(let i = 1; i<=POLTRONAS; i++){
        const figure = document.createElement('figure') // cria a tag figura
        const imgStatus = document.createElement('img') // cria a tag img

        // se a posição estiver ocupada, exibe a imagem ocupada, senão exibe a imagem disponível
        imgStatus.src = ocupadas.includes(i.toString())
        ?'img/ocupada.jpg'    
        :'img/disponivel.jpg'
        imgStatus.classname = 'poltrona' // classe com a dimensão da imagem

        const figureCap = document.createElement('figcaption')

        // quantidade de zeros antes do número da poltrona
        const zeros = i < 10 ? '00' : i < 100 ? '0' : ''

        const num = document.createTextNode(`[${zeros}${i}]`) // cria o texto
        
        // define os pais de cada tag criada
        figureCap.appendChild(num)
        figure.appendChild(imgStatus)
        figure.appendChild(figureCap)

        // se i módulo de 24 = 12 (é o corredor, define margem direita de 60 px)
        if (i % 24 == 12) figure.style.marginRight = '60px'

        divPalco.appendChild(figure); // indica que a figura é filha de divPalco

        // se i módulo de 24 = 0 : o código após o && será executado (inserindo quebra de linha)  
        (i % 24 == 0) && divPalco.appendChild(document.createElement('br'))
    }

})

frm.addEventListener('submit', (e) => {

    e.preventDefault()
    
    // obtém o conteúdo do input
    const poltrona = Number(frm.inPoltrona.value)

    //valida o preenchimento da entrada
    if (poltrona>POLTRONAS || poltrona < 1){
        alert('Informe um número de poltronas válido')
        frm.poltrona.focus()
        return
    }

    const ocupadas = localStorage.getItem('teatroOcupadas') ? localStorage.getItem('teatroOcupadas').split(';'):[]

    // validar se a poltrona já estiver ocupada
    if (ocupadas.includes(poltrona.toString())){
        alert(`A poltrona ${poltrona} já está ocupada`)
        frm.inPoltrona.value=''
        frm.inPoltrona.focus()
        return
    }

    // validar se a poltrona já estiver reservada
    if (reservadas.includes(poltrona)){
        alert(`A poltrona ${poltrona} já está reservada`)
        frm.inPoltrona.value=''
        frm.inPoltrona.focus()
        return
    }
    

    // capturar a imagem da poltrona, filha de divPalco
    const imgPoltrona = divPalco.querySelectorAll('img')[poltrona-1]

    imgPoltrona.src='img/reservada.jpg' // modifica o atributo da imagem

    reservadas.push(poltrona)  // adicionamos a poltrona ao vetor
    
    frm.inPoltrona.value=''
    frm.inPoltrona.focus()

})

frm.btnConfirmar.addEventListener("click", () => {

    //verificar se não há poltronas reservadas
    if(reservadas.length == 0){
        alert("Não há poltronas reservadas")
        frm.inPoltrona.focus()
        return
    }

    const ocupadas = localStorage.getItem("teatroOcupadas")?localStorage.getItem("teatroOcupadas").split(";"):[];

    //for decrescente, pois as reservas vão sendo removidas a cada alteração da imagem
    for(let i=reservadas.length - 1; i>=0; i--){

        ocupadas.push(reservadas[i])

        //captura a imagem da poltrona, filha de divPalco. É -1 pois começa em 0

        const imgPoltrona = divPalco.querySelectorAll('img')[reservadas[i]-1]
        imgPoltrona.src="img/ocupada.jpg" //modifica a imagem

        reservadas.pop()  //remove de vetor a reserva já alterada

    }

    localStorage.setItem("teatroOcupadas", ocupadas.join(";"))
    

})

frm.btnCancelar.addEventListener("click", () => {

    // obtém o conteúdo do input
    const poltrona = Number(frm.inPoltrona.value)

    const ocupadas = localStorage.getItem("teatroOcupadas")?localStorage.getItem("teatroOcupadas").split(";"):[];

    //verificar se não há poltronas ocupadas
    if(ocupadas.length == 0){
        alert("Não há poltronas ocupadas")
        frm.inPoltrona.focus()
        return
    }

})
