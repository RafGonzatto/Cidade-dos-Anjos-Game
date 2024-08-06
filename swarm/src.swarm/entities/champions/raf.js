import { rafAnimations } from './animations/rafAnimations.js';
import { FACE_LEFT } from '../../static/constants.js';
import { mapObjects, objects } from '../../gameConfig/gameConfig.js';
import Enemy from '../enemy.js';
import { pointInCircle } from '../../utils/utils.js';
import { Collectable } from '../collectables.js';

export const rafConfig = {
    champion: 0,
    animations: rafAnimations,
    attackDuration: 0.5,
    width : 50,
    height : 50,
    speed : 3,
    attackRange : 400, 
    attackStrength : 10, 
    maxHealth : 100,
    level : 1,
    nextLevelXp : 10,
    prevLevelXp : 0,
    attackStartTime : 0,
    attackDuration : 0.5, 
    baseCooldownSkill1 : 3,
    skil1: function(player) {
        // Implementação do ataque específico para Raf
        player.skill1Cooldown = false;
        player.skill1CooldownStartTime = Date.now();

        player.animation = player.direction === FACE_LEFT ? player.attackLeftAnimation : player.attackRightAnimation;
        player.animation.reset();

        objects.forEach(object => {
            if (object instanceof Enemy && pointInCircle(player.x, player.y, object.x, object.y, player.attackRange)) {
                object.hit(player.attackStrength);
            }
        });
        mapObjects.forEach(object => {
            if (object instanceof Collectable && pointInCircle(player.x, player.y, object.x, object.y, player.attackRange)) {
                object.interact(player);
            }
        });


        setTimeout(() => {
            player.isAttacking = false;

            player.setDirection(player.direction);
        }, player.attackDuration * 1000);
    }
};

