import { FACE_LEFT, FACE_RIGHT } from '../static/constants.js';
import Animation from '../utils/animation.js';
import { playerImageLeft, playerImageLeft2, playerImageRight, playerImageRight2, 
    playerImageAtack, playerImageLeftAtack
} from '../static/images.js';
import { objects, input, context }from "../gameConfig/gameConfig.js";
import { pointInCircle } from '../utils/utils.js';
import { focusCameraOn } from '../camera/utils.js';
import MicWeapon from '../weapons/micWeapon.js';
import DiscoBallWeapon from '../weapons/DiscoBallWeapon.js';
import Enemy from './enemy.js';

export default class Player {
    constructor(x, y, champion) {
        this.leftAnimation = new Animation([{ time: 200, image: playerImageLeft }, { time: 200, image: playerImageLeft2 }]);
        this.rightAnimation = new Animation([{ time: 200, image: playerImageRight }, { time: 200, image: playerImageRight2 }]);
        this.attackLeftAnimation = new Animation([{ time: 100, image: playerImageLeftAtack }]);
        this.attackRightAnimation = new Animation([{ time: 100, image: playerImageAtack }]);
        this.idleLeftAnimation = new Animation([{ time: 200, image: playerImageLeft2 }]);
        this.idleRightAnimation = new Animation([{ time: 200, image: playerImageRight2 }]);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 3;
        this.attackRange = 100; // Distância de ataque
        this.attackStrength = 10; // Força do ataque
        this.health = 100; // Vida do jogador
        this.maxHealth = 100;
        this.xp = 0;
        this.champion = champion;
        this.level = 1;
        this.nextLevelXp = 10;
        this.prevLevelXp = 0;
        this.attackStartTime = 0;
        this.attackDuration = 0.5; 
        this.direction = FACE_LEFT;
        this.idle = true; // Inicialmente o jogador está em idle
        this.Skill1Cooldown = true;
        this.Skill1CooldownStartTime = 0; 
        this.IsAttacking = false;
        this.animation = this.idleLeftAnimation; // Inicialmente a animação é idle
        this.items = [];
        this.setDirection(FACE_LEFT);
    }

    update() { 
        // Gerenciar o ataque
        if (input.attackPower1 && this.Skill1Cooldown) {
            this.startAttack();
            this.IsAttacking = true;
            return; // Não atualize o movimento ou idle enquanto estiver atacando
        }

        // Gerenciar cooldown
        if (!this.Skill1Cooldown) {
            const elapsed = (Date.now() - this.Skill1CooldownStartTime) / 1000;
            if (elapsed >= 3) {
                this.Skill1Cooldown = true;
            }
        }

        // Atualizar posição do jogador
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
        this.checkEnemyCollisions(); // Verificar colisão com inimigos

        // Atualizar a animação com base no estado idle
        if (!this.IsAttacking) {
            const isMoving = input.left || input.right || input.up || input.down;
            this.idle = !isMoving && (!input.attackPower1 || (input.attackPower1 && !this.Skill1Cooldown));
        
            if (this.idle) {
                this.animation = this.direction === FACE_LEFT ? this.idleLeftAnimation : this.idleRightAnimation;
            } else {
                this.animation = this.direction === FACE_LEFT ? this.leftAnimation : this.rightAnimation;
            }
        }
        this.animation.update(); // Certifique-se de que a animação está atualizada
    }

    draw() {
        this.items.forEach(item => item.draw());
        const image = this.animation.image();
        context.drawImage(image, this.x - (this.width / 2.0), this.y - (this.height / 2.0), this.width, this.height);

        // context.fillStyle = 'red';
        // context.fillRect(this.x - (this.width / 2.0), this.y - (this.height / 2.0) - 10, this.width, 5);
        // context.fillStyle = 'green';
        // context.fillRect(this.x - (this.width / 2.0), this.y - (this.height / 2.0) - 10, (this.width * this.health) / this.maxHealth, 5);
    }

    setDirection(direction) {
        // Verificar se a direção mudou ou se está idle
        if (this.direction === direction && !this.IsAttacking && !this.idle) return;
        this.direction = direction;
        if (this.idle) {
            this.animation = this.direction === FACE_LEFT ? this.idleLeftAnimation : this.idleRightAnimation;
        } else {
            this.animation = this.direction === FACE_LEFT ? this.leftAnimation : this.rightAnimation;
        }
        this.animation.reset(); // Reinicie a animação
    }

    startAttack() {
        this.Skill1Cooldown = false;
        this.Skill1CooldownStartTime = Date.now(); // Define o tempo de início do cooldown
        this.animation = this.direction === FACE_LEFT ? this.attackLeftAnimation : this.attackRightAnimation;
        this.animation.reset(); // Reinicie a animação de ataque
        objects.forEach(object => {
            if (object instanceof Enemy && pointInCircle(this.x, this.y, object.x, object.y, this.attackRange)) {
                object.hit(this.attackStrength);
            }
        });
        
        // Após o ataque, definir a animação de ataque e reiniciar
        setTimeout(() => {
            this.IsAttacking = false;
            this.setDirection(this.direction); // Retorna à animação normal
        }, this.attackDuration * 1000); // Aguarde a duração do ataque antes de voltar à animação normal
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
        this.prevLevelXp = this.nextLevelXp;
        this.nextLevelXp = this.nextLevelXp * 2.5;
    }

    choseChampion(champion) {
        if (champion === 1) {
            return;
        }
    }
}
