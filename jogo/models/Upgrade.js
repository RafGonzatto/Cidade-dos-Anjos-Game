import InicializacaoClasses from "../inicializacaoClasses.js";
import { configurarEventosUpgrade} from "../eventosTelaPrincipal/eventosUpgrades.js";

class Upgrade {
    constructor(id, quantidadeDesbloqueio, vinculo, valor, titulo, descricao, descricaoBuff, tipoBuff, status) {
        this.id = id;
        this.quantidadeDesbloqueio = quantidadeDesbloqueio;
        this.vinculo = vinculo;
        this.valor = valor;
        this.titulo = titulo;
        this.descricao = descricao;
        this.descricaoBuff = descricaoBuff;
        this.tipoBuff = tipoBuff; //Tipo1 2x //Tipo2 3% de cps //Tipo 3 10% cps
        this.status = status; //0 bloqueado // 1 desbloqueado// 2 ativado
    }

    static desbloquearUpgrades(id, quantidade) {
        let upgrades = this.carregarListaDeUpgrades();
        let upgradesFiltrados = upgrades.filter(upgrade => {
            return upgrade.vinculo === id &&
                upgrade.quantidadeDesbloqueio <= quantidade &&
                upgrade.status === 0;
        });
        if (upgradesFiltrados.length > 0) {
            upgradesFiltrados.forEach(upgradeFiltrado => {
                upgrades.forEach(upgrade => {
                    if (upgrade.id === upgradeFiltrado.id) {
                        upgrade.status = 1;
                    }
                });
            }); 
            this.salvarListaDeUpgrades(upgrades);
            this.carregarUpgradeDesbloqueados(upgradesFiltrados);
            let ordemCompra = this.carregarOrdemCompra();
            let listaOrdemCompra = ordemCompra.concat(upgradesFiltrados);
            localStorage.setItem('ordemCompra', JSON.stringify(listaOrdemCompra));
        }
    }
    
    static carregarUpgradeDesbloqueados(upgradesFiltrados) {
            let upgradesContainer = document.querySelector('.upgrades');
            upgradesFiltrados.forEach(upgrade => {
                let upgradeElement = this.criarElementoUpgrade(upgrade);
                upgradesContainer.appendChild(upgradeElement);
                configurarEventosUpgrade(upgradeElement, upgrade);
            });
    }
    static carregarTodosUpgradesDesbloqueados() {
        let ordemCompra = this.carregarOrdemCompra();
        if (ordemCompra){
        let upgradesContainer = document.querySelector('.upgrades');
        ordemCompra.forEach(upgrade => {
            let upgradeElement = this.criarElementoUpgrade(upgrade);
            upgradesContainer.appendChild(upgradeElement);
            configurarEventosUpgrade(upgradeElement, upgrade);
        });
    }   
    }

    static criarElementoUpgrade(upgrade) {
        let upgradeElement = document.createElement('div');
        upgradeElement.classList.add('upgrade');
        upgradeElement.id = `upgrade-${upgrade.id}`;
        let imgElement = document.createElement('img');
        imgElement.src = InicializacaoClasses.getImagemUpgradePorId(upgrade.id);
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover';
        imgElement.style.display = 'block';
        imgElement.style.imageRendering = 'pixelated';
        upgradeElement.appendChild(imgElement);
        return upgradeElement;
    }
    static salvarListaDeUpgrades(upgrades) {
        localStorage.setItem('upgrades', JSON.stringify(upgrades));
    }

    static carregarListaDeUpgrades() {
        let upgradesString = localStorage.getItem('upgrades');
        if (upgradesString) {
            return JSON.parse(upgradesString);
        } else {
            return InicializacaoClasses.inicializarListaUpgrades();
        }
    }
    static carregarOrdemCompra() {
        let ordemCompra = localStorage.getItem('ordemCompra');
        if (ordemCompra) {
            return JSON.parse(ordemCompra);
        } else {
            return ordemCompra = [];
        }
    }

    static salvarStatusDoUpgrade(upgrade) {
        let upgrades = this.carregarListaDeUpgrades();
        let index = upgrades.findIndex(u => u.id === upgrade.id);
        if (index !== -1) {
            upgrades[index].status = upgrade.status;
            this.salvarListaDeUpgrades(upgrades);
        } else {
            console.error(`Upgrade com ID ${upgrade.id} não encontrado.`);
        }
    }

}

export default Upgrade;
