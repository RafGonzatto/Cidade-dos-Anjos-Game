import Upgrade from "../models/Upgrade.js";
import Construcao from "../models/Construcao.js";
import InicializacaoClasses from "../inicializacaoClasses.js";
import SoundEffectsService from "../services/soundEffectsService.js";
import { ajusteNumeroVendedores } from "../eventosTelaPrincipal/eventosVendedores.js";
import { atualizarTelaConquistas } from "./eventosConquistas.js";
export const configurarEventosUpgrade = (upgradeElement, upgrade) => {  
    const modal = document.querySelector('.upgrade-modal');
    upgradeElement.addEventListener('mouseenter', () => {
        upgradeElement.style.opacity = '0.8';
        InicializacaoClasses.criarModalUpgrades(upgradeElement, upgrade, "vendedores");
    });

    upgradeElement.addEventListener('mouseleave', () => {
        upgradeElement.style.opacity = '1';
        modal.style.display = 'none';
    });

    upgradeElement.addEventListener('click', () => {
        modal.style.display = 'none';
        SoundEffectsService.playRandomSound(SoundEffectsService.audioElements.audioElementsDesbloqueio);
        upgrade.status = 2;
        let construcaoObjeto = Construcao.obterConstrucaoPorId(upgrade.vinculo);
        Upgrade.salvarStatusDoUpgrade(upgrade);
        Construcao.comprarConstrucao(upgrade.vinculo, construcaoObjeto.quantidade, construcaoObjeto.producaoOriginal);
        upgradeElement.remove();
        let ordemCompra = Upgrade.carregarOrdemCompra(); 
        let ordemCompraFiltrados = ordemCompra.filter(ordemCompra => ordemCompra.id !== upgrade.id);
        localStorage.setItem('ordemCompra',  JSON.stringify(ordemCompraFiltrados));
        atualizarTelaConquistas(upgrade);
        ajusteNumeroVendedores();
    });
};

export const configurarEventosUpgradeTelaConquistas = (upgradeElement, upgrade) => {  
    upgradeElement.addEventListener('mouseenter', () => {
        upgradeElement.style.opacity = '0.8';
        const upgradeElemento = document.getElementById(`conquistas-upgrade-${upgrade.id}`)
        const image = upgradeElemento.querySelector('img').src;
        if (image.includes("upgrade-bloqueado")) {
          InicializacaoClasses.criarModalUpgradesBloqueados(upgradeElement);
        }
        else{
          InicializacaoClasses.criarModalUpgrades(upgradeElement, upgrade, "conquistas");
        }
    });

    upgradeElement.addEventListener('mouseleave', () => {
        const modal = document.querySelector('.upgrade-modal');
        upgradeElement.style.opacity = '1';
        modal.style.display = 'none';
    });
};
