
let intervalIds = [];
let elementoSelecionado;



function stopAllIntervals() {
    intervalIds.forEach((intervalId) => {
        clearInterval(intervalId);
    });

    intervalIds = [];
}

function adicionarRemoverClasse(elemento, classe, adicionar, delay) {
    setTimeout(() => {
        if (adicionar) {
            elemento.classList.add(classe);
            // const texto = elemento.querySelector("p");
            // texto.classList.remove("opacidade");
        } else {
            elemento.classList.remove(classe);
            // const texto = elemento.querySelector("p");
            // texto.classList.add("opacidade");
        }
    }, delay);
}


function varreduraMensagens(linha) {
    const mensagens = linha.querySelectorAll(".mensagem");
    
    if (mensagens.length === 0) {
        stopAllIntervals();
        varredura();
        return;
    }

    let indexLetra = 0;
    let intervalIdMensagem = setInterval(() => {
    let mensagem = mensagens[indexLetra];

        if (mensagem) {
            adicionarRemoverClasse(mensagem, "varredura-mensagem", true, 0);

            adicionarRemoverClasse(mensagem, "varredura-mensagem", false, 2500);

            indexLetra++;
        } else {
            indexLetra = 0;
        }

        if (mensagem === mensagens[mensagens.length - 1]) {
            clearInterval(intervalIdMensagem);  
            varredura();
        }
    }, 3000);

    intervalIds.push(intervalIdMensagem);
}

function varredura() {
    const mensagens = document.querySelectorAll(".linha");

    let indexMensagem = 0;

    let intervalIdMensagem = setInterval(() => {

        elementoSelecionado = mensagens[indexMensagem];

        if (elementoSelecionado) {
            adicionarRemoverClasse(elementoSelecionado, "varredura-mensagem", true, 0);

            adicionarRemoverClasse(elementoSelecionado, "varredura-mensagem", false, 2500);

            indexMensagem++;
        } else {
            indexMensagem = 0;
        }

        if (elementoSelecionado === mensagens[mensagens.length - 1]) {
            clearInterval(intervalIdMensagem);  
            varredura();
        }
    }, 3000);
  
    intervalIds.push(intervalIdMensagem);
}

function atualizarConteudoTecladoAlternativo() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("quadro").innerHTML = this.responseText;
            // document.body.innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "vontades.html", false);
    xhttp.send();
}

varredura();

document.addEventListener('click', function (event) {

    stopAllIntervals();
    const audio = document.getElementById('som');
    audio.play();

    const elementoEscolhido = document.querySelector(".varredura-mensagem")

    if (elementoEscolhido) {
        // const texto = elementoEscolhido.querySelector("p").textContent;
        // alert(texto);
        // const idElemento = elementoSelecionado.querySelector("")
        if (elementoEscolhido.id === "mensagem-2") {
            atualizarConteudoTecladoAlternativo();
            varredura();
        }        
        // varredura();
        varreduraMensagens(elementoSelecionado);
    } else {
        varredura();
    }
    
});