const campoBusca = document.querySelector("#buscar-digimon");
const listaDigimons = document.querySelector(".lista-digimons");

// Só cria a mensagem se estiver na página da lista
let mensagemStatus = null;

if (listaDigimons) {
    mensagemStatus = document.createElement("p");
    mensagemStatus.className = "empty-state";
    listaDigimons.appendChild(mensagemStatus);
}


const imagemDigimon = document.querySelector("#imagem-digimon");
const identificadorDigimon = document.querySelector("#identificador-digimon");
const nomeDigimon = document.querySelector("#nome-digimon");
const resumoDigimon = document.querySelector("#resumo-digimon");
const nivelDigimon = document.querySelector("#nivel-digimon");
const tipoDigimon = document.querySelector("#tipo-digimon");
const fieldDigimon = document.querySelector("#field-digimon");
const habilidadesDigimon = document.querySelector("#habilidades-digimon");
const descricaoDigimon = document.querySelector("#descricao-digimon");

const botaoAnterior = document.querySelector("#digimon-anterior");
const botaoProximo = document.querySelector("#digimon-proximo");
const botaoAleatorio = document.querySelector("#digimon-aleatorio");

async function buscarDigimon(id) {
    const resposta = await fetch(
        `https://digi-api.com/api/v1/digimon/${id}`
    );

    if (!resposta.ok) {
        throw new Error("Digimon não encontrado");
    }

    const dados = await resposta.json();

    return dados;
}



function mostrarDigimon(dados) {
    const idFormatado = String(dados.id).padStart(3, "0");

    imagemDigimon.src = dados.images?.[0]?.href || "";
    imagemDigimon.alt = dados.name;

    identificadorDigimon.textContent = `DIGIMON · ID ${idFormatado}`;
    nomeDigimon.textContent = dados.name;

    resumoDigimon.textContent =
        dados.descriptions?.[1]?.description || "Sem resumo disponível.";

    nivelDigimon.textContent =
        dados.levels?.[1]?.name || "Desconhecido";

    tipoDigimon.textContent =
        dados.types?.[1]?.name || "Desconhecido";

    fieldDigimon.textContent =
        dados.fields?.map(field => field.name).join(", ") || "Desconhecido";

    descricaoDigimon.textContent =
        dados.descriptions?.[1]?.description || "Sem descrição disponível.";

    habilidadesDigimon.innerHTML = "";

    if (dados.skills && dados.skills.length > 0) {
        dados.skills.forEach(habilidade => {
            const dt = document.createElement("dt");
            const dd = document.createElement("dd");

            dt.textContent = habilidade.skill;
            dd.textContent = habilidade.description || "Sem descrição.";

            habilidadesDigimon.appendChild(dt);
            habilidadesDigimon.appendChild(dd);
        });
    } else {
        habilidadesDigimon.textContent = "Nenhuma habilidade encontrada.";
    }
}


let idAtual = null;
let carregandoDigimon = false;

async function irParaDigimon(id) {
    if (carregandoDigimon) {
        return;
    }

    carregandoDigimon = true;

    try {
        const dados = await buscarDigimon(id);

        mostrarDigimon(dados);

        idAtual = dados.id;

        // Atualiza o ID na URL
        history.replaceState(null, "", `?id=${dados.id}`);

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar esse Digimon.");
    }

    carregandoDigimon = false;
}



if (nomeDigimon) {
    const parametros = new URLSearchParams(window.location.search);
    const idInicial = parametros.get("id");

    if (idInicial) {
        irParaDigimon(idInicial);
    }
}



if (botaoProximo) {
    botaoProximo.addEventListener("click", () => {
        if (idAtual !== null) {
            irParaDigimon(idAtual + 1);
        }
    });
}

if (botaoAnterior) {
    botaoAnterior.addEventListener("click", () => {
        if (idAtual !== null && idAtual > 1) {
            irParaDigimon(idAtual - 1);
        }
    });
}


if (botaoAleatorio) {
    botaoAleatorio.addEventListener("click", async () => {
        const idAleatorio = Math.floor(Math.random() * 1500) + 1;

        await irParaDigimon(idAleatorio);
    });
}




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
        if (mensagemStatus) {
            mensagemStatus.style.display = "block";
            mensagemStatus.textContent = "Carregando...";
        }

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
                    if (mensagemStatus) {
                        mensagemStatus.textContent = "Nenhum Digimon encontrado.";
                    }
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