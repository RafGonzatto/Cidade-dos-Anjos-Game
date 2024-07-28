import { input } from './gameConfig.js';

export function onKeyDown(event) {
    switch(event.key) {
        case 'ArrowRight':
            input.right = true;
            break;
        case 'ArrowLeft':
            input.left = true;
            break;
        case 'ArrowUp':
            input.up = true;
            break;
        case 'ArrowDown':
            input.down = true;
            break;
        case ' ':
            input.attackPower1 = true;
            break;
        default:
            break;
    }
}

export function onKeyUp(event) {
    switch(event.key) {
        case 'ArrowRight':
            input.right = false;
            break;
        case 'ArrowLeft':
            input.left = false;
            break;
        case 'ArrowUp':
            input.up = false;
            break;
        case 'ArrowDown':
            input.down = false;
            break;
        case ' ':
            input.attackPower1 = false;
            break;
        default:
            break;
    }
}

export function onKeyEsc(event) {
    if (event.key === 'Escape') {
        // Logica para pausar ou despausar o jogo
    }
}
