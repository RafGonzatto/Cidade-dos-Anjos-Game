export function configurarEventosConfiguracao() {
    const botaoAplicar = document.getElementById('botao-aplicar');
    botaoAplicar.addEventListener("click", () => { 
        const resolutionSelect = document.getElementById('resolution-select');
        const selectedResolution = JSON.parse(resolutionSelect.value);
           //gostaria de chamar metodo do preload aqui
           window.alterarTamanhoDaJanela(selectedResolution.width, selectedResolution.height);
    });

    const botaoVoltar = document.querySelector('.botao-voltar');
    botaoVoltar.addEventListener("click", () => { 
        const areaConfig = document.querySelector(".areaConfig");
        areaConfig.style.display = "none";
    });

    const fullscreenCheckbox = document.getElementById('fullscreen-checkbox');
    fullscreenCheckbox.addEventListener("click", () => {  debugger
        const fullscreen = fullscreenCheckbox.checked
        window.setarTelaCheia(fullscreen);
})}