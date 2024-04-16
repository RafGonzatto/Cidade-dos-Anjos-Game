import JogoService from './jogoService.js';
import Upgrade from './Upgrade.js';
import Construcao from './Construcao.js';
import { configurarEventosCaraGrande } from './eventosCaraGrande.js';
import { configurarEventosConstrucoes } from './eventosConstrucoes.js';
import { configurarEventosBotoesPagina } from './eventosJogo.js';
import InicializacaoClasses from './inicializacaoClasses.js';
import ConstrucaoObserver from './ConstrucaoObserver.js';

class JogoController {
    constructor() { 
    JogoService.atualizarHTML();
    JogoService.iniciarAtualizacaoDinheiro();
    InicializacaoClasses.inicializarConstrucoesHTML();
    Upgrade.carregarTodosUpgradesDesbloqueados()
    this.producaoObserver = new ConstrucaoObserver();
    this.update();
    configurarEventosBotoesPagina();
    configurarEventosCaraGrande();
    configurarEventosConstrucoes(); 
    InicializacaoClasses.calcularTempoForaDaPagina();
    InicializacaoClasses.carregarPersonagensAcampamento();
    InicializacaoClasses.configurarCidade();
    }
    update() {
        this.producaoObserver.updateProducao();
        this.producaoObserver.updateConfiguracaoAparencia();
    }
}

window.JogoController = new JogoController;
export default JogoController;
