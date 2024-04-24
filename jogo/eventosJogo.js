import JogoService from './jogoService.js';

export function configurarEventosBotoesPagina() {  
    //Botão de Save - TRANSFORMAR EM MODAL
    const botaoSalvar = document.querySelector('.botao-salvar');
    botaoSalvar.addEventListener("click", () => {
       JogoService.salvarBackupJogo();     
    });
    ///Modal de Importar Save
    const botaoImportar = document.querySelector('.botao-importar');
    botaoImportar.addEventListener("click", () => {
        const modal = document.getElementById('modal-importar');
        modal.style.display = "block";
    });
    const fecharModal = document.querySelector('.fechar-modal');
    fecharModal.addEventListener("click", () => {
        const modal = document.getElementById('modal-importar');
        modal.style.display = "none";
    });
    const botaoAceitar = document.querySelector('.botao-aceitar');
    botaoAceitar.addEventListener("click", () => {
        JogoService.carregarBackupJogo();
    });
    const botaoCancelar = document.querySelector('.botao-cancelar');
    botaoCancelar.addEventListener("click", () => {
        const modal = document.getElementById('modal-importar');
        modal.style.display = "none";
    });

}