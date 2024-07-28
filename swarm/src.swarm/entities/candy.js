
import { candyDroppedImage } from "../static/images.js";
import { pointInCircle } from "../utils/utils.js";
import { player, context } from "../gameConfig/gameConfig.js";
import { lerp } from "../utils/utils.js";
export default class Candy {
    constructor(x, y) {
        this.image = candyDroppedImage;
        this.x = x;
        this.y = y;
        this.attractRadius = 10;
        this.pickupRadius = 50;
        this.xp = 1;
        this.destroyed = false; 
    }

    update() {
        if (this.destroyed) return;

        if (pointInCircle(this.x, this.y, player.x, player.y, this.pickupRadius)) {
            this.pickup();
            return;
        }

        if (pointInCircle(this.x, this.y, player.x, player.y, this.attractRadius)) {
            this.x = lerp(this.x, player.x, 0.1);
            this.y = lerp(this.y, player.y, 0.1);
        }
    }

    draw() {
        context.drawImage(
            this.image,
            this.x,
            this.y,
            this.image.width, this.image.height
        );
    }

    draw() {
        context.drawImage(this.image, this.x, this.y);
    }

    pickup() {
        if (this.destroyed) return;
        player.gainXp(this.xp);
        this.destroy();
    }

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;
    }
}