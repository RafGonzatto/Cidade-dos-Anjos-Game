import { camera, canvas, canvasContainer, context } from "../gameConfig/gameConfig.js";
import { playerUi }from "../gameConfig/gameConfig.js";
export function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    playerUi.updatePosition();
    // Recalcule a posição da câmera para centralizar o jogador após o redimensionamento
    focusCameraOn(camera.x, camera.y);
}

export function focusCameraOn(targetX, targetY) {
    playerUi.updatePosition();
    camera.x = targetX;
    camera.y = targetY;
    updateBackgroundPosition(targetX, targetY);
}
function updateBackgroundPosition(targetX, targetY) {
    const offsetX = -targetX;
    const offsetY = -targetY;
    canvas.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    
    context.imageSmoothingEnabled = false;
}