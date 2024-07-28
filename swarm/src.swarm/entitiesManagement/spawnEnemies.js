import { ENEMY_SPAWN_TIME_BETWEEN_WAVES, ENEMY_SPAWN_COUNT_PER_WAVE, WORLD_WIDTH, WORLD_HEIGHT } from '../static/constants.js';
import { objects, timeSinceLastEnemySpawn, setTimeSinceLastEnemySpawn } from "../gameConfig/gameConfig.js";
import { randomRange } from '../utils/utils.js';
import Enemy from '../entities/enemy.js';

export function spawnEnemies() {
    const timeSinceLastSpawn = Date.now() - timeSinceLastEnemySpawn;
    if (timeSinceLastSpawn < ENEMY_SPAWN_TIME_BETWEEN_WAVES) return;

    for (let i = 0; i < ENEMY_SPAWN_COUNT_PER_WAVE; i++) {
        const x = randomRange(0, WORLD_WIDTH);
        const y = randomRange(0, WORLD_HEIGHT);
        objects.push(new Enemy(x, y));
    }
    setTimeSinceLastEnemySpawn(Date.now());
}
