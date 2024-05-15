import InicializacaoClasses from "./inicializacaoClasses.js";
import JogoService from "./jogoService.js";

const imagensCara = InicializacaoClasses.imagensCara().map(url => {
  const img = new Image();
  img.src = url;
  return img;
});

const imagensCaraFerido = InicializacaoClasses.imagensCaraFerido().map(url => {
  const img = new Image();
  img.src = url;
  return img;
});

let indiceImagem = 0;
let indiceImagemFerido = 0;

export function particulaCaraClicada(x, y, offsetConfig) {
  let caraClicada = document.querySelector(".areaEsquerda");
  let particle = document.createElement("img");
  particle.setAttribute("src", "jogo/css/imagens/particula-sangue.png");
  particle.setAttribute("class", "particula-sangue");
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  let randomWidth = Math.floor(Math.random() * 20) + 20;
  let offset = "path('M10, 20 C50,10 100,10 30,500')";
  if (offsetConfig === 1) {
    offset = "path('M-10, -10 C-50,-10 -100,-10 -30,500')";
    particle.style.transform = "scaleY(-1)";
  }
  particle.style.width = randomWidth + "px";
  particle.style.offsetPath = offset;

  caraClicada.appendChild(particle);
  setTimeout(() => {
    caraClicada.removeChild(particle);
  }, 3000);
}
export function caraClicada() {
  let storage = JogoService.getStorage();
  let novaPontuacao = 1;
  let pontuacaoValor = storage.dinheiro;
  if (storage.upgrades.includes("upgrade-click")) {
    let multiplicador = storage.upgrades.filter(
      (upgrade) => upgrade == "upgrade-clique"
    ).length;
    if (multiplicador == 1) {
      novaPontuacao = parseFloat(pontuacaoValor) + 2;
    } else {
      novaPontuacao = pontuacaoValor + 2 ** multiplicador;
    }
  } else {
    novaPontuacao += parseFloat(pontuacaoValor);
  }
  JogoService.atualizarPontuacao(novaPontuacao);
}

export function trocarImagem(caraGrande) {
  indiceImagem = (indiceImagem + 1) % imagensCara.length;
  caraGrande.style.backgroundImage = `url(${imagensCara[indiceImagem].src})`;
}

export function trocarImagemFerido(caraGrande) {
  indiceImagemFerido = (indiceImagemFerido + 1) % imagensCaraFerido.length;
  caraGrande.style.backgroundImage = `url(${imagensCaraFerido[indiceImagemFerido].src})`;
}
