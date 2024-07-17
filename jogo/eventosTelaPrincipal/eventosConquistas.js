
import InicializacaoClasses from "../inicializacaoClasses.js";
import Upgrade from "../models/Upgrade.js";
import { configurarEventosUpgradeTelaConquistas } from "./eventosUpgrades.js";

export function carregarTodosUpgradesAtivadosTelaConquistas() { 
    let upgrades = Upgrade.carregarListaDeUpgrades();
    let upgradesContainer = document.querySelector('.areaUpgrades');
    upgrades.forEach(upgrade => {
        let upgradeElement = InicializacaoClasses.criarElementoUpgradeTelaUpgrade(upgrade);
        upgradesContainer.appendChild(upgradeElement);
        configurarEventosUpgradeTelaConquistas(upgradeElement, upgrade);
    });
}   
export function atualizarTelaConquistas(upgrade) {
    const upgradeElement = document.getElementById(`conquistas-upgrade-${upgrade.id}`);
    const imageElement = upgradeElement.querySelector('img');
    const iconeCaminho = InicializacaoClasses.getImagemUpgradePorId(upgrade.id);
    const timestamp = Date.now();
    imageElement.src = `${iconeCaminho}?t=${timestamp}`;
    configurarEventosUpgradeTelaConquistas(upgradeElement, upgrade);
}
