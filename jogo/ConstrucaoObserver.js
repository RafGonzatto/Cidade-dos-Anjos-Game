import Observer from './Observer.js'; 
import Construcao from './Construcao.js';
import InicializacaoClasses from './inicializacaoClasses.js';

class ConstrucaoObserver extends Observer {
    updateProducao() {
        let dinheiroPorSegundo = 0;
        let construcaoObjeto = Construcao.carregarConstrucoesDoLocalStorage().filter(construcao => {
            return construcao.status === 3;
        });
        construcaoObjeto.forEach(construcao => {
            dinheiroPorSegundo += construcao.producao;
        }); 
        localStorage.setItem('dinheiroPorSegundo', parseFloat(dinheiroPorSegundo));
        const pontuacaoPorSegundoDiv = document.querySelector('.pontuacaoPorSegundo');
        pontuacaoPorSegundoDiv.innerHTML = `+ ${parseFloat(localStorage.dinheiroPorSegundo).toFixed(2)} reputação da gangue`;
    }
    updateConfiguracaoAparencia() { 
        let construcoesObjetos = Construcao.carregarConstrucoesDoLocalStorage();
        construcoesObjetos.forEach(construcao => {
            let construcaoElemento = document.getElementById(construcao.id);
            let bloqueadorElemento = document.getElementById("bloqueador" + construcao.id);
            switch(construcao.status) {
                case 0 :
                    construcaoElemento.style.display = "none";
                    break;
                case 1 :
                    construcaoElemento.style.display = "block";
                    if (!bloqueadorElemento) {
                    InicializacaoClasses.criarElementoBloqueado(construcaoElemento, construcao);
                    }
                    break;
                case 2 :
                    if (bloqueadorElemento) {
                        bloqueadorElemento.remove();
                    }
                    break;
            }
        })
    }
}

export default ConstrucaoObserver;
