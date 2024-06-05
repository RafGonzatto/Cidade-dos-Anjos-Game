import Upgrade from "../models/Upgrade.js";
export function configurarEventosVendedores() { debugger
    const botao = document.querySelector(".vendedoresBotao");
    let upgrades = Upgrade.carregarOrdemCompra();
    botao.innerHTML = `<span>0</span>`;
    if (upgrades.length > 0) {
        botao.innerHTML = `<span>${upgrades.length}</span>`;
    }
    const abaUpgrades = document.querySelector(".upgrades");
    
    botao.addEventListener("click", () => {
        abaUpgrades.style.display =  abaUpgrades.style.display === "flex" ? "none" : "flex";
    });
    botao.addEventListener("mouseenter", () => {
        console.log("Mouse entered the button");
        botao.classList.add("glow");
      });
  
      botao.addEventListener("mouseleave", () => {
        console.log("Mouse left the button");
        botao.classList.remove("glow");
      });
}