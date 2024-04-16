import JogoService from './jogoService.js';

export function configurarEventosBotoesPagina() {  
    const botaoSalvar = document.querySelector('.botao-salvar');
    //var mousedownAtivado = false;
    botaoSalvar.addEventListener("click", () => {
       JogoService.salvarBackupJogo();     
    });
   // Adicionando evento de clique ao botão "Importar Backup"
    const botaoImportar = document.querySelector('.botao-importar');
    botaoImportar.addEventListener("click", () => {
        const modal = document.getElementById('modal-importar');
        modal.style.display = "block";
    });

    // Fechar o modal ao clicar no botão de fechar
    const fecharModal = document.querySelector('.fechar-modal');
    fecharModal.addEventListener("click", () => {
        const modal = document.getElementById('modal-importar');
        modal.style.display = "none";
    });

    // Lidar com o clique no botão "Aceitar"
    const botaoAceitar = document.querySelector('.botao-aceitar');
    botaoAceitar.addEventListener("click", () => {
        JogoService.carregarBackupJogo();
    });

    // Lidar com o clique no botão "Cancelar"
    const botaoCancelar = document.querySelector('.botao-cancelar');
    botaoCancelar.addEventListener("click", () => {
        const modal = document.getElementById('modal-importar');
        modal.style.display = "none";
    });

}
//        JogoService.carregarBackupJogo();   