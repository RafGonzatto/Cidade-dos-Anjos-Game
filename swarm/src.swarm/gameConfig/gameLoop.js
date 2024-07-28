import { resetCanvas } from '../utils/utils.js';
import { spawnEnemies } from '../entitiesManagement/spawnEnemies.js';
import { focusCameraOn } from '../camera/utils.js';
import { player, playerUi, context, camera, canvas, setObjects, objects, gameState } from './gameConfig.js';

let lastTime = 0;

export function gameLoop(timestamp) {
    if (!gameState.isPaused) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        updateGame(deltaTime); // Passe deltaTime para ajustar o movimento baseado no tempo
    }
    requestAnimationFrame(gameLoop); // Solicite o próximo quadro
}

export function updateGame(deltaTime) {
    if (gameState.isPaused) return;
    resetCanvas();

    // Centralize a câmera no jogador
    focusCameraOn(player.x, player.y);

    // Ajuste o contexto para seguir a câmera
    context.save();
    context.translate(-camera.x + canvas.width / 2, -camera.y + canvas.height / 2);

    // Desenhar o jogador e outros elementos
    player.update();
    player.draw(); // Desenhar o jogador
    objects.forEach(object => {
        object.update();
        object.draw();
    });
    spawnEnemies();
    setObjects(objects.filter(object => !object.destroyed));
    const healthPercentage = player.health / player.maxHealth;
    playerUi.updateHealthBar(healthPercentage);
    playerUi.draw();

    // Restaure o contexto
    context.restore();
}
