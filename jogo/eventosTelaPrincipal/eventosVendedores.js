import Upgrade from "../models/Upgrade.js";
export function configurarEventosVendedores() {
    const botao = document.querySelector(".vendedoresBotao");
    const abaUpgrades = document.querySelector(".upgrades");
    ajusteNumeroVendedores();
    botao.addEventListener("click", () => {
        abaUpgrades.style.display =  abaUpgrades.style.display === "flex" ? "none" : "flex";
    });
    botao.addEventListener("mouseenter", () => {
        botao.classList.add("glow");
      });
  
      botao.addEventListener("mouseleave", () => {
        botao.classList.remove("glow");
      });
}

export function ajusteNumeroVendedores() {
    const botao = document.querySelector(".vendedoresBotao");
    let upgrades = Upgrade.carregarOrdemCompra();
    botao.innerHTML = `<span>0</span>`;
    if (upgrades.length > 0) {
        botao.innerHTML = `<span>${upgrades.length}</span>`;
    }
}
