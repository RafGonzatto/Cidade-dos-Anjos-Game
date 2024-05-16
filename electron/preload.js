const { ipcRenderer } = require('electron');

window.alterarTamanhoDaJanela = function(width, height) {
   
    ipcRenderer.send('alterar-tamanho-da-janela', { width, height });
};

window.setarTelaCheia = function(checkBoxResult) {
    ipcRenderer.send('setar-tela-cheia', { checkBoxResult});
};
