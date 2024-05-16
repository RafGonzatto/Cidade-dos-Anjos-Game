import JogoService from "../services/jogoService.js";
import { configurarEventosConfiguracao } from "./eventosConfiguracao.js";

export function configurarEventosBotoesPagina() {
  /////////////////////////SAVE
  const botaoSalvar = document.querySelector(".botao-salvar");
  botaoSalvar.addEventListener("mousedown", () => {
    botaoSalvar.style.backgroundImage = "url(jogo/css/imagens/botoes/save-botao-clicado.png)";
  });
  botaoSalvar.addEventListener("mouseup", () => {
    botaoSalvar.style.backgroundImage = "url(jogo/css/imagens/botoes/save-botao.png)";
      JogoService.salvarBackupJogo();
  });
  ////////////////////////SEGUIDORES
  const botaoSeguidores = document.querySelector(".botao-seguidores");
  botaoSeguidores.addEventListener("mousedown", () => {
    botaoSeguidores.style.backgroundImage = "url(jogo/css/imagens/botoes/follower-botao-clicado.png)";
  });
  botaoSeguidores.addEventListener("mouseup", () => {
    botaoSeguidores.style.backgroundImage = "url(jogo/css/imagens/botoes/follower-botao.png)";
  });
  ////////////////////////CONFIG
  const botaoConfig = document.querySelector(".botao-config");
  botaoConfig.addEventListener("mousedown", () => {
    
  const areaConfig = document.querySelector(".areaConfig");
    const resolutionSelect = document.getElementById('resolution-select');
    const resolutions = [
      { width: 800, height: 600 },
      { width: 1024, height: 768 },
      { width: 1280, height: 720 },
  ];
  resolutions.forEach(resolution => {
    const option = document.createElement('option');
    option.text = `${resolution.width}x${resolution.height}`;
    option.value = JSON.stringify(resolution); 
    resolutionSelect.add(option);
    areaConfig.style.display = "block";

});
    configurarEventosConfiguracao();
    botaoConfig.style.backgroundImage = "url(jogo/css/imagens/botoes/config-botao-clicado.png)";
  });
  botaoConfig.addEventListener("mouseup", () => {
    botaoConfig.style.backgroundImage = "url(jogo/css/imagens/botoes/config-botao.png)";
  });
  ////////////////////////CONQUISTAS
  const botaoConquistas = document.querySelector(".botao-conquistas");
  botaoConquistas.addEventListener("mousedown", () => {
    botaoConquistas.style.backgroundImage = "url(jogo/css/imagens/botoes/trophy-botao-clicado.png)";
  });
  botaoConquistas.addEventListener("mouseup", () => {
    botaoConquistas.style.backgroundImage = "url(jogo/css/imagens/botoes/trophy-botao.png)";
  });




  ///////////////////////MODAL
  const modal = document.getElementById("modal-importar");
  const botaoImportar = document.querySelector(".botao-importar");
  botaoImportar.addEventListener("mousedown", () => {
    botaoImportar.style.backgroundImage = "url(jogo/css/imagens/botoes/import-botao-clicado.png)";
  });
  botaoImportar.addEventListener("mouseup", () => {
    botaoImportar.style.backgroundImage = "url(jogo/css/imagens/botoes/import-botao.png)";
    modal.style.display = "block";
  });
  const inputFile = document.getElementById("arquivo-backup");
    const nomeArquivoContainer = document.getElementById("input-import");

    inputFile.addEventListener("change", () => { 
        if (inputFile.files.length > 0) {
            const nomeArquivo = (inputFile.files[0].name).substring(0,14)+"...";
            nomeArquivoContainer.textContent = `Selecionar Arquivo\u2001\u2001\u2001'${nomeArquivo}`;
        } else {
            nomeArquivoContainer.textContent = "Selecionar Arquivo";
        }
    });
  const fecharModal = document.querySelector(".fechar-modal");
  fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  const botaoAceitar = document.querySelector(".botao-aceitar");
  botaoAceitar.addEventListener("mousedown", () => {
    botaoAceitar.style.backgroundImage = "url(jogo/css/imagens/botoes/ok-botao-clicado.png)";
  });
  botaoAceitar.addEventListener("mouseup", () => {
    botaoAceitar.style.backgroundImage = "url(jogo/css/imagens/botoes/ok-botao.png)";
    JogoService.carregarBackupJogo();
  });
  const botaoCancelar = document.querySelector(".botao-cancelar");
  botaoCancelar.addEventListener("mousedown", () => {
    botaoCancelar.style.backgroundImage = "url(jogo/css/imagens/botoes/cancel-botao-clicado.png)";
  });
  botaoCancelar.addEventListener("mouseup", () => {
      botaoCancelar.style.backgroundImage = "url(jogo/css/imagens/botoes/cancel-botao.png)";
      modal.style.display = "none";
  });
  
}
