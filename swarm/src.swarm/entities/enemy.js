import { player, objects, context } from "../gameConfig/gameConfig.js";
import Animation from "../utils/animation.js";
import Candy from "./candy.js";
import { FACE_LEFT, FACE_RIGHT } from "../static/constants.js";
import { skeletonImageLeft, skeletonImageLeft2, skeletonImageRight, skeletonImageRight2 } from "../static/images.js";
import { pointInCircle } from "../utils/utils.js";
import { incrementEnemiesDestroyed } from "../gameConfig/gameConfig.js";
import DamageTakenText from "../utils/damageTakenText.js";

export default class Enemy {
    constructor(x, y) {
        this.leftAnimation = new Animation([{ time: 200, image: skeletonImageLeft }, { time: 200, image: skeletonImageLeft2 }]);
        this.rightAnimation = new Animation([{ time: 200, image: skeletonImageRight }, { time: 200, image: skeletonImageRight2 }]);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 1;
        this.health = 10;
        this.attackStrength = 0.1;
        this.attackSpeed = 2000;
        this.lastAttackTime = Date.now();
        this.direction = FACE_LEFT;
        this.animation = this.leftAnimation;
        this.setDirection(FACE_LEFT);
    }

    update() {
        this.prevX = this.x;
        this.prevY = this.y;
        if (this.health <= 0) {
            this.destroy();
            return;
        }
        var dx = player.x - this.x;
        var dy = player.y - this.y;
        var angle = Math.atan2(dy, dx);
        this.x += this.speed * Math.cos(angle);
        this.y += this.speed * Math.sin(angle);
        this.setDirection(this.x > this.prevX ? FACE_RIGHT : FACE_LEFT);
        this.animation.update(false);
        const nearPlayer = pointInCircle(this.x, this.y, player.x, player.y, 50);
        if (nearPlayer && Date.now() - this.lastAttackTime > this.attackSpeed) {
            player.health = Math.max(player.health - this.attackStrength, 0);
            this.lastAttackTime = Date.now();
        }
    }

    draw() {
        const image = this.animation.image();
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

    setDirection(direction, reset = true) {
        if (this.direction === direction) return;
        this.direction = direction;
        this.animation = this.direction === FACE_LEFT ? this.leftAnimation : this.rightAnimation;
        if (reset) this.animation.reset();
    }

    hit(strength) {
        this.health -= strength;
        objects.push(new DamageTakenText(strength, this.x, this.y));
    }

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;
        incrementEnemiesDestroyed();
        objects.push(new Candy(this.x, this.y));
    }
}


