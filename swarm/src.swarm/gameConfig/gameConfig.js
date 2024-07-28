export let targetFps = 60;
export let player;
export let camera;
export let canvas;
export let canvasContainer;
export let context;
export let gameIntervalId = null;
export let levelRunStart;
export let input = { right: false, left: false, up: false, down: false, attackPower1: false };
export let objects = [];
export let enemiesDestroyed = 0;
export let playerUi;
export let nextEnemyId = 0;
export let timeSinceLastEnemySpawn = Date.now();
export const gameState = {
    isPaused: false
};

export function setCanvas(value) {
    canvas = value;
}

export function setCanvasContainer(value) {
    canvasContainer = value;
}

export function setContext(value) {
    context = value;
}

export function setPlayer(value) {
    player = value;
}

export function setCamera(value) {
    camera = value;
}

export function setPlayerUi(value) {
    playerUi = value;
}

export function setTimeSinceLastEnemySpawn(time) {
    timeSinceLastEnemySpawn = time;
}

export function incrementEnemiesDestroyed() {
    enemiesDestroyed += 1;
}
export function setGameIntervalId(value) {
    gameIntervalId = value;
}

export function setObjects(value) {
    objects = value;
}