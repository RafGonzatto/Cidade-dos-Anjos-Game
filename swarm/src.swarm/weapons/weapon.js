export default class Weapon {
    constructor(speed, animationFrames, strength) {
        this.attackSpeed = speed; // ms
        this.attackAnimationFrames = animationFrames;
        this.attackStrength = strength;
        this.lastAttackTime = Date.now();
        this.attacking = false;
        this.attackFramesPassed = 0;
        this.updateFramesPassed = 0;
    }

    update() {
        const msSinceLastAttack =
            Date.now() - this.lastAttackTime;
        if (msSinceLastAttack > this.attackSpeed) {
            this.attacking = true;
            this.lastAttackTime = Date.now();
        }
        if (this.attacking) {
            this.attackFramesPassed += 1;
            if (this.attackFramesPassed >= this.attackAnimationFrames) {
                this.attacking = false;
                this.attackFramesPassed = 0;
            }
        }
        this.updateFramesPassed += 1;
    }

    draw() {}

    firstAttackFrame() {
        return this.attacking && this.attackFramesPassed === 1;
    }
}