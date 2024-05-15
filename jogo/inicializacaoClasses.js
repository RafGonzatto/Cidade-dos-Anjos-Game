import Construcao from "./Construcao.js";
import Seguidores from "./Seguidores.js";
import Upgrade from "./Upgrade.js";
import JogoService from "./jogoService.js";
import ConstrucaoObserver from "./ConstrucaoObserver.js";

class InicializacaoClasses {
    static inicializarConstrucoesPadrao() {  
        const construcoes = [ 
            new Construcao(1, "Luvas de Qualidade", 15, 0.1, 0, 0, 2),
            new Construcao(2, "Mané da Esquina", 100, 10, 0, 0, 2),
            new Construcao(3, "Cão Brabo", 1100, 30, 0, 0 ,2),
            new Construcao(4, "Marombasmático",10000, 70, 0, 0, 1),
            new Construcao(5, "Carro Turbinado", 20000, 100, 0, 0, 0),
            new Construcao(6, "Bando de Ratos", 50000, 150, 0, 0, 0),
            new Construcao(7, "Policial Viciado em Donuts", 100000, 200, 0, 0, 0),
            new Construcao(8,"Quadrado", 350000, 300, 0, 0, 0)
        ]
        return construcoes;
    }
    static inicializarSeguidores() {  
        const seguidores = [ 
            new Seguidores(1, 0.0, "Chefe de Polícia Rammus"),
        ]
        return seguidores;
    }
    
    static inicializarListaUpgrades() {
        const quantidade1 = 1;
        const quantidade2 = 2;
        const quantidade3 = 3;
        const quantidade4 = 4;
        const quantidade5 = 5;
        const upgrades = [
            new Upgrade(1, quantidade1, 1, 100, "LuvaBoxe", 1, 0),
            new Upgrade(2, quantidade2, 1, 1000, "LuvaBoxe2", 1, 0),
            new Upgrade(3, quantidade3, 1, 10000, "LuvaBoxe3", 1, 0),
            new Upgrade(4, quantidade4, 1, 25000, "LuvaBoxe4", 1, 0),
            new Upgrade(5, quantidade5, 1, 70000, "LuvaBoxe5", 1, 0),
            new Upgrade(6, quantidade1, 2, 100, "Mane", 1, 0),
            new Upgrade(7, quantidade2, 2, 1000, "Mane2", 1, 0),
            new Upgrade(8, quantidade3, 2, 10000, "Mane3", 1, 0),
            new Upgrade(9, quantidade4, 2, 25000, "Mane4", 1, 0),
            new Upgrade(10, quantidade5, 2, 70000, "Mane5", 2, 0),
            new Upgrade(11, quantidade1, 3, 100, "Cao-Brabo", 1, 0),
            new Upgrade(12, quantidade2, 3, 1000, "Cao-Brabo2", 1, 0),
            new Upgrade(13, quantidade3, 3, 10000, "Cao-Brabo3", 1, 0),
            new Upgrade(14, quantidade4, 3, 25000, "Cao-Brabo4", 1, 0),
            new Upgrade(15, quantidade5, 3, 25000, "Cao-Brabo5", 1, 0),
            new Upgrade(16, quantidade1, 4, 100, "Maromba", 1, 0),
            new Upgrade(17, quantidade2, 4, 1000, "Maromba2", 1, 0),
            new Upgrade(18, quantidade3, 4, 10000, "Maromba3", 1, 0),
            new Upgrade(19, quantidade4, 4, 25000, "Maromba4", 1, 0),
            new Upgrade(20, quantidade5, 4, 70000, "Maromba5", 2, 0),
            new Upgrade(21, quantidade1, 5, 100, "Carro", 1, 0),
            new Upgrade(22, quantidade2, 5, 1000, "Carro2", 1, 0),
            new Upgrade(23, quantidade3, 5, 10000, "Carro3", 1, 0),
            new Upgrade(24, quantidade4, 5, 25000, "Carro4", 1, 0),
            new Upgrade(25, quantidade5, 5, 70000, "Carro5", 2, 0),
            new Upgrade(26, quantidade1, 6, 100, "Rato", 1, 0),
            new Upgrade(27, quantidade2, 6, 1000, "Rato2", 1, 0),
            new Upgrade(28, quantidade3, 6, 10000, "Rato3", 1, 0),
            new Upgrade(29, quantidade4, 6, 25000, "Rato4", 1, 0),
            new Upgrade(30, quantidade5, 6, 70000, "Rato5", 2, 0),
            new Upgrade(31, quantidade1, 7, 100, "Policial", 1, 0),
            new Upgrade(32, quantidade2, 7, 1000, "Policial2", 1, 0),
            new Upgrade(33, quantidade3, 7, 10000, "Policial3", 1, 0),
            new Upgrade(34, quantidade4, 7, 25000, "Policial4", 1, 0),
            new Upgrade(35, quantidade5, 7, 70000, "Policial5", 2, 0),
            new Upgrade(36, quantidade1, 8, 100, "Quadrado", 1, 0),
            new Upgrade(37, quantidade2, 8, 1000, "Quadrado2", 1, 0),
            new Upgrade(38, quantidade3, 8, 10000, "Quadrado3", 1, 0),
            new Upgrade(39, quantidade4, 8, 25000, "Quadrado4", 1, 0),
            new Upgrade(40, quantidade5, 8, 70000, "Quadrado5", 2, 0),
        ];
        return upgrades;
    }
    static getImagemUpgradePorId(id) {
        const imagens = {
            1 : 'jogo/css/imagens/upgrades/upgrade-luva.png',
            2 :  'jogo/css/imagens/upgrades/upgrade-luva2.png',
            3 :  'jogo/css/imagens/upgrades/upgrade-luva3.png',
            4 :  'jogo/css/imagens/upgrades/upgrade-luva4.png',
            5 :  'jogo/css/imagens/upgrades/upgrade-luva5.png',
            6 :  'jogo/css/imagens/upgrades/upgrade-clique.png',
            7 :  'jogo/css/imagens/upgrades/upgrade-clique2.png',
            8 :  'jogo/css/imagens/upgrades/upgrade-clique3.png',
            9 :  'jogo/css/imagens/upgrades/upgrade-clique4.png',
            10 :  'jogo/css/imagens/upgrades/upgrade-clique5.png',
            11 :  'jogo/css/imagens/upgrades/upgrade-cao-brabo.png',
            12 :  'jogo/css/imagens/upgrades/upgrade-cao-brabo2.png',
            13 :  'jogo/css/imagens/upgrades/upgrade-cao-brabo3.png',
            14 :  'jogo/css/imagens/upgrades/upgrade-cao-brabo4.png',
            15 :  'jogo/css/imagens/upgrades/upgrade-cao-brabo5.png',
            16 :  'jogo/css/imagens/upgrades/upgrade-maromba.png',
            17 :  'jogo/css/imagens/upgrades/upgrade-maromba2.png',
            18 :  'jogo/css/imagens/upgrades/upgrade-maromba3.png',
            19 :  'jogo/css/imagens/upgrades/upgrade-maromba4.png',
            20 :  'jogo/css/imagens/upgrades/upgrade-maromba5.png',
            21 :  'jogo/css/imagens/upgrades/upgrade-carro.png',
            22 :  'jogo/css/imagens/upgrades/upgrade-carro2.png',
            23 :  'jogo/css/imagens/upgrades/upgrade-carro3.png',
            24 :  'jogo/css/imagens/upgrades/upgrade-carro4.png',
            25 :  'jogo/css/imagens/upgrades/upgrade-carro5.png',
            26 :  'jogo/css/imagens/upgrades/upgrade-rato.png',
            27 :  'jogo/css/imagens/upgrades/upgrade-rato2.png',
            28 :  'jogo/css/imagens/upgrades/upgrade-rato3.png',
            29 :  'jogo/css/imagens/upgrades/upgrade-rato4.png',
            30 :  'jogo/css/imagens/upgrades/upgrade-rato5.png',
            31 :  'jogo/css/imagens/upgrades/upgrade-policial.png',
            32 :  'jogo/css/imagens/upgrades/upgrade-policial2.png',
            33 :  'jogo/css/imagens/upgrades/upgrade-policial3.png',
            34 :  'jogo/css/imagens/upgrades/upgrade-policial4.png',
            35 :  'jogo/css/imagens/upgrades/upgrade-policial5.png',
            36 :  'jogo/css/imagens/upgrades/upgrade-quadrado.png',
            37 :  'jogo/css/imagens/upgrades/upgrade-quadrado2.png',
            38 :  'jogo/css/imagens/upgrades/upgrade-quadrado3.png',
            39 :  'jogo/css/imagens/upgrades/upgrade-quadrado4.png',
            40 :  'jogo/css/imagens/upgrades/upgrade-quadrado5.png',
        };
        return imagens[id] || 'jogo/css/imagens/upgrades/upgrade-clique.png';
    }
    
    static getImagemConstrucaoPorId(id) {
        const imagens = { 
            1 : 'jogo/css/imagens/construcao-luva.png',
            2 : 'jogo/css/imagens/construcao-mane.png',
            3 : 'jogo/css/imagens/construcao-cao-brabo.png',
            4 : 'jogo/css/imagens/construcao-maromba.png',
            5 : 'jogo/css/imagens/construcao-carro.png',
            6 : 'jogo/css/imagens/construcao-rato.png',
            7 : 'jogo/css/imagens/construcao-policial.png',
            8 : 'jogo/css/imagens/construcao-quadrado.png',
        };
        return imagens[id] || 'jogo/css/imagens/upgrades/upgrade-clique.png';
    }
    static imagensCara() {
        const imagensCara = [
            'jogo/css/imagens/cabeca-1.png', 
            'jogo/css/imagens/cabeca-2.png',
            'jogo/css/imagens/cabeca-32.png',
            'jogo/css/imagens/cabeca-virada1.png', 
            'jogo/css/imagens/cabeca-virada2.png', 
            'jogo/css/imagens/cabeca-virada3.png',
            'jogo/css/imagens/cabeca-virada4.png',
            'jogo/css/imagens/cabeca-virada12.png', 
            'jogo/css/imagens/cabeca-virada22.png', 
            'jogo/css/imagens/cabeca-virada32.png',
            'jogo/css/imagens/cabeca-virada42.png'
        ];
        return imagensCara;
    }
    static imagensCaraFerido(){
        const imagensFerido = [
        'jogo/css/imagens/cabeca-soco-1.png',
        'jogo/css/imagens/cabeca-soco-2.png', 
        'jogo/css/imagens/cabeca-soco-3.png', 
        'jogo/css/imagens/cabeca-soco-4.png', 
        'jogo/css/imagens/cabeca-soco-5.png',
        'jogo/css/imagens/cabeca-soco-12.png',
        'jogo/css/imagens/cabeca-soco-42.png' 
        ];
        return imagensFerido;
    }
    static calcularTempoForaDaPagina() { 
        const storage = JogoService.getStorage();
        let tempoForaDaPagina = 0;
        const ultimaHoraFechada = storage.ultimaHoraFechada;
        const dinheiroPorSegundo = parseFloat(storage.dinheiroPorSegundo) || 0;
        const dinheiro = parseFloat(storage.dinheiro) || 0;
    
        if (ultimaHoraFechada) {
            const horaAtual = new Date().getTime();
            const tempoFora = horaAtual - parseInt(ultimaHoraFechada);
            const segundosFora = Math.floor(tempoFora / 1000);
            tempoForaDaPagina = segundosFora * dinheiroPorSegundo + dinheiro;
        }
        JogoService.atualizarPontuacao(tempoForaDaPagina);
    }

    static criarElementoConstrucao(construcao) {
        const construcaoElemento = document.createElement("div");
        construcaoElemento.classList.add("construcao");
        construcaoElemento.id = construcao.id;
    
        const tipoConstrucaoElemento = document.createElement("div");
        tipoConstrucaoElemento.classList.add("construcao-imagem");
        tipoConstrucaoElemento.style.backgroundImage = `url(${this.getImagemConstrucaoPorId(construcao.id)})`;
        construcaoElemento.appendChild(tipoConstrucaoElemento);
    
        const informacoesConstrucao = document.createElement("div");
        informacoesConstrucao.classList.add("informacoes");
        tipoConstrucaoElemento.appendChild(informacoesConstrucao);
        

        const nomeConstrucaoElemento = document.createElement("div");
        nomeConstrucaoElemento.classList.add("nomeConstrucao");
        nomeConstrucaoElemento.innerHTML = `<span>${construcao.nome}</span>`;
        informacoesConstrucao.appendChild(nomeConstrucaoElemento);
        
        const valorConstrucaoElemento = document.createElement("div");
        valorConstrucaoElemento.classList.add("valorConstrucao");
        valorConstrucaoElemento.innerHTML = `<span>Valor: ${construcao.valor}</span>`;
        informacoesConstrucao.appendChild(valorConstrucaoElemento);
        
        const quantidadeConstrucaoElemento = document.createElement("div");
        quantidadeConstrucaoElemento.classList.add("quantidadeConstrucao");
        quantidadeConstrucaoElemento.innerHTML = `<span>${construcao.quantidade}</span>`;
        informacoesConstrucao.appendChild(quantidadeConstrucaoElemento);
    
        return construcaoElemento;
    }
    static criarElementoBloqueado(construcaoElemento, construcao) {
        let valor = construcao.valor * 9;
        let altura = construcaoElemento.offsetHeight;
    
        let bloqueadorElemento = document.createElement("div");
        bloqueadorElemento.classList.add("bloqueadorConstrucao");
        bloqueadorElemento.id = "bloqueador" + construcao.id;
        bloqueadorElemento.style.position = "absolute";
        bloqueadorElemento.style.width = "100%";
        bloqueadorElemento.style.height = altura + "px";
        bloqueadorElemento.style.top = "0";
        bloqueadorElemento.style.left = "0";
    
        let bloqueadorElementoValor = document.createElement("div");
        bloqueadorElementoValor.classList.add("valorBloqueador");
        bloqueadorElementoValor.innerHTML = `<span>${valor}</span>`;
        
        let bloqueadorCorrentes = document.createElement("div");
        bloqueadorCorrentes.classList.add("correntesBloqueador");
    
        bloqueadorElemento.appendChild(bloqueadorCorrentes);
        bloqueadorElemento.appendChild(bloqueadorElementoValor);
        construcaoElemento.appendChild(bloqueadorElemento);


        bloqueadorElemento.addEventListener("click", (event) => { 
        let dinheiro = JogoService.carregarDinheiroLocalStorage();
        if (dinheiro >= valor){
            const producaoObserver = new ConstrucaoObserver();
            let novaPontuacao = dinheiro - valor;
            JogoService.atualizarPontuacao(novaPontuacao); 
            let construcoes = Construcao.carregarConstrucoesDoLocalStorage();
            let id = construcao.id -1;
            let idDois = construcao.id ;
            construcoes[id].status = 2;
            if(id !=7){
            construcoes[idDois].status = 1;
            }
            Construcao.salvarNoLocalStorage(construcoes);
             producaoObserver.updateConfiguracaoAparencia
            Construcao.criarParticula(event.clientX, event.clientY);
            bloqueadorElemento.classList.replace("bloqueadorConstrucao", "bloqueadorConstrucao2");
            bloqueadorElementoValor.remove();
            bloqueadorCorrentes.classList.replace("correntesBloqueador", "correntesBloqueador2");
            bloqueadorElemento.classList.add("animarParaLado");
            setTimeout(function(){
                bloqueadorElemento.remove();
            },1400)
            const jogo = document.querySelector(".jogo");
            const unlockElementoFrente = document.createElement("div");
            unlockElementoFrente.classList.add("unlockFrente");
            
            const unlockElementoTras = document.createElement("div");
            unlockElementoTras.classList.add("unlockTras");
            
            const unlockElementoConstrucao = document.createElement("div");
            unlockElementoConstrucao.classList.add("unlockConstrucao");
            unlockElementoConstrucao.style.backgroundImage = `url(${this.getImagemConstrucaoPorId(construcao.id)})`;
            
            jogo.appendChild(unlockElementoTras);
            unlockElementoTras.appendChild(unlockElementoConstrucao);
            unlockElementoTras.appendChild(unlockElementoFrente);
            setTimeout(function() {
                unlockElementoFrente.classList.add("visible");
                unlockElementoTras.classList.add("visible");
                unlockElementoConstrucao.classList.add("visible");
            }, 100);
            setTimeout(function(){
                unlockElementoFrente.classList.add("balancar");
                unlockElementoTras.classList.add("balancar");
                unlockElementoConstrucao.classList.add("balancar");
            },1000)
            unlockElementoTras.addEventListener("click", () => { 

                unlockElementoFrente.classList.add("invisible");
                unlockElementoTras.classList.add("invisible");
                unlockElementoConstrucao.classList.add("invisible");
                setTimeout(function(){     
                unlockElementoTras.remove();
                },900)
            })
        }
        });
    }
    
    static inicializarConstrucoesHTML() { 
        const configLoja = document.querySelector(".configLoja");
        let construcoes = Construcao.carregarConstrucoesDoLocalStorage();
        construcoes.forEach(construcao => {
            const construcaoElemento = this.criarElementoConstrucao(construcao);
            configLoja.appendChild(construcaoElemento);
        });
    }

    static async iniciarMovimento() {
        const personagem = document.querySelector('.cachorro');
        let direcaoAtual = Math.random() < 0.5 ? 'vertical' : 'horizontal';
        let movimentosRestantes = 10;
        let incremento = 1;
        let indicePasso = 1;
        async function preloadImages(images) {
            const promises = images.map(url => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`Failed to load image ${url}`));
                    img.src = url;
                });
            });
            return await Promise.all(promises);
        }
        const imageUrls = [
            'jogo/css/imagens/dog-walk-up.png',
            'jogo/css/imagens/dog-walk-down.png',
            'jogo/css/imagens/dog-walk-left1.png',
            'jogo/css/imagens/dog-walk-left2.png',
            'jogo/css/imagens/dog-walk-left3.png',
            'jogo/css/imagens/dog-walk-left4.png',
            'jogo/css/imagens/dog-walk-right1.png',
            'jogo/css/imagens/dog-walk-right2.png',
            'jogo/css/imagens/dog-walk-right3.png',
            'jogo/css/imagens/dog-walk-right4.png'
        ];
    
        try {
            const preloadedImages = await preloadImages(imageUrls);
            const interval = setInterval(() => {
                if (movimentosRestantes > 0) {
                    if (direcaoAtual === 'vertical') {
                        movimentosRestantes = this.movimentarVerticalmente(personagem, movimentosRestantes, incremento, preloadedImages);
                    } else {
                        movimentosRestantes = this.movimentarHorizontalmente(personagem, movimentosRestantes, incremento, indicePasso, preloadedImages);
                    }
                    movimentosRestantes = movimentosRestantes === 0 ? 0 : movimentosRestantes - 1;
                    indicePasso = indicePasso < 4 ? indicePasso + 1 : 1;
                } else {
                    incremento *= -1;
                    direcaoAtual = Math.random() < 0.5 ? 'vertical' : 'horizontal';
                    movimentosRestantes = Math.floor(Math.random() * 20) + 20;
                }
            }, 50);
    
            return interval;
        } catch (error) {
            console.error(error);
        }
    }
    static pararMovimento(interval) {
        clearInterval(interval);
    }

    static movimentarVerticalmente(personagem, movimentosRestantes, incremento) {
        let novoTop = parseInt(personagem.style.top) || 50;

        personagem.style.width = "20px";
        personagem.style.height = "44px";
        if (incremento < 0) {
            personagem.style.backgroundImage = "url(jogo/css/imagens/dog-walk-up.png)";
        } else {
            personagem.style.backgroundImage = "url(jogo/css/imagens/dog-walk-down.png)";
        }
        if (((novoTop + incremento) === 26 || (novoTop + incremento) === 89) ||
            ((novoTop + incremento) >= 52 && (novoTop + incremento) <= 72)) {
            incremento *= -1;
            movimentosRestantes = 0;
        }
        personagem.style.top = `${novoTop + incremento}%`;
        return movimentosRestantes;
    }

    static movimentarHorizontalmente(personagem, movimentosRestantes, incremento, indicePasso) {
        let novoLeft = parseInt(personagem.style.left) || 50;

        personagem.style.width = "50px";
        personagem.style.height = "40px";
        if (incremento < 0) {
            personagem.style.backgroundImage = `url(jogo/css/imagens/dog-walk-left${indicePasso}.png)`;
        } else {
            personagem.style.backgroundImage = `url(jogo/css/imagens/dog-walk-right${indicePasso}.png)`;
        }
        if (((novoLeft + incremento) === 3 || (novoLeft + incremento) === 90) ||
            ((novoLeft + incremento) >= 0 && (novoLeft + incremento) <= 27) ||
            ((novoLeft + incremento) >= 60 && (novoLeft + incremento) <= 100)) {
            incremento *= -1;
            movimentosRestantes = 0;
        }
        personagem.style.left = `${novoLeft + incremento}%`;
        return movimentosRestantes;
    }


    static carregarPersonagensAcampamento(){ 
        let construcoes = Construcao.carregarConstrucoesDoLocalStorage().filter(construcao => {
            return construcao.quantidade > 0;
        });;
        construcoes.forEach(construcao =>{
            this.criarPersonagemAcampamento(construcao.id)
        });
    }
    
    static criarPersonagemAcampamento(id) {
        let personagem;
        switch (id) { 
            case 1: personagem = document.querySelector('.luvas'); 
            break;
            case 2: personagem = document.querySelector('.mane'); 
            break;
            case 3: personagem = document.querySelector('.cachorro'); 
            this.iniciarMovimento();
            break;
            case 4: personagem = document.querySelector('.maromba'); 
            break;
            case 5: personagem = document.querySelector('.carro'); 
            break;
            case 6: personagem = document.querySelector('.ratos'); 
            break;
            case 7: personagem = document.querySelector('.policial'); 
            break;
            case 8: personagem = document.querySelector('.quadrado'); 
            break;
        }
        if(personagem){
            personagem.style.opacity =  1;
        }
        return;
    }
    
    static inicializarCidade(){ 
        let botao_cidade = document.querySelector(".botao-cidade");
        let acampamento = document.querySelector(".acampamento");
      
        botao_cidade.addEventListener("click", (event) => {
                const telaCidade = "telaCidade.html";
                window.location.href = telaCidade;
         });
       
        botao_cidade.addEventListener('mouseenter', () => { 
            acampamento.style.backgroundImage = 'url(jogo/css/imagens/fundo-acampamento-aberto.png)'
        });

        botao_cidade.addEventListener('mouseleave', () => {
            acampamento.style.backgroundImage = 'url(jogo/css/imagens/fundo-acampamento.png)'
        });

    }
    
}


export default InicializacaoClasses;
