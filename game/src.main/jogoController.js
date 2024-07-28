import JogoService from "./services/jogoService.js";
import Upgrade from "./models/Upgrade.js";
import { configurarEventosCaraGrande } from "./eventosTelaPrincipal/eventosCaraGrande.js";
import { carregarTodosUpgradesAtivadosTelaConquistas } from "./eventosTelaPrincipal/eventosConquistas.js";
import { configurarEventosConstrucoes } from "./eventosTelaPrincipal/eventosConstrucoes.js";
import { configurarEventosBotoesPagina } from "./eventosTelaPrincipal/eventosBotoes.js";
import { configurarEventosConfiguracao } from "./eventosTelaPrincipal/eventosConfiguracao.js";
import { configurarMovimentacaoVendedores } from "./services/vendedoresService.js";
import { configurarEventosVendedores } from "./eventosTelaPrincipal/eventosVendedores.js";
import InicializacaoClasses from "./inicializacaoClasses.js";
import ConstrucaoObserver from "./observadores/ConstrucaoObserver.js";
class JogoController {
  constructor() {
    JogoService.setarConfiguracoesTela();
    JogoService.atualizarHTML();
    JogoService.iniciarAtualizacaoDinheiro();
    InicializacaoClasses.inicializarConstrucoesHTML();
    Upgrade.carregarTodosUpgradesDesbloqueados();
    configurarEventosConfiguracao();
    this.producaoObserver = new ConstrucaoObserver();
    this.producaoObserver.updateProducao();
    this.producaoObserver.updateConfiguracaoAparencia();
    configurarEventosBotoesPagina();
    configurarEventosCaraGrande();
    configurarEventosConstrucoes();
    configurarMovimentacaoVendedores();
    configurarEventosVendedores();
    carregarTodosUpgradesAtivadosTelaConquistas();
    InicializacaoClasses.calcularTempoForaDaPagina();
    InicializacaoClasses.carregarPersonagensAcampamento();
    InicializacaoClasses.inicializarCidade();
    
  }
}
window.JogoController = new JogoController();
export default JogoController;
