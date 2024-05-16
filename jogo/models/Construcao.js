import ConstrucaoObserver from "../observadores/ConstrucaoObserver.js";
import Upgrade from "./Upgrade.js";
import InicializacaoClasses from "../inicializacaoClasses.js";

class Construcao {
    constructor(id, nome, valor, producaoOriginal, producao, quantidade, status) {
        this.id = id;
        this.valor = valor;
        this.nome = nome;
        this.producaoOriginal = producaoOriginal;
        this.producao = producao;
        this.quantidade = quantidade;
        this.status = status; //0 invisivel,1 bloqueado, 2desbloqueado, 3ativado
        this.observers = []; 
        this.addObserver(new ConstrucaoObserver());
    }

    addObserver(observer) {
        this.observers.push(observer);
    }
    
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    
    notifyObservers(operacao) {
        if(operacao === "producao"){
            this.observers.forEach(observer => {
                observer.updateProducao(this); 
            });
        }
        if (operacao === "visibilidade"){
            this.observers.forEach(observer => {
                observer.updateConfiguracaoAparencia(this); 
            });
        }
    }
    
    static comprarConstrucao(id, quantidade, producaoOriginal) { 
        const upgradesFiltrados = Upgrade.carregarListaDeUpgrades().filter(upgrade => {
            return upgrade.status === 2 && upgrade.vinculo === id;
        });
        const upgrades2x = upgradesFiltrados.filter(upgrade => {
            return upgrade.tipoBuff === 1;
        });
        let producao = producaoOriginal * quantidade * Math.pow(2, upgrades2x.length);
        if(quantidade ===1){
            InicializacaoClasses.criarPersonagemAcampamento(id);
        }
        this.atualizarDadosConstrucaoLocal(id, producao, quantidade);
    }

    static atualizarDadosConstrucaoLocal(id, producao, quantidade) {  
        --id;
        let construcoesLocalStorage = JSON.parse(localStorage.getItem('construcoes'));
        if (construcoesLocalStorage && construcoesLocalStorage[id]) {
            let construcao = construcoesLocalStorage[id]; 
            construcao.quantidade = quantidade; 
            construcao.status = 3;
            construcao.valor = Math.floor(construcao.valor * 1.2);
            construcao.producao = producao; 
            construcoesLocalStorage[id] = construcao;
            if (quantidade === 1 && id !=7) {
                let novoId = ++id;
                let construcaoSeguinte = construcoesLocalStorage[novoId];
                if (construcaoSeguinte.status === 0) {
                    construcaoSeguinte.status = 1;
                    construcoesLocalStorage[novoId] = construcaoSeguinte;
            }
            }
            localStorage.setItem('construcoes', JSON.stringify(construcoesLocalStorage));
    
            this.atualizarConstrucaoHTML(construcao); 
    
            const observador = new Construcao();
            observador.notifyObservers("producao");
            observador.notifyObservers("visibilidade");
        }
    }
    
    static atualizarConstrucaoHTML(construcao) {
        let construcaoElemento = document.getElementById(construcao.id);
        if (construcaoElemento) {
            construcaoElemento.querySelector('.quantidadeConstrucao span').textContent = construcao.quantidade;
            construcaoElemento.querySelector('.valorConstrucao span').textContent = "Valor: " + construcao.valor;
        }
    }

    static salvarNoLocalStorage(construcoes) {  
        localStorage.setItem('construcoes', JSON.stringify(construcoes));
    }

    static carregarConstrucoesDoLocalStorage() {
        let construcoesLocalStorage = JSON.parse(localStorage.getItem('construcoes'));
        if (!construcoesLocalStorage) {
            let construcoes = InicializacaoClasses.inicializarConstrucoesPadrao();
            this.salvarNoLocalStorage(construcoes);
            return construcoes;
        } else {
            return construcoesLocalStorage.map(construcao => 
                new Construcao(construcao.id, construcao.nome, construcao.valor, construcao.producaoOriginal, construcao.producao, construcao.quantidade, construcao.status)
            );
        }
    }
    static obterConstrucaoPorId(vinculo){
        let construcaoFiltrada = this.carregarConstrucoesDoLocalStorage().find(construcao => {
            return construcao.id === vinculo;
        });
        return construcaoFiltrada;
    }
    
    static criarParticula(mouseX, mouseY) {
        const particula = document.createElement("div");
        particula.classList.add("correntesBloqueadorParticulas");
        particula.style.left = (mouseX - 40) + "px";
        particula.style.top = (mouseY - 60 )+ "px";

        document.body.appendChild(particula); 
        setTimeout(() => {
            particula.remove();
        }, 1000);
    }

}

export default Construcao;
