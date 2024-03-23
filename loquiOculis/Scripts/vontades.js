
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


// function varredura() {
//     const mensagens = document.querySelectorAll(".mensagem");
//     // removeOpacidade(mensagens);

//     let indexMensagem = 0;

//     let intervalIdMensagem = setInterval(() => {
//         // const campoSugestoes = document.querySelector("#sugestoes");
//         // const palvrasCampoSugestao = campoSugestoes.childNodes;

//         // if (palvrasCampoSugestao.length === 0 && indexLinha === 0) {
//         //     indexLinha++;
//         // }

//         elementoSelecionado = mensagens[indexMensagem];

//         if (elementoSelecionado) {
//             adicionarRemoverClasse(elementoSelecionado, "varredura-mensagem", true, 0);

//             adicionarRemoverClasse(elementoSelecionado, "varredura-mensagem", false, 2500);

//             indexMensagem++;
//         } else {
//             indexMensagem = 0;
//         }
//     }, 3000);
    
//     intervalIds.push(intervalIdMensagem);
// }

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
            adicionarRemoverClasse(mensagem, "varredura-letra", true, 0);

            adicionarRemoverClasse(mensagem, "varredura-letra", false, 2500);

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
    const linhas = document.querySelectorAll(".linha");
    removeOpacidadeLinha(linhas);

    let indexLinha = 0;

    let intervalIdLinha = setInterval(() => {
        
        let linha = linhas[indexLinha];

        if (linha) {
            adicionarRemoverClasse(linha, "varredura", true, 0);

            adicionarRemoverClasse(linha, "varredura", false, 2500);

            indexLinha++;
        } else {
            indexLinha = 0;
        }
    }, 3000);
    
    intervalIds.push(intervalIdLinha);
}

function atualizarConteudoTecladoAlternativo() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("quadro").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "vontades.html", false);
    xhttp.send();
}

varredura();

document.addEventListener('click', function (event) {
    alert("Teste")
    stopAllIntervals();
    const audio = document.getElementById('som');
    audio.play();

    const elementoEscolhido = document.querySelector(".varredura-mensagem")
    const elementosmensagens = document.querySelectorAll(".mensagem");

    // adicionarOpacidade(elementosmensagens);

    if (elementoEscolhido) {
        // const texto = elementoEscolhido.querySelector("p").textContent;
        // alert(texto);
        // const idElemento = elementoSelecionado.querySelector("")
        if (elementoEscolhido.id === "mensagem-2") {
            atualizarConteudoTecladoAlternativo();
        }        
        varredura();
    } else {
        varredura();
    }
});
