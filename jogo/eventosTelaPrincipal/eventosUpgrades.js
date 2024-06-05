import Upgrade from "../models/Upgrade.js";
import Construcao from "../models/Construcao.js";
import InicializacaoClasses from "../inicializacaoClasses.js";
import SoundEffectsService from "../services/soundEffectsService.js";
export const configurarEventosUpgrade = (upgradeElement, upgrade) => {  
    const modal = document.querySelector('.upgrade-modal');
    const modalTitulo = document.querySelector('.upgrade-titulo');
    const modalDescricao = document.querySelector('.upgrade-descricao');
    const modalDescricaoBuff = document.querySelector('.upgrade-descricaoBuff');
    const modalValor = document.querySelector('.upgrade-valor');
    const modalImagem = document.querySelector('.upgrade-imagem');

    upgradeElement.addEventListener('mouseenter', () => {
        upgradeElement.style.opacity = '0.8';
        const elementId = upgradeElement.id.split('-')[1];
        let iconeCaminho = InicializacaoClasses.getImagemUpgradePorId(elementId)
        let upgrades = JSON.parse(localStorage.getItem('upgrades'));
        const upgrade = upgrades.find(upg => upg.id == elementId);

        if (upgrade) {
            const ancora = document.querySelector('.separadorDireita').getBoundingClientRect();
            const upgradeRect = upgradeElement.getBoundingClientRect();
            modal.style.top = `${(upgradeRect.top - 20)}px`;
            modal.style.left = `${ancora.left - 325}px`;
            modal.style.position = 'fixed';
            modalImagem.style.backgroundImage =  `url(${iconeCaminho})`;
            modalTitulo.textContent = `${upgrade.titulo}`;
            modalDescricao.textContent = `"${upgrade.descricao}"`;
            modalDescricaoBuff.textContent = `${upgrade.descricaoBuff}`;
            modalValor.textContent = `$${upgrade.valor}`;
            modal.style.display = 'block';
        }
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
    });
};

export const configurarEventosUpgradeTelaConquistas = (upgradeElement, upgrade) => {  
    const modal = document.querySelector('.upgrade-modal');
    const modalTitulo = document.querySelector('.upgrade-titulo');
    const modalDescricao = document.querySelector('.upgrade-descricao');
    const modalDescricaoBuff = document.querySelector('.upgrade-descricaoBuff');
    const modalValor = document.querySelector('.upgrade-valor');
    const modalImagem = document.querySelector('.upgrade-imagem');

    upgradeElement.addEventListener('mouseenter', () => {
        upgradeElement.style.opacity = '0.8';
        const elementId = upgradeElement.id.split('-')[1];
        let iconeCaminho = InicializacaoClasses.getImagemUpgradePorId(elementId)
        let upgrades = JSON.parse(localStorage.getItem('upgrades'));
        const upgrade = upgrades.find(upg => upg.id == elementId);

        if (upgrade) {
            const upgradeRect = upgradeElement.getBoundingClientRect();
            modal.style.top = `${(upgradeRect.top - 175)}px`;
            modal.style.left = `${(upgradeRect.left - 20)}px`;
            modalImagem.style.backgroundImage =  `url(${iconeCaminho})`;
            modalTitulo.textContent = `${upgrade.titulo}`;
            modalDescricao.textContent = `"${upgrade.descricao}"`;
            modalDescricaoBuff.textContent = `${upgrade.descricaoBuff}`;
            modalValor.textContent = `$${upgrade.valor}`;
            modal.style.display = 'block';
        }
    });

    upgradeElement.addEventListener('mouseleave', () => {
        upgradeElement.style.opacity = '1';
        modal.style.display = 'none';
    });
};
