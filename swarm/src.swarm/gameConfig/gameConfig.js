
import { onKeyDown, onKeyUp, onKeyEsc } from '../utils/utils.js';
import {rafConfig} from '../entities/champions/raf.js';
import Player from '../entities/player.js';
import { configDirtyMap } from '../map/dirtyMap.js';
import {Quadtree,  Rectangle }  from '../utils/quadtree.js';

export let targetFps = 60;
export let player;
export let camera;
export let canvas;
export let canvasContainer
export let context;
export let gameIntervalId = null;
export let levelRunStart;
export let input = { right: false, left: false, up: false, down: false, attackPower1: false };
export let objects = [];
export let mapObjects = [];
export let xpDropped = [];
export let enemiesDestroyed = 0;
export let playerUi;
export let nextEnemyId = 0;
export let timeSinceLastEnemySpawn = Date.now();
export const capacity = 4; 
export let quadtree 
export const enemyGroups = new Map();

export const gameState = {
    isPaused: false
};
export function setQuadtree(boundary){
    quadtree = new Quadtree(boundary, capacity);
}
export function setPlayer(value) {
    player = value;
}

export function setLevelRunStart(value) {
    levelRunStart = value;
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
export function setMapObjects(value) {
    mapObjects = value;
}
export function setXP(value) {
    xpDropped = value;
}

export function configCanvas(){
    canvas = document.getElementById('canvas');
    canvasContainer = document.getElementById('canvasContainer');
    context = canvas.getContext('2d');
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    camera = { x: canvas.width / 2, y: canvas.height / 2 };
    let boundary = new Rectangle(
        0,
        0,
        canvas.width,
        canvas.height
    );
    setQuadtree(boundary)
}

export function configMap() {
    configDirtyMap();
}
export function configEvents() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onKeyEsc);
}

export function choseChampion(champion) { 
    let championSelect;
    switch (champion) {
        case "0":
            return championSelect = new Player(canvas.width / 2, canvas.height / 2, rafConfig);
        case "1": // Raf
            break;
        case "2": // Raf
            break;
        case "3": // Raf
            break;
        case "4": // Raf
            break;
    }
}