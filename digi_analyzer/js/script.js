// Dados principais dos Digimons
const digimons = [
	{
		id: "001",
		nome: "Botamon",
		imagem: "bebes digimon/Botamon_b.webp",
		tipo: "Slime",
		field: "Virus Busters, Nature Spirits",
		nivel: "Baby I",
		descricao: "Um Digimon Digital que acabou de nascer. Na superfície de seu corpo em forma de gosma, cresceu uma camada espessa de pelos pretos. Como acabou de nascer, não é capaz de lutar, mas pode produzir substâncias semelhantes a bolhas pela boca para intimidar o inimigo.",
		habilidades: [
			["San no Awa", "Dispara substâncias semelhantes a bolhas pela boca."],
			["Awa", "Cospe bolhas pela boca."]
		]
	},
	{
		id: "002",
		nome: "Koromon",
		imagem: "bebes digimon/koromon.jpg",
		tipo: "Lesser",
		field: "Virus Busters",
		nivel: "Baby II",
		descricao: "Um pequeno Digimon que perdeu os pelos que cobriam sua superfície e cujo corpo cresceu ainda mais. Embora tenha se tornado capaz de se movimentar de forma mais ativa, ainda não consegue lutar. Ele pode produzir bolhas pela boca para intimidar os oponentes.",
		habilidades: [
			["Awa", "Cospe bolhas pela boca."],
			["San no Awa", "Dispara substâncias semelhantes a bolhas pela boca."],
			["Poyoyon Tackle", "Atinge suavemente o oponente usando o corpo inteiro."]
		]
	},
	{
		id: "003",
		nome: "Punimon",
		imagem: "bebes digimon/Punimon_b.webp",
		tipo: "Slime",
		field: "None",
		nivel: "Fresh (Baby I)",
		descricao: "Digimon do tipo Slime cujo corpo é vermelho e translúcido. Seu corpo é tão macio que parece uma gelatina.",
		habilidades: [["Bubble Blow (Acid Bubbles)", "Lança bolhas ácidas a partir da boca para intimidar o inimigo."]]
	},
	{
		id: "004",
		nome: "Tsunomon",
		imagem: "bebes digimon/Tunomon_b.webp",
		tipo: "Lesser",
		field: "None",
		nivel: "In-Training (Baby II)",
		descricao: "Pequeno Digimon que possui um chifre em sua cabeça. Seu corpo é coberto por uma pelagem macia.",
		habilidades: [
			["Bubble Blow", "Dispara bolhas de sua boca."],
			["Tackle", "Investida corporal contra o oponente."]
		]
	},
	{
		id: "005",
		nome: "Poyomon",
		imagem: "bebes digimon/Poyomon_b.webp",
		tipo: "Slime",
		field: "Deep Savers",
		nivel: "Fresh (Baby I)",
		descricao: "Digimon aquático gelatinoso e translúcido. Flutua vagarosamente pelas profundezas do oceano digital.",
		habilidades: [["Bubble Blow", "Dispara uma névoa de bolhas para cegar ou distrair os oponentes e fugir."]]
	},
	{
		id: "006",
		nome: "Tokomon",
		imagem: "bebes digimon/{548516CA-359E-44D1-A29E-F8EA8A2EF78C}.png",
		tipo: "Lesser",
		field: "None / Night Seekers",
		nivel: "In-Training (Baby II)",
		descricao: "Digimon In-Training com presas afiadas escondidas dentro da boca. Apesar da aparência dócil, abre a boca para amedrontar quem tenta atacá-lo.",
		habilidades: [
			["Bubble Blow", "Dispara bolhas ácidas."],
			["Bite", "Morde firmemente o oponente com suas presas afiadas."]
		]
	},
	{
		id: "007",
		nome: "Yuramon",
		imagem: "bebes digimon/Yuramon_b.webp",
		tipo: "Seed",
		field: "Wind Guardians",
		nivel: "Fresh (Baby I)",
		descricao: "Digimon coberto por uma pelagem felpuda semelhante ao dente-de-leão. Flutua suavemente no ar e se prende a plantas ou árvores.",
		habilidades: [["Adhesive Bubbles", "Lança bolhas pegajosas para prender e atrasar os inimigos."]]
	},
	{
		id: "008",
		nome: "Tanemon",
		imagem: "bebes digimon/Tanemon_b.webp",
		tipo: "Lesser",
		field: "Wind Guardians / Jungle Troopers",
		nivel: "In-Training (Baby II)",
		descricao: "Digimon com uma brotação de folha saindo da cabeça. Adora se enterrar no solo para absorver nutrientes através de suas raízes.",
		habilidades: [
			["Bubble Blow", "Dispara bolhas de ar."],
			["Tackle", "Ataca correndo em direção ao alvo."]
		]
	},
	{
		id: "009",
		nome: "Zurumon",
		imagem: "bebes digimon/Zurumon_b.webp",
		tipo: "Slime",
		field: "Nightmare Soldiers",
		nivel: "Fresh (Baby I)",
		descricao: "Digimon Slime nascido do acúmulo de dados corrompidos. Seu corpo é composto por substâncias tóxicas.",
		habilidades: [["Poison Bubbles", "Cospe bolhas venenosas capazes de derreter o que tocam."]]
	},
	{
		id: "010",
		nome: "Pagumon",
		imagem: "bebes digimon/Pagumon_b.webp",
		tipo: "Lesser",
		field: "Nightmare Soldiers",
		nivel: "In-Training (Baby II)",
		descricao: "Digimon travesso que adora pregar peças em outros Digimons menores. Possui pequenas orelhas em formato de asas que usa para voar levemente.",
		habilidades: [
			["Poison Bubbles", "Ataca disparando bolhas impregnadas com veneno."],
			["Nip", "Belisca o inimigo com força."]
		]
	},
	{
		id: "011",
		nome: "Agumon",
		imagem: "novatos mon/Agumon_b.webp",
		tipo: "Reptile",
		field: "Deep Savers, Dragon's Roar, Metal Empire, Nature Spirits, Nightmare Soldiers, Virus Busters",
		nivel: "Child",
		descricao: "Um Digimon Réptil com aparência semelhante à de um pequeno dinossauro, que cresceu e se tornou capaz de andar sobre duas pernas. Sua força ainda é baixa, pois está em fase de crescimento, mas possui uma personalidade destemida e bastante feroz. Garras duras e afiadas crescem tanto em suas mãos quanto em seus pés, e seu poder é demonstrado nas batalhas. Ele também dá indícios de que poderá evoluir para um Digimon grande e poderoso. Seu golpe especial consiste em expelir um sopro de fogo pela boca para atacar o oponente.",
		habilidades: [
			["Baby Flame", "Cospe um sopro de fogo pela boca para atacar o oponente."],
			["Spitfire", "Cospe bolas de fogo."],
			["Cross Fight", "Morde ferozmente o inimigo."],
			["Surudoi Tsume", "Ataca com suas garras."],
			["Sharp Nail", "Ataca com suas garras."],
			["Baby Burner", "Acumula o Baby Flame na boca e depois o cospe de uma só vez, como uma explosão muito mais poderosa."],
			["Triple Baby Flame", "Dispara rapidamente três ataques Baby Flame em três direções diferentes."],
			["Battle Hawk", "Empunha um machado feito de Chrome Digizoid."],
			["Kūchū Baby Flame", "O ataque Baby Flame liberado enquanto está no ar."],
			["Mach Jab", "Golpeia ou corta rapidamente o oponente com as garras das duas mãos."],
			["Mach Jab Combo", "Avança contra o inimigo com vários golpes rápidos das garras das duas mãos."],
			["Dynamite Kick", "Executa uma sequência de chutes no ar."],
			["Uppercut", "Desfere um golpe ascendente em chamas com suas garras."],
			["Agumon Dive", "Salta sobre o inimigo e golpeia-o com suas garras."],
			["Wild Whip", "Atinge o inimigo com um movimento ascendente das duas mãos."],
			["Final Claw", "Salta e golpeia com as garras das duas mãos um inimigo em queda."],
			["Splash Kick", "Dá uma cambalhota para a frente enquanto chuta o inimigo."],
			["Aerial Mach Jab", "Golpeia rapidamente o inimigo com suas garras enquanto ambos os Digimons estão no ar."]
		]
	},
	{
		id: "012",
		nome: "Betamon",
		imagem: "novatos mon/Betamon_b.webp",
		tipo: "Amphibian",
		field: "Nature Spirits",
		nivel: "Child",
		descricao: "Um Digimon Anfíbio quadrúpede. Embora Betamon tenha uma personalidade gentil e dócil, quando fica irritado, libera a descarga elétrica chamada Dengeki Biririn de seu corpo, gerando mais de 1 MV de eletricidade para atingir o oponente.",
		habilidades: [
			["Dengeki Biririn", "Descarrega uma corrente elétrica emitida pelo próprio corpo, com mais de um milhão de volts, atingindo o oponente."],
			["Beta Slugger", "Remove a barbatana afiada de suas costas e a lança como um bumerangue."],
			["Cutter Fin", "Executa uma cambalhota no ar enquanto corta o inimigo."],
			["Water Tower", "Faz um jato de água irromper do solo abaixo do inimigo."],
			["Water Shot", "Descrição não fornecida no texto original."]
		]
	}
];

// Elementos da página de detalhe
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

// Define o Digimon atual pela URL
let idAtual = parseInt(window.location.search.substring(4));

if (isNaN(idAtual) || idAtual < 1 || idAtual > digimons.length) {
	idAtual = 1;
}

if (imagemDigimon && botaoAnterior && botaoProximo) {
	// Mostra o Digimon selecionado na tela
	function mostrarDigimon() {
		let digimon = digimons[idAtual - 1];

		imagemDigimon.src = "./digi_analyzer/assets/images/" + digimon.imagem;
		imagemDigimon.alt = digimon.nome + ", ID " + digimon.id;
		identificadorDigimon.textContent = "DIGIMON · ID " + digimon.id;
		nomeDigimon.textContent = digimon.nome;
		resumoDigimon.textContent = digimon.descricao;
		nivelDigimon.textContent = digimon.nivel;
		tipoDigimon.textContent = digimon.tipo;
		fieldDigimon.textContent = digimon.field;
		descricaoDigimon.textContent = digimon.descricao;
		document.title = digimon.nome + " | Digi Analyzer";

		habilidadesDigimon.innerHTML = "";
		for (let i = 0; i < digimon.habilidades.length; i++) {
			let habilidade = document.createElement("div");
			let nomeHabilidade = document.createElement("dt");
			let descricaoHabilidade = document.createElement("dd");

			nomeHabilidade.textContent = digimon.habilidades[i][0];
			descricaoHabilidade.textContent = digimon.habilidades[i][1];
			habilidade.appendChild(nomeHabilidade);
			habilidade.appendChild(descricaoHabilidade);
			habilidadesDigimon.appendChild(habilidade);
		}

		botaoAnterior.disabled = idAtual === 1;
		botaoProximo.disabled = idAtual === digimons.length;
	}

	// Navegação para o Digimon anterior
	botaoAnterior.addEventListener("click", function () {
		if (idAtual > 1) {
			window.location.href = "digicard.html?id=" + digimons[idAtual - 2].id;
		}
	});

	// Navegação para o próximo Digimon
	botaoProximo.addEventListener("click", function () {
		if (idAtual < digimons.length) {
			window.location.href = "digicard.html?id=" + digimons[idAtual].id;
		}
	});

	mostrarDigimon();
}
