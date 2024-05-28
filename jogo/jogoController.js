import JogoService from "./services/jogoService.js";
import Upgrade from "./models/Upgrade.js";
import { configurarEventosCaraGrande } from "./eventosTelaPrincipal/eventosCaraGrande.js";
import { configurarEventosConstrucoes } from "./eventosTelaPrincipal/eventosConstrucoes.js";
import { configurarEventosBotoesPagina } from "./eventosTelaPrincipal/eventosJogo.js";
import InicializacaoClasses from "./inicializacaoClasses.js";
import ConstrucaoObserver from "./observadores/ConstrucaoObserver.js";
class JogoController {
  constructor() {
    JogoService.setarConfiguracoesTela();
    JogoService.atualizarHTML();
    JogoService.iniciarAtualizacaoDinheiro();
    InicializacaoClasses.inicializarConstrucoesHTML();
    Upgrade.carregarTodosUpgradesDesbloqueados();
    this.producaoObserver = new ConstrucaoObserver();
    this.producaoObserver.updateProducao();
    this.producaoObserver.updateConfiguracaoAparencia();
    configurarEventosBotoesPagina();
    configurarEventosCaraGrande();
    configurarEventosConstrucoes();
    InicializacaoClasses.calcularTempoForaDaPagina();
    InicializacaoClasses.carregarPersonagensAcampamento();
    InicializacaoClasses.inicializarCidade();
    
  }
}
window.JogoController = new JogoController();
export default JogoController;
