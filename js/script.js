// CARDS DAS TELAS DOS POKÉMONS
const cardTelaInicial = document.getElementById("card-tela-inicial");
const cardTelaBusca = document.getElementById("card-tela-busca");
const cardTelaDetalhes = document.getElementById("card-tela-detalhes");
const cardTelaErro = document.getElementById("card-tela-erro");

// TELA INICIAL
const pokemonNameInicial = cardTelaInicial.querySelector(".pokemon-name");
const pokemonIdInicial = cardTelaInicial.querySelector(".pokemon-id");
const pokemonImgInicial = cardTelaInicial.querySelector(".pokemon-img");
const typeContainerInicial = cardTelaInicial.querySelector(
  ".pokemon-type-container",
);

// TELA RESULTAOD BUSCA
const pokemonNameBusca = cardTelaBusca.querySelector(".pokemon-name");
const pokemonIdBusca = cardTelaBusca.querySelector(".pokemon-id");
const pokemonImgBusca = cardTelaBusca.querySelector(".pokemon-img");

const pokemonWeight = document.querySelector(".pokemon-weight");
const pokemonHeight = document.querySelector(".pokemon-height");
const pokemonAbilities = document.querySelector(".pokemon-abilities");
const btnSomPokemon = document.querySelector(".btn-som-pokemon");
const pokemonDescription = document.querySelector(".pokemon-description");

// TELA DETALHES
const pokemonNameDetalhes = cardTelaDetalhes.querySelector(".pokemon-name");
const pokemonIdDetalhes = cardTelaDetalhes.querySelector(".pokemon-id");
const pokemonImgDetalhes = cardTelaDetalhes.querySelector(".pokemon-img");
const pokemonContainerMoves = document.querySelector(
  ".pokemon-golpes-container",
);

// Progress bar dados de batalha
const barHp = document.getElementById("bar-hp");
const textHp = document.getElementById("text-hp");

const barAtk = document.getElementById("bar-atk");
const textAtk = document.getElementById("text-atk");

const barDef = document.getElementById("bar-def");
const textDef = document.getElementById("text-def");

const barSpa = document.getElementById("bar-spa");
const textSpa = document.getElementById("text-spa");

const barSpd = document.getElementById("bar-spd");
const textSpd = document.getElementById("text-spd");

const barSpe = document.getElementById("bar-spe");
const textSpe = document.getElementById("text-spe");

let searchPokemon = 1;
let somPokemonAtual = "";
let telaAtual = "inicial";

// TROCA DE TELAS COM O D-PAD
function mudarTela(novaTela) {
  telaAtual = novaTela;

  cardTelaInicial.setAttribute("hidden", "");
  cardTelaBusca.setAttribute("hidden", "");
  cardTelaDetalhes.setAttribute("hidden", "");
  cardTelaErro.setAttribute("hidden", "");

  if (novaTela === "inicial") {
    cardTelaInicial.removeAttribute("hidden");
  } else if (novaTela === "busca") {
    cardTelaBusca.removeAttribute("hidden");
  } else if (novaTela === "detalhes") {
    cardTelaDetalhes.removeAttribute("hidden");
  } else if (novaTela === "erro") {
    cardTelaErro.removeAttribute("hidden");
  }
}

// Função para buscar os dados do Pokemon na API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

// função para buscar os dados do tipo do Pokemon na API
const fetchPokemonType = async (tipoPokemon) => {
  const typeResponse = await fetch(
    `https://pokeapi.co/api/v2/type/${tipoPokemon}`,
  );

  if (typeResponse.status === 200) {
    const typeData = await typeResponse.json();
    return typeData;
  }
};

// função para buscar os dados de descrição do Pokemon na API (endpoint pokemon-species)
const fetchPokemonDescription = async (descriptionPokemon) => {
  const descriptionResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${descriptionPokemon}`,
  );

  if (descriptionResponse.status === 200) {
    const descriptionData = await descriptionResponse.json();
    return descriptionData;
  }
};

// função para traduzir descrição da PokéAPI usando Google Translate API
const traduzirTexto = async (txtEn) => {
  try {
    const response = await fetch("/api/traduzir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ texto: txtEn }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data.traduzido;
    }

    return txtEn; 
  } catch (error) {
    console.error("Erro ao conectar com a própria API:", error);
    return txtEn;
  }
};

// Função para buscar a árvore de evoluções
const fetchEvolutionChain = async (url) => {
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
};

//  Função para renderizar os dados do Pokemon nas respectivas tela
const renderPokemon = async (
  pokemon,
  isInitialLoad = false,
  isSearch = false,
) => {
  pokemonNameInicial.innerHTML = "Carregando...";

  const data = await fetchPokemon(pokemon);

  // acessa o tipo do Pokemon na API
  const typeData = data
    ? await fetchPokemonType(data.types[0].type.name)
    : null;

  // busca descrição do Pokemon na API
  const descriptionData = data ? await fetchPokemonDescription(data.id) : null;

  if (data) {
    // TELA INICIAL: renderiza o nome, número, gif e tipo do Pokemon
    pokemonIdInicial.innerHTML = `Nº ${data.id}`;
    pokemonNameInicial.innerHTML = data.name;

    // gif pokemon
    pokemonImgInicial.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ] ?? data["sprites"]["front_default"];

    // tipo do pokemon
    typeContainerInicial.innerHTML = `<img src=" ${
      typeData["sprites"]["generation-vi"]["omega-ruby-alpha-sapphire"][
        "name_icon"
      ]
    }" alt="tipo ${data.types[0].type.name}" />`;

    // se tiver mais de um tipo
    if (data.types[1]) {
      const anotherTypeData = await fetchPokemonType(data.types[1].type.name);

      typeContainerInicial.innerHTML += `<img src="${
        anotherTypeData["sprites"]["generation-vi"][
          "omega-ruby-alpha-sapphire"
        ]["name_icon"]
      }" alt="tipo ${data.types[1].type.name}" />`;
    }

    // TELA REUSLTADO BUSCA: renderiza o gif , nome, número, , peso, altura, habilidades, descrição e som do Pokemon

    pokemonImgBusca.src =
      data.sprites.versions["generation-v"]["black-white"].animated
        .front_default ?? data["sprites"]["front_default"];

    pokemonNameBusca.innerHTML = data.name;
    pokemonIdBusca.innerHTML = `Nº ${data.id}`;
    pokemonWeight.innerHTML = ` ${data.weight / 10} kg`;
    pokemonHeight.innerHTML = ` ${data.height / 10} m`;
    pokemonAbilities.innerHTML = ` ${data.abilities.map((ability) => ability.ability.name).join(", ")}`;

    // busca descrição em inglês
    if (descriptionData) {
      const descriptionEntry = descriptionData.flavor_text_entries.find(
        (desc) => desc.language.name === "en",
      );

      if (descriptionEntry) {
        const cleanText = descriptionEntry.flavor_text.replace(/[\f\n]/g, " ");

        pokemonDescription.innerHTML = "Traduzindo a descrição...";

        // chama função de tradução
        const textoTraduzido = await traduzirTexto(cleanText);

        // exibe descrição traduzida
        pokemonDescription.innerHTML = textoTraduzido;
      } else {
        pokemonDescription.innerHTML = "Descrição não disponível.";
      }
    }

    // acessa o som do pokemon e atualiza variável apra controlar som do pokemon
    somPokemonAtual = data.cries.latest;

    // TELA DETALHES: renderiza o nome, número, gif, características, golpes, dados de batalhae evolução do Pokemon

    // Pega a URL das evoluções e faz a requisição de nomes e gifs dos pokémons e renderiza na tela de detalhes
    if (descriptionData && descriptionData.evolution_chain) {
      const evolutionUrl = descriptionData.evolution_chain.url;
      const evolutionData = await fetchEvolutionChain(evolutionUrl);

      const evolutionNames = [];
      let evolucaoAtual = evolutionData.chain;

      // limta busca em 3 evoluções
      do {
        evolutionNames.push(evolucaoAtual.species.name);
        evolucaoAtual = evolucaoAtual.evolves_to[0];
      } while (evolucaoAtual && evolutionNames.length < 3);

      const evolutionContainer = document.getElementById("evolution-container");
      evolutionContainer.innerHTML = "";

      // Busca e renderiza/insere nomes e gifs
      for (let i = 0; i < evolutionNames.length; i++) {
        const pokeName = evolutionNames[i];

        const pokeDetails = await fetchPokemon(pokeName);

        const pokeGif =
          pokeDetails.sprites.versions["generation-v"]["black-white"].animated
            .front_default ?? pokeDetails.sprites.front_default;

        evolutionContainer.innerHTML += `
          <div class="evolution-item">
            <img src="${pokeGif}" alt="${pokeName}" class="evolution-img" />
            <span class="evolution-name">${pokeName}</span>
          </div>
        `;

        if (i < evolutionNames.length - 1) {
          evolutionContainer.innerHTML += `
            <span class="evolution-arrow">></span>
          `;
        }
      }
    }

    pokemonNameDetalhes.innerHTML = data.name;
    pokemonIdDetalhes.innerHTML = `Nº ${data.id}`;
    pokemonImgDetalhes.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ] ?? data["sprites"]["front_default"];

    // renderiza golpes do Pokemon limitando em 6
    const firstSixMoves = data.moves.slice(0, 6);

    pokemonContainerMoves.innerHTML = "";

    firstSixMoves.forEach((item) => {
      const moveNameFormated = item.move.name;
      pokemonContainerMoves.innerHTML += `
      <span class="pokemon-moves">${moveNameFormated}</span>
    `;
    });

    // renderiza os dados de batalha do Pokemon (HP, ATK, DEF, SPA, SPD, SPE)
    barHp.value = data.stats[0].base_stat;
    textHp.innerHTML = data.stats[0].base_stat;

    barAtk.value = data.stats[1].base_stat;
    textAtk.innerHTML = data.stats[1].base_stat;

    barDef.value = data.stats[2].base_stat;
    textDef.innerHTML = data.stats[2].base_stat;

    barSpa.value = data.stats[3].base_stat;
    textSpa.innerHTML = data.stats[3].base_stat;

    barSpd.value = data.stats[4].base_stat;
    textSpd.innerHTML = data.stats[4].base_stat;

    barSpe.value = data.stats[5].base_stat;
    textSpe.innerHTML = data.stats[5].base_stat;

    pokedexInput.value = "";
    searchPokemon = data.id;

    // CONTROLE EXIBIÇÃO DAS TELAS
    if (isInitialLoad) {
      mudarTela("inicial");
    } else if (isSearch) {
      mudarTela("busca");
    } else if (telaAtual === "erro") {
      mudarTela("inicial");
    }
  } else {
    mudarTela("erro");
  }
};

renderPokemon(searchPokemon, true);

// LÓGICA DO SOM POKÉMON
btnSomPokemon.addEventListener("click", () => {
  if (somPokemonAtual !== "") {
    const audio = new Audio(somPokemonAtual);
    audio.volume = 0.3;
    audio.play();
  }
});
