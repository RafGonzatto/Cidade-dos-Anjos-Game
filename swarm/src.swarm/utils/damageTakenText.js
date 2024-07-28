import { context } from "../gameConfig/gameConfig.js";

export default class DamageTakenText {
    constructor(damage, x, y) {
        this.text = damage.toString();
        this.x = x;
        this.y = y;
        this.start = Date.now();
        this.lifetime = 1000;
        this.destroyed = false;
    }

    update() {
        if (this.destroyed) return;
        var timeAlive = Date.now() - this.start;
        if (timeAlive > this.lifetime) {
            this.destroy();
            return;
        }
        this.y -= 1;
    }

    draw() {
        if (this.destroyed) return;
        context.font = '15px Arial';
        context.fillStyle = 'red';
        context.fillText(this.text, this.x, this.y);
    }

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;
    }
}
