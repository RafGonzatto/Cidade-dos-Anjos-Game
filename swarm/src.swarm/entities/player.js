import { FACE_LEFT, FACE_RIGHT } from '../static/constants.js';
import Animation from '../utils/animation.js';
import { objects, input, context, mapObjects }from "../gameConfig/gameConfig.js";
import { pointInCircle } from '../utils/utils.js';
import { focusCameraOn } from '../camera/utils.js';
// import MicWeapon from '../weapons/micWeapon.js';
// import DiscoBallWeapon from '../weapons/DiscoBallWeapon.js';
import {checkAABBCollision, resolveAABBCollision} from '../utils/utils.js';
import Enemy from './enemy.js';

export default class Player {
    constructor(x, y, championConfig) {   
        this.x = x;
        this.y = y;
        this.setAnimations(championConfig.animations);
        this.championConfig = championConfig;
        this.champion = championConfig.champion;
        this.width = championConfig.width;
        this.height = championConfig.height;
        this.speed = championConfig.speed;
        this.attackRange = championConfig.attackRange; 
        this.attackStrength = championConfig.attackStrength; 
        this.health = championConfig.maxHealth; 
        this.maxHealth = championConfig.maxHealth;
        this.attackDuration = championConfig.attackDuration; 
        this.xp = 0;
        this.level = 1;
        this.nextLevelXp = 10;
        this.attackStartTime = 0;
        this.direction = FACE_LEFT;
        this.idle = true; 
        this.baseCooldownSkill1 = championConfig.baseCooldownSkill1; 
        this.currentCooldownSkill1 = championConfig.baseCooldownSkill1;
        this.skill1Cooldown = true;
        this.skill1CooldownStartTime = 0; 
        this.isAttacking = false;
        this.items = [];
        this.setDirection(FACE_LEFT);
    }
 setAnimations(animations) {
        this.leftAnimation = new Animation(animations.left);
        this.rightAnimation = new Animation(animations.right);
        this.attackLeftAnimation = new Animation(animations.attackLeft);
        this.attackRightAnimation = new Animation(animations.attackRight);
        this.idleLeftAnimation = new Animation(animations.idleLeft);
        this.idleRightAnimation = new Animation(animations.idleRight);
        this.animation = new Animation(animations.idleLeft);
    }
    update() { 
        if (input.attackPower1 && this.skill1Cooldown) {
            this.isAttacking = true;
            this.championConfig.skil1(this);
        }

        if (!this.skill1Cooldown) {
            const elapsed = (Date.now() - this.skill1CooldownStartTime) / 1000;
            if (elapsed >= this.currentCooldownSkill1) {
                this.skill1Cooldown = true;
            }
        }
        if (input.right) {
            this.x += this.speed;
            this.setDirection(FACE_RIGHT);
        }
        if (input.left) {
            this.x -= this.speed;
            this.setDirection(FACE_LEFT);
        }
        if (input.up) this.y -= this.speed;
        if (input.down) this.y += this.speed;

        focusCameraOn(this.x, this.y);    
        
        this.items.forEach(item => item.update());
        this.checkEnemyCollisions(); 
        this.checkMapObjectCollisions();

        if (!this.isAttacking) {
            const isMoving = input.left || input.right || input.up || input.down;
            this.idle = !isMoving && (!input.attackPower1 || (input.attackPower1 && !this.skill1Cooldown));
        
            if (this.idle) {
                this.animation = this.direction === FACE_LEFT ? this.idleLeftAnimation : this.idleRightAnimation;
            } else {
                this.animation = this.direction === FACE_LEFT ? this.leftAnimation : this.rightAnimation;
            }
        }
        this.animation.update(); 
    }

    draw() {
        this.items.forEach(item => item.draw());
        const image = this.animation.image();
        if (image.complete && image.naturalWidth !== 0) {
            context.drawImage(image, this.x - (this.width / 2.0), this.y - (this.height / 2.0), this.width, this.height);
        } else {
            console.error('Imagem não carregada ou corrompida:', image.src);
        }
    }
    setDirection(direction) {
        if (this.direction === direction && !this.isAttacking && !this.idle) return;
        this.direction = direction;
        if (this.idle) {
            this.animation = this.direction === FACE_LEFT ? this.idleLeftAnimation : this.idleRightAnimation;
        } else {
            this.animation = this.direction === FACE_LEFT ? this.leftAnimation : this.rightAnimation;
        }
        this.animation.reset();
    }
    checkMapObjectCollisions() {
        mapObjects.forEach(object => {
            if (object.massive && checkAABBCollision(this, object)) {
                resolveAABBCollision(this, object);
            }
        });
    }
    

    checkEnemyCollisions() {
        objects.forEach(object => {
            if (object instanceof Enemy && pointInCircle(this.x, this.y, object.x, object.y, object.width / 2)) {
                this.takeDamage(object.attackStrength);
            }
        });
    }

    takeDamage(amount) {
        this.health = Math.max(this.health - amount, 0);
        if (this.health <= 0) {
            this.gameOver();
        }
    }

    gainXp(xp) {
        this.xp += xp;
        if (this.xp >= this.nextLevelXp) this.levelUp();
    }

    gameOver() {
        this.health = 100;
    }

    levelUp() {
        this.level += 1;
        this.xp = 0;
        this.nextLevelXp = this.nextLevelXp * 2.5;
    }

    applyCooldownReduction(reduction) {
        this.currentCooldown = Math.max(this.baseCooldown - reduction, 0.5); 
    }
}
