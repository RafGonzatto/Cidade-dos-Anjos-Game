import { FACE_LEFT, FACE_RIGHT } from '../static/constants.js';
import Animation from '../utils/animation.js';
import { input, context, quadtree }from "../gameConfig/gameConfig.js";
import { pointInCircle } from '../utils/utils.js';
import { focusCameraOn } from '../camera/utils.js';
// import MicWeapon from '../weapons/micWeapon.js';
// import DiscoBallWeapon from '../weapons/DiscoBallWeapon.js';
import {checkAABBCollision, resolveAABBCollision} from '../utils/utils.js';
import Enemy from './enemy.js';
import { Rectangle } from '../utils/quadtree.js';
import { lerp } from "../utils/utils.js";
import XP from './xp.js';
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
        this.handleMovement();
        focusCameraOn(this.x, this.y);    
        
        this.items.forEach(item => item.update());

        this.checkCollisions();

        this.updateAnimation();

        this.animation.update(); 
    }
    handleMovement(){
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

    }
    updateAnimation() {
        if (!this.isAttacking) {
            const isMoving = input.left || input.right || input.up || input.down;
            this.idle = !isMoving && (!input.attackPower1 || (input.attackPower1 && !this.skill1Cooldown));
        
            if (this.idle) {
                this.animation = this.direction === FACE_LEFT ? this.idleLeftAnimation : this.idleRightAnimation;
            } else {
                this.animation = this.direction === FACE_LEFT ? this.leftAnimation : this.rightAnimation;
            }
        }
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
    async checkCollisions() {
        const range = new Rectangle(
            this.x - this.width / 2 - 19, // Adiciona uma margem extra de 25 pixels
            this.y - this.height / 2 - 25, // Adiciona uma margem extra de 20 pixels
            this.width + 50, // Largura aumentada pela margem extra
            this.height + 50 // Altura aumentada pela margem extra
        );
        this.drawCollisionRectangle(context, range);
    
        const allVisibleObjects = quadtree.query(range);
        const visibleMapObjects = allVisibleObjects.filter(obj => obj.massive);
        console.log(visibleMapObjects)
        const visibleEnemies = allVisibleObjects.filter(obj => obj instanceof Enemy);
        const visibleXp = allVisibleObjects.filter(obj => obj instanceof XP);
    
        // Promessas para cada forEach
        const mapObjectsPromise = Promise.all(visibleMapObjects.map(async object => {
            if (object.massive && checkAABBCollision(this, object)) {
                this.drawCollisionOutline(context, object);
                resolveAABBCollision(this, object);
            }
        }));
    
        const enemiesPromise = Promise.all(visibleEnemies.map(async enemy => {
            if (pointInCircle(this.x, this.y, enemy.x, enemy.y, enemy.width / 2)) {
                this.takeDamage(enemy.attackStrength);
            }
        }));
    
        const xpPromise = Promise.all(visibleXp.map(async xp => {
            if (xp.destroyed) return;
    
            if (pointInCircle(xp.x, xp.y, this.x, this.y, xp.pickupRadius)) {
                xp.pickup();
                return;
            }
    
            if (pointInCircle(xp.x, xp.y, this.x, this.y, xp.attractRadius)) {
                xp.x = lerp(xp.x, this.x, 0.1);
                xp.y = lerp(xp.y, this.y, 0.1);
            }
        }));
        // Executa todos os forEach ao mesmo tempo
        await Promise.all([mapObjectsPromise, enemiesPromise, xpPromise]);
    }
     drawCollisionOutline(context, object) {
        context.strokeStyle = 'blue'; // Cor do contorno
        context.lineWidth = 10; // Largura do contorno
        context.strokeRect(object.x, object.y, object.width, object.height);
    }
     drawCollisionRectangle(context, range) {
        context.strokeStyle = 'red'; // Cor da linha
        context.lineWidth = 2; // Largura da linha
        context.strokeRect(range.x, range.y, range.w, range.h  );
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
