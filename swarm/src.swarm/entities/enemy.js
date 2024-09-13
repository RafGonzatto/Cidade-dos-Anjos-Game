import { player, objects, context, mapObjects, xpDropped, quadtree} from "../gameConfig/gameConfig.js";
import Animation from "../utils/animation.js";
import XP from "./xp.js";
import { FACE_LEFT, FACE_RIGHT } from "../static/constants.js";
import { ememieImageLeft, ememieImageRight } from "../static/images.js";
import { pointInCircle } from "../utils/utils.js";
import { incrementEnemiesDestroyed } from "../gameConfig/gameConfig.js";
import DamageTakenText from "../utils/damageTakenText.js";
import { checkAABBCollision, resolveAABBCollision } from '../utils/utils.js';
import { Rectangle } from '../utils/quadtree.js';

export default class Enemy {
    constructor(x, y) {
        this.leftAnimation = new Animation([{ time: 200, image: ememieImageLeft }]);
        this.rightAnimation = new Animation([{ time: 200, image: ememieImageRight }]);
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 61;
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
     //   this.checkMapObjectCollisions();
       // this.checkEnemyCollisions();
        
        var dx = player.x - this.x;
        var dy = player.y - this.y;
        var angle = Math.atan2(dy, dx);
        this.x += this.speed * Math.cos(angle);
        this.y += this.speed * Math.sin(angle);
        this.setDirection(this.x > this.prevX ? FACE_RIGHT : FACE_LEFT);
        this.animation.update(false);
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
       // objects.push(new DamageTakenText(strength, this.x, this.y));
    }

    checkMapObjectCollisions() {
        // Crie uma área de consulta para o quadtree
        const range = new Rectangle(
            this.x - this.width / 2 -25, // Adiciona uma margem extra de 100 pixels
            this.y - this.height / 2 - 20, // Adiciona uma margem extra de 100 pixels
            this.width + 70, // Largura aumentada pela margem extra
            this.height + 70 // Altura aumentada pela margem extra
        );

        // Obtenha os objetos que estão na área de consulta e são massivos
        const visibleMapObjects = quadtree.query(range).filter(obj => obj.massive);
        
        visibleMapObjects.forEach(object => {
            if (object.massive && checkAABBCollision(this, object)) {
                resolveAABBCollision(this, object);
            }
        });
    
    }

    // checkEnemyCollisions() {
    //     // Crie uma área de consulta para o quadtree
    //     const range = new Rectangle(
    //         this.x - this.width / 2,
    //         this.y - this.height / 2,
    //         this.width,
    //         this.height
    //     );

    //     // Obtenha os inimigos que estão na área de consulta
    //     const visibleEnemies = quadtree.query(range).filter(obj => obj instanceof Enemy && obj !== this);

    //     visibleEnemies.forEach(enemy => {
    //         const dx = enemy.x - this.x;
    //         const dy = enemy.y - this.y;
    //         const distance = Math.sqrt(dx * dx + dy * dy);
    //         const MIN_DISTANCE_BETWEEN_ENEMIES = 40;

    //         if (distance < MIN_DISTANCE_BETWEEN_ENEMIES) {
    //             const overlap = MIN_DISTANCE_BETWEEN_ENEMIES - distance;
    //             const adjustX = (dx / distance) * overlap / 2;
    //             const adjustY = (dy / distance) * overlap / 2;
    //             this.x -= adjustX;
    //             this.y -= adjustY;
    //             enemy.x += adjustX;
    //             enemy.y += adjustY;
    //         }
    //     });
    // }

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;
        incrementEnemiesDestroyed();
        xpDropped.push(new XP(this.x, this.y));
    }
}
