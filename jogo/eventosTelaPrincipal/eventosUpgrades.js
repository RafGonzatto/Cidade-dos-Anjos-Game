import Upgrade from "../models/Upgrade.js";
import Construcao from "../models/Construcao.js";

const configurarEventosUpgrade = (upgradeElement, upgrade) => {
    upgradeElement.addEventListener('mouseenter', () => {
        upgradeElement.style.opacity = '0.8';
    });

    upgradeElement.addEventListener('mouseleave', () => {
        upgradeElement.style.opacity = '1';
    });

    upgradeElement.addEventListener('click', () => {
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

export { configurarEventosUpgrade };
