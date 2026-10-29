const campoBusca = document.querySelector("#buscar-digimon");
const listaDigimons = document.querySelector(".lista-digimons");

// Elemento para exibir mensagens de aviso ou feedback
const mensagemStatus = document.createElement("p");
mensagemStatus.className = "empty-state";
listaDigimons.appendChild(mensagemStatus);

let timerBusca = null;

/**
 * Busca Digimons na API com base no nome digitado.
 * @param {string} termo - Nome ou trecho para pesquisa.
 */
async function buscarDigimonsDaAPI(termo = "") {
    try {
        // Mostra estado de carregamento
        mensagemStatus.style.display = "block";
        mensagemStatus.textContent = "Carregando...";

        const termoLimpo = String(termo).trim();
        const buscaEhNumero = /^\d+$/.test(termoLimpo);
        const idDigitado = buscaEhNumero ? Number.parseInt(termoLimpo, 10) : null;

        // Define a URL da API (busca todos se estiver vazio, por nome ou por ID exato)
        const url = !termoLimpo
            ? "https://digi-api.com/api/v1/digimon"
            : buscaEhNumero
                ? `https://digi-api.com/api/v1/digimon/${idDigitado}`
                : `https://digi-api.com/api/v1/digimon?name=${encodeURIComponent(termoLimpo)}`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            if (resposta.status === 404) {
                mensagemStatus.style.display = "block";
                mensagemStatus.textContent = "Nenhum Digimon encontrado.";
                return;
            }
            throw new Error("Erro na requisição da API");
        }

        const dados = await resposta.json();
        const resultados = Array.isArray(dados.content)
            ? dados.content
            : dados && dados.id
                ? [dados]
                : [];

        // Limpa apenas os cards anteriores
        const cardsAntigos = listaDigimons.querySelectorAll(".card");
        cardsAntigos.forEach(card => card.remove());

        if (resultados.length === 0) {
            mensagemStatus.textContent = "Nenhum Digimon encontrado.";
            return;
        }

        // Esconde a mensagem de aviso se houver resultados
        mensagemStatus.style.display = "none";

        // Renderiza cada Digimon recebido da API
        resultados.forEach(digimon => {
            const card = document.createElement("a");
            card.className = "card";
            card.href = `./digicard.html?id=${digimon.id}`;

            // Formatando o ID com zeros à esquerda (ex: ID: 001)
            const idFormatado = String(digimon.id).padStart(3, "0");

            card.innerHTML = `
                <h2>${digimon.name}</h2>
                <p>ID: ${idFormatado}</p>
            `;

            listaDigimons.appendChild(card);
        });

    } catch (erro) {
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