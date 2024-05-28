import Construcao from "../models/Construcao.js";
class JogoService {
  static setarConfiguracoesTela(){ 
    const fullscreen = localStorage.getItem('fullscreen');
    const isFullscreen = fullscreen === "true" ? true : false;
    const fullscreenCheckbox = document.getElementById('fullscreen-checkbox');
    if (isFullscreen ){
      fullscreenCheckbox.checked = true;
       window.setarTelaCheia(isFullscreen);
       return
    }
    fullscreenCheckbox.checked = false;
    const larguraSalva = parseInt(localStorage.getItem('larguraJanela'));
    const alturaSalva = parseInt(localStorage.getItem('alturaJanela'));

    if (larguraSalva > 1000) {
      window.alterarTamanhoDaJanela(larguraSalva, alturaSalva);
    }
  }
  static atualizarHTMLElemento(construcaoElemento, valor, quantidade) {
    if (construcaoElemento) {
      construcaoElemento.querySelector(".valorConstrucao span").textContent =
        valor;
      construcaoElemento.querySelector(
        ".quantidadeConstrucao span"
      ).textContent = quantidade;
    }
  }

  static atualizarHTMLClick(id) {
    let construcoesLocalStorage = JSON.parse(
      localStorage.getItem("construcoes")
    );
    if (construcoesLocalStorage && construcoesLocalStorage[id]) {
      let construcao = construcoesLocalStorage[id];
      let construcaoElemento = document.getElementById(id);
      this.atualizarHTMLElemento(
        construcaoElemento,
        construcao.valor,
        construcao.quantidade
      );
    }
  }

  static atualizarHTML() {
    let construcoes = Construcao.carregarConstrucoesDoLocalStorage();
    construcoes.forEach((construcao) => {
      let construcaoElemento = document.getElementById(construcao.id);
      this.atualizarHTMLElemento(
        construcaoElemento,
        construcao.valor,
        construcao.quantidade
      );
    });
  }

  static iniciarAtualizacaoDinheiro() {
    setInterval(() => {
      decodeURI;
      let dinheiroPorSegundo = parseFloat(localStorage.dinheiroPorSegundo);
      if (dinheiroPorSegundo > 0) {
        const dinheiroPorSegundoCorrigido = dinheiroPorSegundo / 10;
        const dinheiroNovo =
          parseFloat(localStorage.dinheiro) + dinheiroPorSegundoCorrigido;
        JogoService.atualizarPontuacao(dinheiroNovo);
        const horaFechada = new Date().getTime();
        localStorage.setItem("ultimaHoraFechada", horaFechada.toString());
      }
    }, 100);
  }

  static atualizarPontuacao(novaPontuacao) {
    let pontuacaoElement = document.querySelector(".pontuacao");
    pontuacaoElement.innerText = `${novaPontuacao.toFixed(
      2
    )} respeito nas ruas`;
    localStorage.setItem("dinheiro", novaPontuacao);
  }

  static carregarDinheiroLocalStorage() {
    let storage = JogoService.getStorage();
    let dinheiro = parseFloat(storage.dinheiro) || 0;
    return dinheiro;
  }

  static getStorage() {
    let dinheiro = parseFloat(localStorage.getItem("dinheiro")).toFixed(2) || 0;
    let dinheiroPorSegundo =
      parseFloat(localStorage.getItem("dinheiroPorSegundo")).toFixed(2) || 0;
    let upgrades = JSON.parse(localStorage.getItem("upgrades")) || [];
    let ultimaHoraFechada =
      parseInt(localStorage.getItem("ultimaHoraFechada")) || 0;
    return {
      dinheiro: dinheiro,
      dinheiroPorSegundo: dinheiroPorSegundo,
      upgrades: upgrades,
      ultimaHoraFechada: ultimaHoraFechada,
    };
  }
  static salvarBackupJogo() {
    const dados = JSON.stringify(localStorage);
    const blob = new Blob([dados], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "backup-cidade-dos-anjos.txt";
    link.click();
  }

  static carregarBackupJogo() {
    const arquivoBackup = document.getElementById("arquivo-backup").files[0];
    if (arquivoBackup) {
      const leitor = new FileReader();
      leitor.onload = function (evento) {
        const dados = evento.target.result;
        const localStorageBackup = JSON.parse(dados);
        for (const chave in localStorageBackup) {
          if (localStorageBackup.hasOwnProperty(chave)) {
            localStorage.setItem(chave, localStorageBackup[chave]);
          }
        }
        window.location.reload();
      };
      leitor.readAsText(arquivoBackup);
    } else {
      alert("Selecione um arquivo de backup para importar.");
    }
  }
}

export default JogoService;
