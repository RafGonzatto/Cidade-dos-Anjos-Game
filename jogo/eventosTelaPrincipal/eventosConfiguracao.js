export function configurarEventosConfiguracao() {
    const botaoAplicar = document.getElementById('botao-aplicar');
    botaoAplicar.addEventListener("click", () => { 
        const resolutionSelect = document.getElementById('resolution-select');
        const selectedResolution = JSON.parse(resolutionSelect.value);
        localStorage.setItem('larguraJanela', selectedResolution.width);
        localStorage.setItem('alturaJanela', selectedResolution.height);
        window.setarTelaCheia(false);
        localStorage.setItem('fullscreen', false);
        console.log(selectedResolution.width, typeof selectedResolution.width)
        window.alterarTamanhoDaJanela(selectedResolution.width, selectedResolution.height);
    });
    const fullscreenCheckbox = document.getElementById('fullscreen-checkbox');
    fullscreenCheckbox.addEventListener("click", () => {  debugger
        const fullscreen = fullscreenCheckbox.checked
        localStorage.setItem('fullscreen', fullscreen);
        window.setarTelaCheia(fullscreen);
    });

}