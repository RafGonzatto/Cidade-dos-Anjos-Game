import { enemyGroups } from "../gameConfig/gameConfig.js";
export function addEnemyToGroup(enemy) {
    const groupKey = `${Math.floor(enemy.x / 100)},${Math.floor(enemy.y / 100)}`;
    if (!enemyGroups.has(groupKey)) {
        enemyGroups.set(groupKey, []);
    }
    enemyGroups.get(groupKey).push(enemy);
}

export function getEnemiesInGroup(x, y) {
    const groupKey = `${Math.floor(x / 100)},${Math.floor(y / 100)}`;
    return enemyGroups.get(groupKey) || [];
}
