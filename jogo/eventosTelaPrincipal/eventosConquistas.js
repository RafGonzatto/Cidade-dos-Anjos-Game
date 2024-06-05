
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

