import { configurarCidade } from "./eventosTelaCidade/eventosCidade.js";
import {configurarPredios} from "./eventosTelaCidade/eventosPredios.js"

class TelaCidadeController {
  constructor() {
    this.configuraBotaoVoltar();
    configurarCidade();
    const predioGangues = document.querySelector(".predio-gangues");
    const predioPolicia = document.querySelector(".predio-policia");
    const predioIgreja = document.querySelector(".predio-igreja");
    configurarPredios(predioGangues);
    configurarPredios(predioPolicia);
    configurarPredios(predioIgreja);
  }

  configuraBotaoVoltar() {
    const botaoVoltar = document.querySelector(".botao-voltar");
    botaoVoltar.style.left = "0px";
    botaoVoltar.addEventListener("click", (event) => {
      window.history.back();
    });
  }
}

window.TelaCidadeController = new TelaCidadeController();
export default TelaCidadeController;
