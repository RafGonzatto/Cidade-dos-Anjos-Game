import {canvas, context, camera, gameIntervalId} from "../gameConfig/gameConfig.js";;
import {KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_SKILLPOWER1, KEY_ESC} from '../static/constants.js';
import { input, gameState }from "../gameConfig/gameConfig.js";
import { mapObjects, player } from "../gameConfig/gameConfig.js";

const MIN_DISTANCE = 150; // Distância mínima de 150px entre objetos
export function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
export function resetCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
export function pointInCircle(x, y, cx, cy, radius) {
    const dx = x - cx;
    const dy = y - cy;
    return (dx * dx + dy * dy) <= (radius * radius);
}

export function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}
export function onKeyDown(e) {
    if (e.keyCode === KEY_LEFT) input.left = true;
    if (e.keyCode === KEY_RIGHT) input.right = true;
    if (e.keyCode === KEY_UP) input.up = true;
    if (e.keyCode === KEY_DOWN) input.down = true;
    if (e.keyCode === KEY_SKILLPOWER1) input.attackPower1 = true; // Ativar ataque
}

export function onKeyUp(e) {
    if (e.keyCode === KEY_LEFT) input.left = false;
    if (e.keyCode === KEY_RIGHT) input.right = false;
    if (e.keyCode === KEY_UP) input.up = false;
    if (e.keyCode === KEY_DOWN) input.down = false;
    if (e.keyCode === KEY_SKILLPOWER1) input.attackPower1 = false; // Desativar ataque
}

export function onKeyEsc(e){
    if (e.keyCode === KEY_ESC) {
        togglePause();
    }
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
}

export function makeImage(src) {
    const image = new Image();
    image.src = src;
    return image;
}

// collisionUtils.js
export function checkAABBCollision(entity1, entity2) {
    const left1 = entity1.x;
    const right1 = entity1.x + entity1.width;
    const top1 = entity1.y;
    const bottom1 = entity1.y + entity1.height;

    const left2 = entity2.x;
    const right2 = entity2.x + entity2.width;
    const top2 = entity2.y;
    const bottom2 = entity2.y + entity2.height;

    return !(left1 >= right2 || right1 <= left2 || top1 >= bottom2 || bottom1 <= top2);
}

export function resolveAABBCollision(entity, object) {
    const entityLeft = entity.x;
    const entityRight = entity.x + entity.width;
    const entityTop = entity.y;
    const entityBottom = entity.y + entity.height;

    const objectLeft = object.x;
    const objectRight = object.x + object.width;
    const objectTop = object.y;
    const objectBottom = object.y + object.height;

    const dx = (entityLeft < objectLeft) ? (objectLeft - entityRight) : (objectRight - entityLeft);
    const dy = (entityTop < objectTop) ? (objectTop - entityBottom) : (objectBottom - entityTop);

    if (Math.abs(dx) < Math.abs(dy)) {
        entity.x += dx;
    } else {
        entity.y += dy;
    }
}
export function objectExistsAt(x, y, width, height) {
    return mapObjects.some(obj => Math.abs(obj.x - x) < width && Math.abs(obj.y - y) < height);
}

export function isFarEnoughFromOtherObjects(x, y) {
    return mapObjects.every(obj => {
        const dx = obj.x - x;
        const dy = obj.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance >= MIN_DISTANCE;
    });
}

export function isInPlayerView(x, y, width, height) {
    const viewStartX = player.x - canvas.width / 2;
    const viewStartY = player.y - canvas.height / 2;
    const viewEndX = player.x + canvas.width / 2;
    const viewEndY = player.y + canvas.height / 2;

    return x + width > viewStartX && x < viewEndX &&
           y + height > viewStartY && y < viewEndY;
}
