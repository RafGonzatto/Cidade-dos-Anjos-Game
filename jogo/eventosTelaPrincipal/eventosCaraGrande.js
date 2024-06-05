import {particulaCaraClicada, caraClicada, trocarImagem, trocarImagemFerido} from "../services/caraGrandeService.js";

import SoundEffectsService from "../services/soundEffectsService.js";

export function configurarEventosCaraGrande() {
  const caraGrande = document.querySelector(".caraGrande");
  var mousedownAtivado = false;
  let offsetConfig = 0;


  caraGrande.addEventListener("click", (e) => {
    particulaCaraClicada(e.clientX, e.clientY, offsetConfig);
    if (offsetConfig === 0) {
      offsetConfig = 1;
    } else {
      offsetConfig = 0;
    }
    caraClicada();
  });

  caraGrande.addEventListener("mouseover", function () {
    caraGrande.style.transform = "scale(1.1)";
    caraGrande.style.transition = "transform 0.2s ease";
    SoundEffectsService.playRandomSound(SoundEffectsService.audioElements.audioElementsStandby);
  });

  caraGrande.addEventListener("mouseup", function () {
    caraGrande.style.transform = "scale(1.1)";
    caraGrande.style.transition = "transform 0.2s ease";
  });

  caraGrande.addEventListener("mousedown", () => {
    caraGrande.style.transform = "scale(1)";
    caraGrande.style.transition = "transform 0.2s ease";
    mousedownAtivado = true;

     SoundEffectsService.playRandomSound(SoundEffectsService.audioElements.audioElementsPunch);

    trocarImagemFerido(caraGrande);
  });

  caraGrande.addEventListener("mouseout", function () {
    caraGrande.style.transform = "scale(1)";
    caraGrande.style.transition = "transform 0.5s ease";
  });

  caraGrande.addEventListener("mouseup", () => {
    mousedownAtivado = false;
  });
  setInterval(() => {
    if (!mousedownAtivado) {
      trocarImagem(caraGrande);
    }
  }, 500);
}
