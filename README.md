# 📕Pokédex Web - Projeto de Consumo de API e UI/UX 

![Capa do Projeto](/media/images/cover-projeto.jpg)

Uma aplicação web interativa que simula a experiência da clássica Pokédex dos jogos originais. Desenvolvida com foco em UI/UX e consumo de dados em tempo real, a aplicação permite aos usuários buscar, explorar e ouvir informações detalhadas sobre centenas de Pokémon.

## 🚀 Funcionalidades

A Pokédex foi desenhada para oferecer uma experiência imersiva e fluida, incorporando as seguintes funcionalidades:


* **Busca Inteligente:** Pesquisa de Pokémon por Nome ou Número (ID) integrada à tecla "OK" e ao formulário principal.
* **Controles Clássicos (D-Pad):** Navegação sequencial (Próximo/Anterior) pelos Pokémon e navegação vertical entre as telas (Inicial, Busca e Detalhes) utilizando os botões direcionais.

* **Dados detalhados sobre os Pokémons:**
  * Sprites animados (GIFs) padrão `Black-White`.
  * Tipagens dinâmicas com badges visuais.
  * Informações de biometria (Peso, Altura), Descrição, Habilidades e Características.
* **Estatísticas de Batalha (Stats):** Visualização de HP, ATK, DEF, Sp.A, Sp.D e SPE através de barras de progresso.
* **Cadeia de Evolução:** Busca na árevore de evolução que rastreia a `evolution_chain` do Pokémon e exibe os GIFs de até 3 estágios evolutivos.
* **Sound Design (Áudio Imersivo):** 
  * Trilha sonora ambiente clássica (Pokémon Center Theme) com botão de Liga/Desliga interativo.
  * Efeito sonoro autêntico (*Cry*) específico do Pokémon exibido em tela ao acionar o botão de "SOM".

## 🛠️ Tecnologias Utilizadas

O projeto foi construído visando explorar/consumir a PokéAPI de maneira a aprimorar os fundamentos do desenvolvimento Front-End, utilizando as seguintes tecnologias:

* **HTML5:** Estruturação semântica da interface, separação de contêineres lógicos e uso avançado de tags semânticas.
* **CSS3:** Estilização de componentes (*Flexbox* e *Grid*), responsividade, animações e manipulação *cross-browser* (Webkit/Moz).
* **JavaScript (ES6+):** 
  * Manipulação avançada do DOM e controle de estado de componentes.
  * Consumo de APIs RESTful utilizando **Async/Await** e a **Fetch API**.
  * Prevenção de concorrência e vazamento de memória em eventos de áudio e renderização.
* **[PokéAPI](https://pokeapi.co/):** API RESTful de consumo de dados (Endpoints utilizados: `/pokemon`, `/type`, `/pokemon-species`, `/characteristic`, `/evolution-chain`).

## 🔗😉👇 Acesse a Pokédex Web

O deploy da aplicação foi feito no Vercel, basta acessar através do seguinte link e ser feliz:
[Vercel | Pokédex Web](https://pokedex-webi.vercel.app/) 

Link do design de UI no Figma: [Figma | Pokédex Web](https://www.figma.com/design/wRCBfivnjHs5iVfbgqzNmV/Pok%C3%A9dex-Web-%7C-Pablo-Perdig%C3%A3o---Q1-V%C3%AAnus-manh%C3%A3-?node-id=127-361)



