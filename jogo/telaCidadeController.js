import { configurarCidade, configurarPredios } from "./eventosCidade.js";

class TelaCidadeController {
  constructor() {
    configurarCidade();
    this.configuraBotaoVoltar();
    const predioGangues = document.querySelector(".predio-gangues");
    const predioPolicia = document.querySelector(".predio-policia");
    const predioIgreja = document.querySelector(".predio-igreja");
    configurarPredios(predioGangues);
    configurarPredios(predioPolicia);
    configurarPredios(predioIgreja);
  }

  configuraBotaoVoltar() {
    const botaoVoltar = document.querySelector(".botao-voltar");
    botaoVoltar.addEventListener("click", (event) => {
      window.history.back();
    });
  }
}

window.TelaCidadeController = new TelaCidadeController();
export default TelaCidadeController;
