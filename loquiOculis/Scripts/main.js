// import './style.css'
import { listaPalavras } from './corpus';

const caixaMensagem = document.querySelector("#caixa-mensagem");

function scrollParaBaixo() {
    caixaMensagem.scrollTop = caixaMensagem.scrollHeight;
}

function apagarSugestoes() {
    const sugestoes = document.querySelector("#sugestoes");
    while (sugestoes.firstChild) {
        sugestoes.removeChild(sugestoes.firstChild);
    }
}

function apagarUltimaPalavra(palavras) {
    if (palavras.length > 0) {
        palavras.pop();
        caixaMensagem.value = palavras.join(" ");
    }
}

function adicionarPalavraCaixaMessagem(palavras, palavra) {
    if (palavras.length > 0) {
        caixaMensagem.value += ` ${palavra} `;
    } else {
        caixaMensagem.value += `${palavra} `;
    }
}



function sugestaoPalavras(listaPalavras, quantidade = 4) {
    apagarSugestoes();

    const campoSugestoes = document.querySelector("#sugestoes");

    const texto = caixaMensagem.value;
    const palavras = texto.split(/\s+/);
    const ultimaPalavra = palavras[palavras.length - 1];

    const fuzzySet = FuzzySet(listaPalavras);
    const resultados = fuzzySet.get(ultimaPalavra);

    const criarDiv = (texto) => {
        const divElement = document.createElement("div");
        divElement.classList.add("palavra", "tecla");
        divElement.style.textTransform = "uppercase";
        divElement.textContent = texto;
        return divElement;
    };

    // const criarTeclaOuvir = () => {
    //     const divOuvir = document.createElement('div');
    //     divOuvir.id = 'ouvir';
    //     divOuvir.classList.add('tecla', 'ouvir');

    //     const iconVolume = document.createElement('i');
    //     iconVolume.classList.add('fa-solid', 'fa-volume-high');

    //     divOuvir.appendChild(iconVolume);
    //     return divOuvir;

    // }

    if (resultados && resultados.length > 0) {

        // campoSugestoes.appendChild(criarTeclaOuvir());
        const palavrasSemelhantes = resultados
            .slice(0, quantidade)
            .map((resultado) => resultado[1]);

        for (let palavra of palavrasSemelhantes) {
            let palavraDiv = criarDiv(palavra);

            // palavraDiv.addEventListener("click", () => {
            //     apagarUltimaPalavra(palavras);
            //     adicionarPalavraCaixaMessagem(palavras, palavraDiv.innerText);
            //     scrollParaBaixo();
            //     apagarSugestoes();
            // });
            campoSugestoes.appendChild(palavraDiv);
        }
    }
}

function adicionarLetraCaixaMensagem(letra) {
    caixaMensagem.value += letra;
    scrollParaBaixo();
    sugestaoPalavras(listaPalavras);
}

// const teclas_letras = document.querySelectorAll(".letra");

// teclas_letras.forEach((btn) => {
//     btn.addEventListener("click", () => {
//         adicionarLetraCaixaMensagem(btn.innerText);
//     });
// });

function detetarCaractere() {
    const texto = caixaMensagem.value;

    if (texto.length > 0) {
        caixaMensagem.value = texto.slice(0, -1);
    }

    sugestaoPalavras(listaPalavras);
}
// const tecla_delete = document.querySelector("#delete");

// tecla_delete.addEventListener("click", () => {
//     detetarCaractere();
// });

function espacarCaracteres() {
    caixaMensagem.value += " ";
}

// const tecla_espaco = document.querySelector("#espaco");

// tecla_espaco.addEventListener("click", () => {
//     espacarCaracteres();
// });

function deletarTextoCaixaMensagem() {
    caixaMensagem.value = "";
    apagarSugestoes();
}
// const tecla_deletar_todo_texto = document.querySelector("#deletar-texto");

// tecla_deletar_todo_texto.addEventListener("click", () => {
//     deletarTextoCaixaMensagem();
// });

function ouvirTexto() {
    if ("speechSynthesis" in window) {
        const mensagem = new SpeechSynthesisUtterance();
        mensagem.lang = "pt-BR";
        mensagem.text = caixaMensagem.value;

        speechSynthesis.speak(mensagem);
    } else {
        alert("A API de síntese de fala não é suportada neste navegador.");
    }
}
// const tecla_ouvir = document.querySelector("#ouvir");

// tecla_ouvir.addEventListener("click", () => {
//     ouvirTexto();
// });

//----------------------------------------------------------------------------------------
let linha;
let tecla;
let intervalIds = [];

function adicionarOpacidadeLinha(linhas) {
    for (let l of linhas) {
        if (!(l===linha)) {
            l.classList.add("opacidade");
        }
    }
}

function removeOpacidadeLinha(linhas) {
    for (let l of linhas) {
        l.classList.remove("opacidade");
    }
}

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
        } else {
            elemento.classList.remove(classe);
        }
    }, delay);
}

function varreduraLetras(linha) {
    const teclas = linha.querySelectorAll(".tecla");
    
    if (teclas.length === 0) {
        stopAllIntervals();
        varredura();
        return;
    }

    let indexLetra = 0;
    let intervalIdLetras = setInterval(() => {
        tecla = teclas[indexLetra];

        if (tecla) {
            adicionarRemoverClasse(tecla, "varredura-letra", true, 0);

            adicionarRemoverClasse(tecla, "varredura-letra", false, 2500);

            indexLetra++;
        } else {
            indexLetra = 0;
        }

        if (tecla === teclas[teclas.length - 1]) {
            clearInterval(intervalIdLetras);  
            varredura();
        }
    }, 3000);

    intervalIds.push(intervalIdLetras);
}

function varredura() {
    const linhas = document.querySelectorAll(".linha");
    removeOpacidadeLinha(linhas);

    let indexLinha = 0;

    let intervalIdLinha = setInterval(() => {
        const campoSugestoes = document.querySelector("#sugestoes");
        const palvrasCampoSugestao = campoSugestoes.childNodes;

        if (palvrasCampoSugestao.length === 0 && indexLinha === 0) {
            indexLinha++;
        }

        linha = linhas[indexLinha];

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

function atualizarConteudo() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("teclas").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "tecladoAlternativo.html", false);
    xhttp.send();
}

varredura();

document.addEventListener('click', function(event) {
    stopAllIntervals();
    const audio = document.getElementById('som');
    audio.play();

    const existeVarreduraLetras = document.querySelector(".varredura-letra");

    const existeVarreduraLinhas = document.querySelector(".varredura");
    
    const linhas = document.querySelectorAll(".linha");

    adicionarOpacidadeLinha(linhas);

    if (existeVarreduraLinhas) {
        varreduraLetras(linha);
    } else if (existeVarreduraLetras) {
        if (tecla.classList.contains("letra")) {
            adicionarLetraCaixaMensagem(tecla.innerText);
        } else if (tecla.classList.contains("delete")) {
            detetarCaractere();
        } else if (tecla.classList.contains("ouvir")) {
            ouvirTexto();
        } else if (tecla.classList.contains("espaco")) {
            espacarCaracteres();
        } else if (tecla.classList.contains("deletar-texto")) {
            deletarTextoCaixaMensagem();
        } else if (tecla.classList.contains("palavra")) {
            const texto = caixaMensagem.value;
            const palavras = texto.split(/\s+/);
            apagarUltimaPalavra(palavras);
            adicionarPalavraCaixaMessagem(palavras, tecla.innerText);
            scrollParaBaixo();
            apagarSugestoes();
        } else if (tecla.classList.contains("numerosPontuacoes")) {
            atualizarConteudo();
        }

        varredura();
        
    } else {
        
        varredura();
    }
});



