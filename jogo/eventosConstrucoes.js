import Construcao from './Construcao.js';
import JogoService from './jogoService.js';
import Upgrade from './Upgrade.js';

export function configurarEventosConstrucoes() {
    let construcaoElements = document.querySelectorAll('.construcao > div');
    construcaoElements.forEach(construcaoElemento => { 
        construcaoElemento.addEventListener("click", (event) => {   
            let target = event.currentTarget;
            if (target.classList.contains('bloqueadorConstrucao2')) {
                return;
            }

            if (construcaoElemento.parentElement) {
                let identificacao = parseInt(construcaoElemento.parentElement.getAttribute('id'));
                let construcaoObjeto = Construcao.carregarConstrucoesDoLocalStorage().find(construcao => {
                    return construcao.id === identificacao;
                });
                
                if (construcaoObjeto && (construcaoObjeto.status === 2 || construcaoObjeto.status === 3)) {
                    let valor = construcaoObjeto.valor;
                    let dinheiro = localStorage.dinheiro;
                    let dinheiroCorrigido = 0;
                    if (valor <= dinheiro) {
                        dinheiroCorrigido = dinheiro - valor;
                        let quantidade = ++construcaoObjeto.quantidade;
                        Construcao.comprarConstrucao(identificacao, quantidade, construcaoObjeto.producaoOriginal);
                        Upgrade.desbloquearUpgrades(identificacao, quantidade);
                        JogoService.atualizarPontuacao(dinheiroCorrigido);
                    }
                }
            }
        });
    });
}
