import { setCanvas, setGameIntervalId, setCanvasContainer, setContext, setPlayer, setCamera, setPlayerUi, targetFps } from './gameConfig.js';
import { onKeyDown, onKeyUp, onKeyEsc } from '../utils/utils.js';
import Player from '../entities/player.js';
import  PlayerInterface from '../ui/playerUi.js';
import { gameLoop, updateGame } from './gameLoop.js';
import { onResize } from '../camera/utils.js';


let localCanvas = document.getElementById('canvas');
let localCanvasContainer = document.getElementById('canvasContainer');
let localContext = localCanvas.getContext('2d');

export function initGame() {    
    configCanvas();
    configEvents();
    // Inicialize o jogador

    let localPlayer = new Player(localCanvas.width / 2, localCanvas.height / 2, 1);
    let localPlayerUi = new PlayerInterface(localPlayer);

    // Atualize as variáveis exportadas com os novos valores
    setPlayerUi(localPlayerUi);
    setPlayer(localPlayer);
    // Configure o intervalo de atualização do jogo
    setGameIntervalId(setInterval(() => updateGame(), 1000 / targetFps));
    requestAnimationFrame(gameLoop);
    levelRunStart = Date.now();
}
function configCanvas(){
    localCanvas.width = localCanvasContainer.offsetWidth;
    localCanvas.height = localCanvasContainer.offsetHeight;
    let localCamera = { x: localCanvas.width / 2, y: localCanvas.height / 2 };
    setCanvas(localCanvas);
    setCanvasContainer(localCanvasContainer);
    setContext(localContext);
    setCamera(localCamera);
}
function configEvents() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onKeyEsc);
}

window.initGame = initGame;
window.addEventListener('resize', onResize);