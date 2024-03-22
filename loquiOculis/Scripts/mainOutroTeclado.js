
let intervalIds = [];
let elementoSelecionado;

// function adicionarOpacidade(elementos) {
//     for (let elemento of elementos) {
//         if (!(elemento === elementoSelecionado)) {
//             const texto = elemento.querySelector("p");
//             texto.classList.add("opacidade");
//         }
//     }
// }

// function removeOpacidade(elementos) {
//     for (let elemento of elementos) {
//         const texto = elemento.querySelector("p");
//         texto.classList.remove("opacidade");

//     }
// }

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


function varredura() {
    const mensagens = document.querySelectorAll(".mensagem");
    // removeOpacidade(mensagens);

    let indexMensagem = 0;

    let intervalIdMensagem = setInterval(() => {
        // const campoSugestoes = document.querySelector("#sugestoes");
        // const palvrasCampoSugestao = campoSugestoes.childNodes;

        // if (palvrasCampoSugestao.length === 0 && indexLinha === 0) {
        //     indexLinha++;
        // }

        elementoSelecionado = mensagens[indexMensagem];

        if (elementoSelecionado) {
            adicionarRemoverClasse(elementoSelecionado, "varredura-mensagem", true, 0);

            adicionarRemoverClasse(elementoSelecionado, "varredura-mensagem", false, 2500);

            indexMensagem++;
        } else {
            indexMensagem = 0;
        }
    }, 3000);
    
    intervalIds.push(intervalIdMensagem);
}

varredura();

document.addEventListener('click', function(event) {
    stopAllIntervals();
    const audio = document.getElementById('som');
    audio.play();

    const elementoEscolhido = document.querySelector(".varredura-mensagem")
    const elementosmensagens = document.querySelectorAll(".mensagem");

    // adicionarOpacidade(elementosmensagens);

    if (elementoEscolhido) {
        const texto = elementoEscolhido.querySelector("p").textContent;
        alert(texto);
        varredura();
    } else {
        varredura();
    }
    
    
    // else if (existeVarreduraLetras) {
    //     if (tecla.classList.contains("letra")) {
    //         adicionarLetraCaixaMensagem(tecla.innerText);
    //     } else if (tecla.classList.contains("delete")) {
    //         detetarCaractere();
    //     } else if (tecla.classList.contains("ouvir")) {
    //         ouvirTexto();
    //     } else if (tecla.classList.contains("espaco")) {
    //         espacarCaracteres();
    //     } else if (tecla.classList.contains("deletar-texto")) {
    //         deletarTextoCaixaMensagem();
    //     } else if (tecla.classList.contains("palavra")) {
    //         const texto = caixaMensagem.value;
    //         const palavras = texto.split(/\s+/);
    //         apagarUltimaPalavra(palavras);
    //         adicionarPalavraCaixaMessagem(palavras, tecla.innerText);
    //         scrollParaBaixo();
    //         apagarSugestoes();
    //     } else if (tecla.classList.contains("tecladoAlternativo")) {
    //         atualizarConteudoTecladoAlternativo();
    //     } else if (tecla.classList.contains("tecladoPrincipal")) {
    //         atualizarConteudoTecladoPrincipal();
    //     }

    //     varredura();
        
    // } else {
        
    //     varredura();
    // }
});
