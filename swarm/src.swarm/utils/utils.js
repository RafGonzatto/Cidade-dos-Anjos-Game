import {canvas, context, camera, gameIntervalId} from "../gameConfig/gameConfig.js";;
import {KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_SKILLPOWER1, KEY_ESC} from '../static/constants.js';
import { input, gameState }from "../gameConfig/gameConfig.js";
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
    image.onload = () => {
        console.log(`Image loaded: ${src}`);
    };
    image.onerror = () => {
        console.error(`Failed to load image: ${src}`);
    };
    return image;
}