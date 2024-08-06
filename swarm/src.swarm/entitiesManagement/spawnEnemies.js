import { ENEMY_SPAWN_TIME_BETWEEN_WAVES, ENEMY_SPAWN_COUNT_PER_WAVE, WORLD_WIDTH, WORLD_HEIGHT, MIN_SPAWN_RADIUS, MAX_SPAWN_RADIUS } from '../static/constants.js';
import { objects, player, timeSinceLastEnemySpawn, setTimeSinceLastEnemySpawn } from "../gameConfig/gameConfig.js";
import { randomRange } from '../utils/utils.js';
import Enemy from '../entities/enemy.js';

export function spawnEnemies() {
    const timeSinceLastSpawn = Date.now() - timeSinceLastEnemySpawn;
    if (timeSinceLastSpawn < ENEMY_SPAWN_TIME_BETWEEN_WAVES) return;

    for (let i = 0; i < ENEMY_SPAWN_COUNT_PER_WAVE; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = randomRange(MIN_SPAWN_RADIUS, MAX_SPAWN_RADIUS);// Distância aleatória dentro do raio
        const x = player.x + distance * Math.cos(angle);
        const y = player.y + distance * Math.sin(angle);
        objects.push(new Enemy(x, y));
    }
    setTimeSinceLastEnemySpawn(Date.now());
}
