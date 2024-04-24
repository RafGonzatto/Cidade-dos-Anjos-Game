import Construcao from './Construcao.js';
import Upgrade from './Upgrade.js';
import InicializacaoClasses from './inicializacaoClasses.js';
class JogoService {
    static estadosCaraGrande = ['estado1', 'estado2', 'estado3'];
    static estadoAtual = 0; 
    static indiceImagem = 0;

    static atualizarHTMLElemento(construcaoElemento, valor, quantidade){
        if (construcaoElemento) { 
            construcaoElemento.querySelector('.valorConstrucao span').textContent = valor;
            construcaoElemento.querySelector('.quantidadeConstrucao span').textContent = quantidade;
        }
    }
    static atualizarHTMLClick(id) {
        let construcoesLocalStorage = JSON.parse(localStorage.getItem('construcoes'));
        if (construcoesLocalStorage && construcoesLocalStorage[id]) {
            let construcao = construcoesLocalStorage[id];
            let construcaoElemento = document.getElementById(id);
            this.atualizarHTMLElemento(construcaoElemento, construcao.valor, construcao.quantidade);
        }
    }
    
    static atualizarHTML(){  
        let construcoes = Construcao.carregarConstrucoesDoLocalStorage();
        construcoes.forEach(construcao => { 
            let construcaoElemento = document.getElementById(construcao.id);
            this.atualizarHTMLElemento(construcaoElemento, construcao.valor, construcao.quantidade);
        });
    }
    static iniciarAtualizacaoDinheiro(){ 
        setInterval(() => { decodeURI
            let dinheiroPorSegundo = parseFloat(localStorage.dinheiroPorSegundo);
            if (dinheiroPorSegundo > 0) {
                const dinheiroPorSegundoCorrigido = dinheiroPorSegundo / 10;
                const dinheiroNovo = parseFloat(localStorage.dinheiro) + dinheiroPorSegundoCorrigido;
                JogoService.atualizarPontuacao(dinheiroNovo);
                const horaFechada = new Date().getTime();
                localStorage.setItem('ultimaHoraFechada', horaFechada.toString());
            }
        }, 100); 
    }
    static caraClicada() {     
        let storage = JogoService.getStorage();
        let novaPontuacao = 1;
        let pontuacaoValor = storage.dinheiro;
        if (storage.upgrades.includes("upgrade-click")) {
            let multiplicador = storage.upgrades.filter(upgrade => upgrade == "upgrade-clique").length;
            if (multiplicador == 1) {
                novaPontuacao = parseFloat(pontuacaoValor) + 2;
            } else {
                novaPontuacao = pontuacaoValor + (2 ** multiplicador);
            }
        } else {
            novaPontuacao += parseFloat(pontuacaoValor);
        }
        JogoService.atualizarPontuacao(novaPontuacao);
    }
    static atualizarPontuacao(novaPontuacao){ 
        let pontuacaoElement = document.querySelector('.pontuacao');
        pontuacaoElement.innerText = `${novaPontuacao.toFixed(2)} respeito nas ruas`;
        localStorage.setItem("dinheiro", novaPontuacao);
    } 
    static  carregarDinheiroLocalStorage() { 
        let storage = JogoService.getStorage();
        let dinheiro = parseFloat(storage.dinheiro) || 0;
        return dinheiro;
    }
    static getStorage() {
        let dinheiro = parseFloat(localStorage.getItem("dinheiro")).toFixed(2) || 0;
        let dinheiroPorSegundo = parseFloat(localStorage.getItem("dinheiroPorSegundo")).toFixed(2) || 0;
        let upgrades = JSON.parse(localStorage.getItem("upgrades")) || [];
        let ultimaHoraFechada = parseInt(localStorage.getItem("ultimaHoraFechada")) || 0;
        return {
            dinheiro: dinheiro,
            dinheiroPorSegundo: dinheiroPorSegundo,
            upgrades: upgrades,
            ultimaHoraFechada : ultimaHoraFechada
        };
    }
    static particulaCaraClicada(x,y, offsetConfig){ 
        let caraClicada = document.querySelector(".areaEsquerda")
        let particle = document.createElement("img");
        particle.setAttribute("src", "jogo/css/imagens/particula-sangue.png");
        particle.setAttribute("class", "particula-sangue");
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        let randomWidth = Math.floor(Math.random() * 20) + 20; 
        let offset = "path('M10, 20 C50,10 100,10 30,500')";
        if (offsetConfig === 1){
            offset = "path('M-10, -10 C-50,-10 -100,-10 -30,500')";  
            particle.style.transform = "scaleY(-1)";
        }
        particle.style.width = randomWidth + "px";
        particle.style.offsetPath = offset;

        caraClicada.appendChild(particle);
        setTimeout(() => {
            caraClicada.removeChild(particle);
        }, 3000);

    }
    static trocarImagem(caraGrande){
        this.indiceImagem = (this.indiceImagem + 1) % InicializacaoClasses.imagensCara().length;
        caraGrande.style.backgroundImage = `url(${InicializacaoClasses.imagensCara()[this.indiceImagem]})`;
    }
    static trocarImagemFerido(caraGrande) {
        this.indiceImagem = (this.indiceImagem + 1) % InicializacaoClasses.imagensCaraFerido().length;
        caraGrande.style.backgroundImage = `url(${InicializacaoClasses.imagensCaraFerido()[this.indiceImagem]})`;
    }
    static salvarBackupJogo (){
        const dados = JSON.stringify(localStorage);
        const blob = new Blob([dados], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'backup-cidade-dos-anjos.txt';
        link.click();
    }
    static carregarBackupJogo (){
        const arquivoBackup = document.getElementById('arquivo-backup').files[0];
        if (arquivoBackup) {
            const leitor = new FileReader();
            leitor.onload = function(evento) {
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
  