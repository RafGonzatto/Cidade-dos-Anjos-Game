import JogoService from "./services/jogoService.js";
import Upgrade from "./models/Upgrade.js";
import { configurarEventosCaraGrande } from "./eventosTelaPrincipal/eventosCaraGrande.js";
import { configurarEventosConstrucoes } from "./eventosTelaPrincipal/eventosConstrucoes.js";
import { configurarEventosBotoesPagina } from "./eventosTelaPrincipal/eventosJogo.js";
import InicializacaoClasses from "./inicializacaoClasses.js";
import ConstrucaoObserver from "./observadores/ConstrucaoObserver.js";

class JogoController {
  constructor() {
    JogoService.atualizarHTML();
    JogoService.iniciarAtualizacaoDinheiro();
    InicializacaoClasses.inicializarConstrucoesHTML();
    Upgrade.carregarTodosUpgradesDesbloqueados();
    this.producaoObserver = new ConstrucaoObserver();
    this.update();
    configurarEventosBotoesPagina();
    configurarEventosCaraGrande();
    configurarEventosConstrucoes();
    InicializacaoClasses.calcularTempoForaDaPagina();
    InicializacaoClasses.carregarPersonagensAcampamento();
    InicializacaoClasses.inicializarCidade();
  }
  update() {
    this.producaoObserver.updateProducao();
    this.producaoObserver.updateConfiguracaoAparencia();
  }
}

window.JogoController = new JogoController();
export default JogoController;
