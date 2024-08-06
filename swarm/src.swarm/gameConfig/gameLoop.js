import { resetCanvas } from '../utils/utils.js';
import { spawnEnemies } from '../entitiesManagement/spawnEnemies.js';
import { focusCameraOn } from '../camera/utils.js';
import { player, playerUi, context, camera, canvas, setObjects, setMapObjects, 
    objects, mapObjects,configMap, gameState, xpDropped, quadtree,
    setXP} from './gameConfig.js';

let lastTime = 0;
const MAX_DISTANCE_FROM_PLAYER = 2000; // Distância máxima para manter os inimigos

const MAX_DISTANCE_FROM_XP = 4000; 
const ELEMENT_LIMIT = 500; 

export function gameLoop(timestamp) {
    if (!gameState.isPaused) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        updateGame(deltaTime); 
    }
    requestAnimationFrame(gameLoop); 
}

export function updateGame() {
    if (gameState.isPaused) return;
    resetCanvas();
    context.save();
    context.translate(-camera.x + canvas.width / 2, -camera.y + canvas.height / 2);
    
    mapObjects.forEach((mapObject, index) => {
        if (isFarFromPlayer(mapObject)) {
            mapObjects.splice(index, 1); // Remove o objeto da lista
        } else if (isVisible(mapObject)) {
            mapObject.draw();;
        }
    });
    if (mapObjects.length < ELEMENT_LIMIT) {
        configMap();
    }
    setMapObjects(mapObjects.filter(mapObjects => !mapObjects.destroyed));
    
    player.update();
    player.draw();

    objects.forEach((object, index) => {
        object.update();
        if (isFarFromPlayer(object)) {
            objects.splice(index, 1); // Remove o objeto da lista
        } else if (isVisible(object)) {
            object.draw();
        }
    });
    
    spawnEnemies();
    setObjects(objects.filter(object => !object.destroyed));
    xpDropped.forEach((xp) => {
        xp.update();
            xp.draw();
        
    });
    setXP(xpDropped.filter(xp => !xp.destroyed));
    
    const healthPercentage = player.health / player.maxHealth;
    playerUi.updateHealthBar(healthPercentage);
    playerUi.draw();
    context.restore();
}

function isVisible(object) {
    return object.x + object.width > camera.x - canvas.width / 2 &&
           object.x < camera.x + canvas.width / 2 &&
           object.y + object.height > camera.y - canvas.height / 2 &&
           object.y < camera.y + canvas.height / 2;
}
function isFarFromPlayer(object) {
    const dx = object.x - player.x;
    const dy = object.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance > MAX_DISTANCE_FROM_PLAYER;
}
