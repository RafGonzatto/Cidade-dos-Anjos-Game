import { ENEMY_SPAWN_TIME_BETWEEN_WAVES, ENEMY_SPAWN_COUNT_PER_WAVE, WORLD_WIDTH, WORLD_HEIGHT, MIN_SPAWN_RADIUS, MAX_SPAWN_RADIUS } from '../static/constants.js';
import { objects, player, timeSinceLastEnemySpawn, setTimeSinceLastEnemySpawn, quadtree } from "../gameConfig/gameConfig.js";
import { randomRange } from '../utils/utils.js';
import Enemy from '../entities/enemy.js';
import { Rectangle } from '../utils/quadtree.js';

const MAX_VISIBLE_ENEMIES = 1;

export function spawnEnemies() {
    const timeSinceLastSpawn = Date.now() - timeSinceLastEnemySpawn;
    if (timeSinceLastSpawn < ENEMY_SPAWN_TIME_BETWEEN_WAVES) return;

    // Criar uma área de consulta para verificar inimigos visíveis
    const boundary = new Rectangle(
        player.x,
        player.y,
        WORLD_WIDTH,  // ou o tamanho da tela de visualização
        WORLD_HEIGHT  // ou o tamanho da tela de visualização
    );

    // Obter todos os objetos visíveis e filtrar apenas os inimigos
    const visibleEnemies = quadtree.query(boundary).filter(obj => obj instanceof Enemy);

    // Se o número de inimigos visíveis for maior ou igual ao limite, não spawnar mais
    if (visibleEnemies.length >= MAX_VISIBLE_ENEMIES) return;

    // Calcular quantos inimigos podem ser spawnados para não ultrapassar o limite
    const spawnCount = Math.min(ENEMY_SPAWN_COUNT_PER_WAVE, MAX_VISIBLE_ENEMIES - visibleEnemies.length);

    for (let i = 0; i < spawnCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = randomRange(MIN_SPAWN_RADIUS, MAX_SPAWN_RADIUS); // Distância aleatória dentro do raio
        const x = player.x + distance * Math.cos(angle);
        const y = player.y + distance * Math.sin(angle);
        objects.push(new Enemy(x, y));
    }
    setTimeSinceLastEnemySpawn(Date.now());
}
