
// lógica da tela de Splash e controle da música de fundo
const startSplashScreen = document.getElementById("start-btn");
const splashScreen = document.getElementById("splash-screen");
const pokedexApp = document.getElementById("pokedex-app");

startSplashScreen.addEventListener("click", () => {
  splashScreen.setAttribute("hidden", "");
  pokedexApp.removeAttribute("hidden");

  bgMusic.volume = 0.2; 
  bgMusic.play();
});

// LÓGICA DE NAVEGAÇÃO DO D-PAD
const arrowUp = document.querySelector(".btn-up");
const arrowDown = document.querySelector(".btn-down");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnOk = document.querySelector(".btn-ok");

// setas verticais (Up / Down):
arrowUp.addEventListener("click", () => {
  if (telaAtual === "inicial") {
    mudarTela("busca");
  } else if (telaAtual === "busca") {
    mudarTela("detalhes");
  }
});

arrowDown.addEventListener("click", () => {
  if (telaAtual === "detalhes") {
    mudarTela("busca");
  } else if (telaAtual === "busca") {
    mudarTela("inicial");
  }
});

// Setas Laterais (Prev / Next): 
btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon); 
  }
});

btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

// LÓGICA DE BUSCA (FORMULÁRIO E BTN OK)
const pokedexForm = document.querySelector(".form");
const pokedexInput = document.querySelector(".input-search");

pokedexForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  renderPokemon(pokedexInput.value.toLowerCase(), false, true); 
});

btnOk.addEventListener("click", () => {
  if (pokedexInput.value !== "") {
    renderPokemon(pokedexInput.value.toLowerCase(), false, true);
  }
});

// LÓGICA DOS BOTÕES DETALHES / VOLTAR 
const btnDetalhes = document.querySelector(".btn-detalhes");
const btnVoltar = document.querySelector(".btn-voltar");

btnDetalhes.addEventListener('click', () => {
  mudarTela("detalhes");
});

btnVoltar.addEventListener('click', () => {
  mudarTela("busca");
});

// LÓGICA DE ÁUDIO POKÉDEX
const bgMusic = document.getElementById("bg-music");
const btnAudio = document.querySelector(".btn-audio");
const statusBtnAudio = document.querySelector(".status-btn");
const txtBtnAudio = document.querySelector(".txt-btn");

btnAudio.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    txtBtnAudio.innerHTML = "on";
    statusBtnAudio.style.background = "#3BC560";
    statusBtnAudio.style.boxShadow = "0 0 4px 2px #3BC560";
  } else {
    bgMusic.pause();
    txtBtnAudio.innerHTML = "off";
    statusBtnAudio.style.background = "#555";
    statusBtnAudio.style.boxShadow = "0 0 4px 2px #615C5C";
  }
});