import { setGameIntervalId, 
     setPlayer, setPlayerUi, targetFps,
    configCanvas, configEvents, setLevelRunStart,context,
    choseChampion} from './gameConfig.js';
import  PlayerInterface from '../ui/playerUi.js';
import { gameLoop, updateGame } from './gameLoop.js';
import { onResize } from '../camera/utils.js';

export function initGame() {    
    configCanvas();
    configEvents();
    
    const selectedChampion = localStorage.getItem('selectedChampion');
    if(!selectedChampion){
        localStorage.setItem('selectedChampion', "0");
    } 
    let localPlayer = choseChampion("0");
    let localPlayerUi = new PlayerInterface(localPlayer);

    setPlayerUi(localPlayerUi);
    setPlayer(localPlayer);
    
    setGameIntervalId(setInterval(() => updateGame(), 1000 / targetFps));
    requestAnimationFrame(gameLoop);
    setLevelRunStart(Date.now());
    context.imageSmoothingEnabled = false;
}


window.initGame = initGame;
window.addEventListener('resize', onResize);