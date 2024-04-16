import JogoService from './jogoService.js';

export function configurarEventosCaraGrande() {  
    const caraGrande = document.querySelector('.caraGrande');
    var mousedownAtivado = false;
    let offsetConfig = 0;
    caraGrande.addEventListener("click", (e) => {
        JogoService.particulaCaraClicada(e.clientX, e.clientY, offsetConfig);
        if (offsetConfig === 0) {
            offsetConfig = 1;
        } else {
            offsetConfig = 0;
        }
        JogoService.caraClicada();
    });

    caraGrande.addEventListener("mouseover", function() {
        caraGrande.style.transform = 'scale(1.1)';
        caraGrande.style.transition = 'transform 0.2s ease';
    });

    caraGrande.addEventListener("mouseup", function() {
        caraGrande.style.transform = 'scale(1.1)';
        caraGrande.style.transition = 'transform 0.2s ease';
    });

    caraGrande.addEventListener("mousedown", () => {
        caraGrande.style.transform = 'scale(1)';
        caraGrande.style.transition = 'transform 0.2s ease';
        mousedownAtivado = true;
        JogoService.trocarImagemFerido(caraGrande);
    });

    caraGrande.addEventListener("mouseout", function() {
        caraGrande.style.transform = 'scale(1)';
        caraGrande.style.transition = 'transform 0.5s ease';
    });

    caraGrande.addEventListener("mouseup", () => {
        mousedownAtivado = false;
    });

    setInterval(() => {
        if (!mousedownAtivado) {
            JogoService.trocarImagem(caraGrande);
        }
    }, 500);
}
