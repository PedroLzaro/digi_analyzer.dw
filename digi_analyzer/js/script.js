const campoBusca = document.querySelector("#buscar-digimon");
const listaDigimons = document.querySelector(".lista-digimons");

// Elemento para exibir mensagens de aviso ou feedback
const mensagemStatus = document.createElement("p");
mensagemStatus.className = "empty-state";
listaDigimons.appendChild(mensagemStatus);

let timerBusca = null;
let controllerBusca = null;
let requisicaoAtual = 0;

/**
 * Busca Digimons na API com base no nome digitado.
 * @param {string} termo - Nome ou trecho para pesquisa.
 */
async function buscarDigimonsDaAPI(termo = "") {
    if (controllerBusca) {
        controllerBusca.abort();
    }

    const controller = new AbortController();
    controllerBusca = controller;
    const idRequisicao = ++requisicaoAtual;

    try {
        mensagemStatus.style.display = "block";
        mensagemStatus.textContent = "Carregando...";

        const termoLimpo = String(termo).trim();
        const buscaEhNumero = /^\d+$/.test(termoLimpo);
        const idDigitado = buscaEhNumero ? Number.parseInt(termoLimpo, 10) : null;

        const urlBase = !termoLimpo
            ? "https://digi-api.com/api/v1/digimon"
            : buscaEhNumero
                ? `https://digi-api.com/api/v1/digimon/${idDigitado}`
                : `https://digi-api.com/api/v1/digimon?name=${encodeURIComponent(termoLimpo)}`;

        const cardsAntigos = listaDigimons.querySelectorAll(".card");
        cardsAntigos.forEach(card => card.remove());

        const resultados = [];
        let pagina = 0;
        let temProximaPagina = true;

        while (temProximaPagina) {
            const url = buscaEhNumero
                ? urlBase
                : `${urlBase}${urlBase.includes("?") ? "&" : "?"}page=${pagina}&pageSize=1000`;
            const resposta = await fetch(url, { signal: controller.signal });

            if (idRequisicao !== requisicaoAtual) {
                return;
            }

            if (!resposta.ok) {
                if (resposta.status === 404) {
                    mensagemStatus.textContent = "Nenhum Digimon encontrado.";
                    return;
                }
                throw new Error("Erro na requisição da API");
            }

            const dados = await resposta.json();
            if (idRequisicao !== requisicaoAtual) {
                return;
            }

            if (Array.isArray(dados.content)) {
                resultados.push(...dados.content);
                temProximaPagina = Boolean(dados.pageable?.nextPage);
                pagina += 1;
            } else {
                if (dados && dados.id) {
                    resultados.push(dados);
                }
                temProximaPagina = false;
            }
        }

        if (resultados.length === 0) {
            mensagemStatus.textContent = "Nenhum Digimon encontrado.";
            return;
        }

        mensagemStatus.style.display = "none";

        resultados.forEach(digimon => {
            const card = document.createElement("a");
            card.className = "card";
            card.href = `./digicard.html?id=${digimon.id}`;

            const idFormatado = String(digimon.id).padStart(3, "0");

            card.innerHTML = `
                <h2>${digimon.name}</h2>
                <p>ID: ${idFormatado}</p>
            `;

            listaDigimons.appendChild(card);
        });

    } catch (erro) {
        if (controller.signal.aborted || idRequisicao !== requisicaoAtual) {
            return;
        }

        console.error("Erro ao carregar Digimons:", erro);
        mensagemStatus.style.display = "block";
        mensagemStatus.textContent = "Erro ao carregar dados da API.";
    }
}

// Ouve a digitação no campo de busca utilizando Debounce (evita requisições excessivas)
if (campoBusca) {
    campoBusca.addEventListener("input", () => {
        clearTimeout(timerBusca);
        timerBusca = setTimeout(() => {
            const termoBusca = campoBusca.value.trim().toLowerCase();
            buscarDigimonsDaAPI(termoBusca);
        }, 300); // Aguarda 300ms após o usuário parar de digitar
    });
}

// Carrega os Digimons iniciais assim que a página abre
document.addEventListener("DOMContentLoaded", () => {
    buscarDigimonsDaAPI();
});