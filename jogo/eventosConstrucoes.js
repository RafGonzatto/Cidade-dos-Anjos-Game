import Construcao from './Construcao.js';
import JogoService from './jogoService.js';
import Upgrade from './Upgrade.js';

export function configurarEventosConstrucoes() {
    let construcaoElements = document.querySelectorAll('.construcao > div');
    construcaoElements.forEach(construcaoElemento => { 
        construcaoElemento.addEventListener("click", (event) => {   
            // Verificar se o clique não ocorreu no elemento do bloqueador ou em seus pais
            let target = event.currentTarget;
            if (target.classList.contains('bloqueadorConstrucao2')) {
                // O clique ocorreu no elemento do bloqueador ou em um de seus pais
                return;
            }

            if (construcaoElemento.parentElement) {
                // Obter o ID da construção
                let identificacao = parseInt(construcaoElemento.parentElement.getAttribute('id'));
                
                // Obter os dados da construção do localStorage
                let construcaoObjeto = Construcao.carregarConstrucoesDoLocalStorage().find(construcao => {
                    return construcao.id === identificacao;
                });
                
                // Verificar se a construção existe e tem status válido
                if (construcaoObjeto && (construcaoObjeto.status === 2 || construcaoObjeto.status === 3)) {
                    // Obter o valor da construção e o dinheiro disponível
                    let valor = construcaoObjeto.valor;
                    let dinheiro = localStorage.dinheiro;
                    let dinheiroCorrigido = 0;

                    // Verificar se o jogador tem dinheiro suficiente para comprar a construção
                    if (valor <= dinheiro) {
                        dinheiroCorrigido = dinheiro - valor;
                        
                        // Atualizar a quantidade da construção
                        let quantidade = ++construcaoObjeto.quantidade;

                        // Realizar a compra da construção e desbloquear os upgrades
                        Construcao.comprarConstrucao(identificacao, quantidade, construcaoObjeto.producaoOriginal);
                        Upgrade.desbloquearUpgrades(identificacao, quantidade);

                        // Atualizar a pontuação e o HTML após a compra
                        JogoService.atualizarPontuacao(dinheiroCorrigido);
                       // JogoService.atualizarHTMLClick(identificacao);
                    }
                }
            }
        });
    });
}
