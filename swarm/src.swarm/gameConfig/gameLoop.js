import { resetCanvas } from '../utils/utils.js';
import { spawnEnemies } from '../entitiesManagement/spawnEnemies.js';
import { focusCameraOn } from '../camera/utils.js';
import MapObject from '../entities/mapObject.js';
import XP from '../entities/xp.js';
import Enemy from '../entities/enemy.js';
import { player, playerUi, context, camera, canvas, setObjects, setMapObjects, 
    objects, mapObjects, configMap, gameState, xpDropped, quadtree,
    setXP, setQuadtree} from './gameConfig.js';
import { Rectangle } from '../utils/quadtree.js';

let lastTime = 0;
let fps = 0;
let frameCount = 0;
let fpsLastUpdate = 0;

const MAX_DISTANCE_FROM_PLAYER = 2000; // Distância máxima para manter os inimigos
const MAX_DISTANCE_FROM_XP = 4000; 
const ELEMENT_LIMIT = 500; 
const MARGIN = 300; 
let boundary;
let lastCleanupTime = 0;
const cleanupInterval = 5000; 

export function gameLoop(timestamp) {
    if (!gameState.isPaused) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        updateGame(deltaTime); 
        frameCount++;
        if (timestamp - fpsLastUpdate >= 1000) {
            fps = frameCount;
            frameCount = 0;
            fpsLastUpdate = timestamp;
        }
        
        drawFPS(fps);
    }
    
    requestAnimationFrame(gameLoop); 
}
function drawFPS(fps) {
    context.save();
    context.translate(10, 10);
    context.font = '40px Arial';
    context.fillStyle = 'white';
    context.fillText(`FPS: ${fps}`, 10, 20); // Ajuste a posição conforme necessário
    context.restore();
}
export function updateGame(deltaTime) {
    if (gameState.isPaused) return;

    focusCameraOn(player.x, player.y);
    resetCanvas();
    boundary = new Rectangle(
        player.x ,
        player.y ,
        canvas.width + MARGIN,
        canvas.height + MARGIN
    );

    context.save();
    context.translate(-camera.x + canvas.width / 2, -camera.y + canvas.height / 2);

    quadtree.clear();
    setQuadtree(boundary);
    insertObjectsIntoQuadtree(); 

    if (lastTime - lastCleanupTime >= cleanupInterval) {
        removeOutOfBoundsObjects();
        lastCleanupTime = lastTime; // Atualiza o tempo da última limpeza
    }
    updateDynamicObjects();
    const { visibleMapObjects, visibleGroups, visibleXp } = queryVisibleObjects();
    visibleMapObjects.forEach(mapObject => {
        mapObject.draw();
    });
    if (mapObjects.length < ELEMENT_LIMIT) {
        configMap();
    }
    visibleXp.forEach(xp => {
        xp.draw();
    });
    player.draw();
    visibleGroups.forEach(group => {
        group.forEach(object => {
            object.update();
            object.draw();
        });
    });
    player.update();
    setObjects(objects.filter(object => !object.destroyed));
    setXP(xpDropped.filter(xp => !xp.destroyed));
    const healthPercentage = player.health / player.maxHealth;
    playerUi.updateHealthBar(healthPercentage);
    playerUi.draw();
    spawnEnemies();
    context.restore();
}

export function queryVisibleObjects() {
    const allVisibleObjects = quadtree.query(boundary);
    console.log(allVisibleObjects.length);
    const visibleMapObjects = allVisibleObjects.filter(obj => obj instanceof MapObject);
    const visibleGroups = new Map();
    allVisibleObjects.forEach(obj => {
        if (obj instanceof Enemy) {
            const groupKey = `${Math.floor(obj.x / 100)},${Math.floor(obj.y / 100)}`;
            if (!visibleGroups.has(groupKey)) {
                visibleGroups.set(groupKey, []);
            }
            visibleGroups.get(groupKey).push(obj);
        }
    });

    const visibleXp = allVisibleObjects.filter(obj => obj instanceof XP);
    return { visibleMapObjects, visibleGroups: Array.from(visibleGroups.values()), visibleXp };
}

export function insertObjectsIntoQuadtree() {
    mapObjects.forEach(mapObject => {
        quadtree.insert(mapObject);
    });

    objects.forEach(object => {
        quadtree.insert(object);
    });

    xpDropped.forEach(xp => {
        quadtree.insert(xp);
    });
}

export function updateDynamicObjects() {
    // Atualiza a Quadtree com objetos dinâmicos que precisam ser atualizados
    objects.forEach(object => {
        if (object.needsUpdate) {
            quadtree.insert(object); // Re-inserir o objeto na Quadtree
            object.needsUpdate = false; // Marcar como atualizado
        }
    });
}
function removeOutOfBoundsObjects() {
    const maxDistanceX = canvas.width + 1000;
    const maxDistanceY = canvas.height + 1000;

    setMapObjects(mapObjects.filter(mapObject => {
        const distanceX = Math.abs(mapObject.x - player.x);
        const distanceY = Math.abs(mapObject.y - player.y);
        return distanceX <= maxDistanceX && distanceY <= maxDistanceY;
    }));

    setObjects(objects.filter(object => {
        if (object instanceof Enemy || object instanceof MapObject) {
            const distanceX = Math.abs(object.x - player.x);
            const distanceY = Math.abs(object.y - player.y);
            return distanceX <= maxDistanceX && distanceY <= maxDistanceY;
        }
        return true; // Mantém outros tipos de objetos
    }));
}
