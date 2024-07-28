import Weapon from "./weapon.js";
import { objects } from "../gameConfig/gameConfig.js";
import { randomRange } from "../utils/utils.js";
import DiscoPool  from "./discoPool.js";
export default class DiscoBallWeapon extends Weapon {
    constructor() {
        const attackSpeed = 14000; // ms
        const attackAnimationFrames = 5;
        super(attackSpeed, attackAnimationFrames);
        this.level = 4;
    }

    spawnCount() {
        return this.level;
    }

    update() {
        super.update();
        if (this.firstAttackFrame()) {
            const spawnCount = this.spawnCount();
            for (var i = 0; i < spawnCount; i++) {
                setTimeout(() => {
                    objects.push(
                        new DiscoPool()
                    );
                }, i * (700 + randomRange(0, 100)));
            }
        }
    }

    draw() {}
}