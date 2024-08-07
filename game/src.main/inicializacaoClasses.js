import Construcao from "./models/Construcao.js";
import Seguidores from "./models/Seguidores.js";
import Upgrade from "./models/Upgrade.js";
import JogoService from "./services/jogoService.js";
import { configurarEventosDesbloqueio } from "./eventosTelaPrincipal/eventosDesbloqueio.js";

const caminhoImagens = "../static/images/";

const imagemPortaoAberto = (() => {
    const img = new Image();
    img.src = `${caminhoImagens}fundo-acampamento-aberto.png`;	
    return img;
  })();
  
  const imagemPortaoFechado = (() => {
    const img = new Image();
    img.src = `${caminhoImagens}fundo-acampamento.png`;
    return img;
  })();
  
    
  const modal = document.querySelector('.upgrade-modal');
  const modalTitulo = document.querySelector('.upgrade-titulo');
  const modalDescricao = document.querySelector('.upgrade-descricao');
  const modalDescricaoBuff = document.querySelector('.upgrade-descricaoBuff');
  const modalValor = document.querySelector('.upgrade-valor');
  const modalImagem = document.querySelector('.upgrade-imagem');
class InicializacaoClasses {
    static inicializarResolucoes(){
        const resolutions = [
            { "width": 800, "height": 600 },
            { "width": 1024, "height": 768 },
            { "width": 1280, "height": 720 },
            { "width": 1280, "height": 800 },
            { "width": 1366, "height": 768 },
            { "width": 1440, "height": 900 },
            { "width": 1600, "height": 900 },
            { "width": 1680, "height": 1050 },
            { "width": 1920, "height": 1080 },
            { "width": 1920, "height": 1200 },
            { "width": 2560, "height": 1080 },
            { "width": 2560, "height": 1440 }
        ];
        return resolutions;
    }
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
        const q1 = 1;
        const q2 = 2;
        const q3 = 3;
        const q4 = 4;
        const q5 = 5;
        const upgrades = [
            new Upgrade(1, q1, 1, 100, "Remendos de couro", "A fricção será sanguinolenta", "Suas luvas são duas vezes mais resistentes", 1, 0),
            new Upgrade(2, q2, 1, 1000, "Laços apertados", "-10 pontos de circulação","Suas luvas são duas vezes mais resistentes",  1, 0),
            new Upgrade(3, q3, 1, 10000, "Adesivos de marca", "Drip até mesmo nas brigas","Suas luvas são duas vezes mais resistentes", 1, 0),
            new Upgrade(4, q4, 1, 25000, "LuvaBoxe4", "Implementar","Implementar", 1, 0),
            new Upgrade(5, q5, 1, 70000, "LuvaBoxe5", "Implementar","Implementar", 1, 0),
            new Upgrade(6, q1, 2, 100, "Mane", "Implementar","Implementar", 1, 0),
            new Upgrade(7, q2, 2, 1000, "Mane2", "Implementar","Implementar", 1, 0),
            new Upgrade(8, q3, 2, 10000, "Mane3", "Implementar","Implementar", 1, 0),
            new Upgrade(9, q4, 2, 25000, "Mane4"," Implementar","Implementar", 1, 0),
            new Upgrade(10, q5, 2, 70000, "Mane5", "Implementar","Implementar", 2, 0),
            new Upgrade(11, q1, 3, 100, "Banho e tosa", "Rufus conquistará todas as cachorras","Seu cão é duas vezes mais resistente", 1, 0),
            new Upgrade(12, q2, 3, 1000, "Adestramento para combate", "Rufus virara o dono do canil","Seu cão é duas vezes mais resistente", 1, 0),
            new Upgrade(13, q3, 3, 10000, "Vernifugo potente", "Rufus não arrastará mais o bumbum","Seu cão é duas vezes mais resistente", 1, 0),
            new Upgrade(14, q4, 3, 25000, "Biscoitos de Qualidade", "Rufus não será mais bafento","Seu cão é duas vezes mais resistente", 1, 0),
            new Upgrade(15, q5, 3, 25000, "Cao-Brabo5", "Implementar","Seu cão é duas vezes mais resistente", 1, 0),
            new Upgrade(16, q1, 4, 100, "Maromba", "Implementar","Implementar", 1, 0),
            new Upgrade(17, q2, 4, 1000, "Maromba2", "Implementar","Implementar", 1, 0),
            new Upgrade(18, q3, 4, 10000, "Maromba3", "Implementar","Implementar", 1, 0),
            new Upgrade(19, q4, 4, 25000, "Maromba4", "Implementar","Implementar", 1, 0),
            new Upgrade(20, q5, 4, 70000, "Maromba5", "Implementar","Implementar", 2, 0),
            new Upgrade(21, q1, 5, 100, "Carro", "Implementar","Implementar", 1, 0),
            new Upgrade(22, q2, 5, 1000, "Carro2", "Implementar","Implementar", 1, 0),
            new Upgrade(23, q3, 5, 10000, "Carro3", "Implementar","Implementar", 1, 0),
            new Upgrade(24, q4, 5, 25000, "Carro4", "Implementar","Implementar", 1, 0),
            new Upgrade(25, q5, 5, 70000, "Carro5", "Implementar","Implementar", 2, 0),
            new Upgrade(26, q1, 6, 100, "Rato", "Implementar","Implementar", 1, 0),
            new Upgrade(27, q2, 6, 1000, "Rato2", "Implementar","Implementar", 1, 0),
            new Upgrade(28, q3, 6, 10000, "Rato3", "Implementar","Implementar", 1, 0),
            new Upgrade(29, q4, 6, 25000, "Rato4", "Implementar","Implementar", 1, 0),
            new Upgrade(30, q5, 6, 70000, "Rato5", "Implementar","Implementar", 2, 0),
            new Upgrade(31, q1, 7, 100, "Policial", "Implementar","Implementar", 1, 0),
            new Upgrade(32, q2, 7, 1000, "Policial2", "Implementar","Implementar", 1, 0),
            new Upgrade(33, q3, 7, 10000, "Policial3", "Implementar","Implementar", 1, 0),
            new Upgrade(34, q4, 7, 25000, "Policial4", "Implementar","Implementar", 1, 0),
            new Upgrade(35, q5, 7, 70000, "Policial5", "Implementar","Implementar", 2, 0),
            new Upgrade(36, q1, 8, 100, "Quadrado", "Implementar","Implementar", 1, 0),
            new Upgrade(37, q2, 8, 1000, "Quadrado2", "Implementar","Implementar", 1, 0),
            new Upgrade(38, q3, 8, 10000, "Quadrado3", "Implementar","Implementar", 1, 0),
            new Upgrade(39, q4, 8, 25000, "Quadrado4", "Implementar","Implementar", 1, 0),
            new Upgrade(40, q5, 8, 70000, "Quadrado5", "Implementar","Implementar", 2, 0),
        ];
        return upgrades;
    }
    static getImagemUpgradePorId(id) {
        const imagens = {
            1 : `${caminhoImagens}upgrades/upgrade-luva.png`,
            2 :  `${caminhoImagens}upgrades/upgrade-luva2.png`,
            3 :  `${caminhoImagens}upgrades/upgrade-luva3.png`,
            4 :  `${caminhoImagens}upgrades/upgrade-luva4.png`,
            5 :  `${caminhoImagens}upgrades/upgrade-luva5.png`,
            6 :  `${caminhoImagens}upgrades/upgrade-clique.png`,
            7 :  `${caminhoImagens}upgrades/upgrade-clique2.png`,
            8 :  `${caminhoImagens}upgrades/upgrade-clique3.png`,
            9 :  `${caminhoImagens}upgrades/upgrade-clique4.png`,
            10 :  `${caminhoImagens}upgrades/upgrade-clique5.png`,
            11 :  `${caminhoImagens}upgrades/upgrade-cao-brabo.png`,
            12 :  `${caminhoImagens}upgrades/upgrade-cao-brabo2.png`,
            13 :  `${caminhoImagens}upgrades/upgrade-cao-brabo3.png`,
            14 :  `${caminhoImagens}upgrades/upgrade-cao-brabo4.png`,
            15 :  `${caminhoImagens}upgrades/upgrade-cao-brabo5.png`,
            16 :  `${caminhoImagens}upgrades/upgrade-maromba.png`,
            17 :  `${caminhoImagens}upgrades/upgrade-maromba2.png`,
            18 :  `${caminhoImagens}upgrades/upgrade-maromba3.png`,
            19 :  `${caminhoImagens}upgrades/upgrade-maromba4.png`,
            20 :  `${caminhoImagens}upgrades/upgrade-maromba5.png`,
            21 :  `${caminhoImagens}upgrades/upgrade-carro.png`,
            22 :  `${caminhoImagens}upgrades/upgrade-carro2.png`,
            23 :  `${caminhoImagens}upgrades/upgrade-carro3.png`,
            24 :  `${caminhoImagens}upgrades/upgrade-carro4.png`,
            25 :  `${caminhoImagens}upgrades/upgrade-carro5.png`,
            26 :  `${caminhoImagens}upgrades/upgrade-rato.png`,
            27 :  `${caminhoImagens}upgrades/upgrade-rato2.png`,
            28 :  `${caminhoImagens}upgrades/upgrade-rato3.png`,
            29 :  `${caminhoImagens}upgrades/upgrade-rato4.png`,
            30 :  `${caminhoImagens}upgrades/upgrade-rato5.png`,
            31 :  `${caminhoImagens}upgrades/upgrade-policial.png`,
            32 :  `${caminhoImagens}upgrades/upgrade-policial2.png`,
            33 :  `${caminhoImagens}upgrades/upgrade-policial3.png`,
            34 :  `${caminhoImagens}upgrades/upgrade-policial4.png`,
            35 :  `${caminhoImagens}upgrades/upgrade-policial5.png`,
            36 :  `${caminhoImagens}upgrades/upgrade-quadrado.png`,
            37 :  `${caminhoImagens}upgrades/upgrade-quadrado2.png`,
            38 :  `${caminhoImagens}upgrades/upgrade-quadrado3.png`,
            39 :  `${caminhoImagens}upgrades/upgrade-quadrado4.png`,
            40 :  `${caminhoImagens}upgrades/upgrade-quadrado5.png`,
        };
        return imagens[id] || `${caminhoImagens}upgrades/upgrade-clique.png`;
    }
    
    static getImagemConstrucaoPorId(id) {
        const imagens = { 
            1 : `${caminhoImagens}construcao-luva.png`,
            2 : `${caminhoImagens}construcao-mane.png`,
            3 : `${caminhoImagens}construcao-cao-brabo.png`,
            4 : `${caminhoImagens}construcao-maromba.png`,
            5 : `${caminhoImagens}construcao-carro.png`,
            6 : `${caminhoImagens}construcao-rato.png`,
            7 : `${caminhoImagens}construcao-policial.png`,
            8 : `${caminhoImagens}construcao-quadrado.png`,
        };
        return imagens[id] || `${caminhoImagens}upgrades/upgrade-clique.png`;
    }

    static imagensVendedorPorcoGrande() {
        const imagensPorcoGrande = [
            `${caminhoImagens}vendedores/porco-1.png`, 
            `${caminhoImagens}vendedores/porco-2.png`,
            `${caminhoImagens}vendedores/porco-3.png`,
            `${caminhoImagens}vendedores/porco-4.png`, 
            `${caminhoImagens}vendedores/porco-5.png`,
            `${caminhoImagens}vendedores/porco-6.png`, 
            `${caminhoImagens}vendedores/porco-7.png`,
            `${caminhoImagens}vendedores/porco-8.png`,
        ];
        return imagensPorcoGrande;
    }
    static imagensVendedorPig() {
        const imagensPig = [
            `${caminhoImagens}vendedores/pig-1.png`, 
            `${caminhoImagens}vendedores/pig-2.png`,
            `${caminhoImagens}vendedores/pig-3.png`,
            `${caminhoImagens}vendedores/pig-4.png`,
            `${caminhoImagens}vendedores/pig-5.png`,
        ];
        return imagensPig;
    }
    static imagensCara() {
        const imagensCara = [
            `${caminhoImagens}cabeca-1.png`, 
            `${caminhoImagens}cabeca-2.png`,
            `${caminhoImagens}cabeca-32.png`,
            `${caminhoImagens}cabeca-virada1.png`, 
            `${caminhoImagens}cabeca-virada2.png`, 
            `${caminhoImagens}cabeca-virada3.png`,
            `${caminhoImagens}cabeca-virada4.png`,
            `${caminhoImagens}cabeca-virada12.png`, 
            `${caminhoImagens}cabeca-virada22.png`, 
            `${caminhoImagens}cabeca-virada32.png`,
            `${caminhoImagens}cabeca-virada42.png`
        ];
        return imagensCara;
    }
    static imagensCaraFerido(){
        const imagensFerido = [
        `${caminhoImagens}cabeca-soco-1.png`,
        `${caminhoImagens}cabeca-soco-2.png`, 
        `${caminhoImagens}cabeca-soco-3.png`, 
        `${caminhoImagens}cabeca-soco-4.png`, 
        `${caminhoImagens}cabeca-soco-5.png`,
        `${caminhoImagens}cabeca-soco-12.png`,
        `${caminhoImagens}cabeca-soco-42.png` 
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
    
        configurarEventosDesbloqueio(bloqueadorElemento, bloqueadorElementoValor, bloqueadorCorrentes, construcao, valor);
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
        const personagem = document.querySelector(`.cachorro`);
        let direcaoAtual = Math.random() < 0.5 ? `vertical` : `horizontal`;
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
            `${caminhoImagens}dog-walk-up.png`,
            `${caminhoImagens}dog-walk-down.png`,
            `${caminhoImagens}dog-walk-left1.png`,
            `${caminhoImagens}dog-walk-left2.png`,
            `${caminhoImagens}dog-walk-left3.png`,
            `${caminhoImagens}dog-walk-left4.png`,
            `${caminhoImagens}dog-walk-right1.png`,
            `${caminhoImagens}dog-walk-right2.png`,
            `${caminhoImagens}dog-walk-right3.png`,
            `${caminhoImagens}dog-walk-right4.png`
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
            }, 75);
    
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
            personagem.style.backgroundImage = `url(${caminhoImagens}dog-walk-up.png)`;
        } else {
            personagem.style.backgroundImage = `url(${caminhoImagens}dog-walk-down.png)`;
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
            personagem.style.backgroundImage = `url(${caminhoImagens}dog-walk-left${indicePasso}.png)`;
        } else {
            personagem.style.backgroundImage = `url(${caminhoImagens}dog-walk-right${indicePasso}.png)`;
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

    static criarElementoUpgradeTelaUpgrade(upgrade) {
        let upgradeElement = document.createElement('div');
        upgradeElement.classList.add('upgrade');
        upgradeElement.id = `conquistas-upgrade-${upgrade.id}`;
        let imgElement = document.createElement('img');
        if (upgrade.status == 2) {
            imgElement.src = InicializacaoClasses.getImagemUpgradePorId(upgrade.id);
        }
        else {
            imgElement.src = `${caminhoImagens}upgrades/upgrade-bloqueado.png`;
        }
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover';
        imgElement.style.display = 'block';
        imgElement.style.imageRendering = 'pixelated';
        upgradeElement.appendChild(imgElement);
        return upgradeElement;
    }
    static criarElementoUpgrade(upgrade) {
        let upgradeElement = document.createElement('div');
        upgradeElement.classList.add('upgrade');
        upgradeElement.id = `upgrade-${upgrade.id}`;
        let imgElement = document.createElement('img');
        imgElement.src = InicializacaoClasses.getImagemUpgradePorId(upgrade.id);
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover';
        imgElement.style.display = 'block';
        imgElement.style.imageRendering = 'pixelated';
        upgradeElement.appendChild(imgElement);
        return upgradeElement;
    }

    static inicializarCidade(){ 
        let botao_cidade = document.querySelector(".botao-cidade");
        let acampamento = document.querySelector(".acampamento");
      
        botao_cidade.addEventListener("click", (event) => {
                const telaCidade = "telaCidade.html";
                window.location.href = telaCidade;
         });
       
         botao_cidade.addEventListener('mouseenter', () => {
            acampamento.style.backgroundImage = `url(${imagemPortaoAberto.src})`;
          });
          
          botao_cidade.addEventListener('mouseleave', () => {
            acampamento.style.backgroundImage = `url(${imagemPortaoFechado.src})`;
          });

    }
    static criarModalUpgradesBloqueados(upgradeElement) {
        const upgradeRect = upgradeElement.getBoundingClientRect();
        modal.style.top = `${(upgradeRect.top - 175)}px`;
        modal.style.left = `${(upgradeRect.left - 20)}px`;
        modalImagem.style.backgroundImage =  `url(${caminhoImagens}upgrades/upgrade-bloqueado.png)`;
        modalImagem.style.imageRendering = 'pixelated';
        modalTitulo.textContent = "???????????";
        modalDescricao.textContent = "???????????";
        modalDescricaoBuff.textContent = "???????????";
        modalValor.textContent = "???????????";
        modal.style.display = 'block';
    }
    static criarModalUpgrades(upgradeElement, upgrade, local) {
        const iconeCaminho = InicializacaoClasses.getImagemUpgradePorId(upgrade.id)
        const upgradeRect = upgradeElement.getBoundingClientRect();
        if(local == "vendedores"){
            const ancora = document.querySelector('.separadorDireita').getBoundingClientRect();
            modal.style.top = `${(upgradeRect.top - 20)}px`;
            modal.style.left = `${ancora.left - 325}px`;
        }
            if (local == "conquistas") {
            modal.style.top = `${(upgradeRect.top - 175)}px`;
            modal.style.left = `${(upgradeRect.left - 20)}px`;
        }
        modalImagem.style.backgroundImage =  `url(${iconeCaminho})`;
        modalImagem.style.imageRendering = 'pixelated';
        modalTitulo.textContent = `${upgrade.titulo}`;
        modalDescricao.textContent = `${upgrade.descricao}`;
        modalDescricaoBuff.textContent = `${upgrade.descricaoBuff}`;
        modalValor.textContent = `$${upgrade.valor}`;
        modal.style.display = 'block';
    }
}


export default InicializacaoClasses;
