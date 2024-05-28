
import JogoService from "../services/jogoService.js";
import SoundEffectsService from "../services/soundEffectsService.js";
import Construcao from "../models/Construcao.js";
import ConstrucaoObserver from "../observadores/ConstrucaoObserver.js";
import InicializacaoClasses from "../inicializacaoClasses.js";

export function configurarEventosDesbloqueio(bloqueadorElemento, bloqueadorElementoValor, bloqueadorCorrentes, construcao, valor) {
    bloqueadorElemento.addEventListener("click", (event) => { 
        let dinheiro = JogoService.carregarDinheiroLocalStorage();
        if (dinheiro >= valor) { 
            const producaoObserver = new ConstrucaoObserver();
            let novaPontuacao = dinheiro - valor;
            JogoService.atualizarPontuacao(novaPontuacao);
            let construcoes = Construcao.carregarConstrucoesDoLocalStorage();
            let id = construcao.id - 1;
            let idDois = construcao.id;
            construcoes[id].status = 2;
            if (id != 7) {
                construcoes[idDois].status = 1;
            }
            
            SoundEffectsService.playRandomSound(SoundEffectsService.audioElements.audioElementsDesbloqueio);
            
            Construcao.salvarNoLocalStorage(construcoes);
            producaoObserver.updateConfiguracaoAparencia
            Construcao.criarParticula(event.clientX, event.clientY);
            bloqueadorElemento.classList.replace("bloqueadorConstrucao", "bloqueadorConstrucao2");
            bloqueadorElementoValor.remove();
            bloqueadorCorrentes.classList.replace("correntesBloqueador", "correntesBloqueador2");
            bloqueadorElemento.classList.add("animarParaLado");
            setTimeout(function () {
                bloqueadorElemento.remove();
            }, 1400);
            const jogo = document.querySelector(".jogo");
            const unlockElementoFrente = document.createElement("div");
            unlockElementoFrente.classList.add("unlockFrente");

            const unlockElementoTras = document.createElement("div");   
            unlockElementoTras.classList.add("unlockTras");

            const unlockElementoConstrucao = document.createElement("div");
            unlockElementoConstrucao.classList.add("unlockConstrucao");
            unlockElementoConstrucao.style.backgroundImage = `url(${InicializacaoClasses.getImagemConstrucaoPorId(construcao.id)})`;

            jogo.appendChild(unlockElementoTras);
            unlockElementoTras.appendChild(unlockElementoConstrucao);
            unlockElementoTras.appendChild(unlockElementoFrente);
            setTimeout(function () {
                unlockElementoFrente.classList.add("visible");
                unlockElementoTras.classList.add("visible");
                unlockElementoConstrucao.classList.add("visible");
            }, 100);
            setTimeout(function () {
                unlockElementoFrente.classList.add("balancar");
                unlockElementoTras.classList.add("balancar");
                unlockElementoConstrucao.classList.add("balancar");
            }, 1000);
            unlockElementoTras.addEventListener("click", () => {

                unlockElementoFrente.classList.add("invisible");
                unlockElementoTras.classList.add("invisible");
                unlockElementoConstrucao.classList.add("invisible");
                setTimeout(function () {
                    unlockElementoTras.remove();
                }, 900);
            });
        }
    });
}
