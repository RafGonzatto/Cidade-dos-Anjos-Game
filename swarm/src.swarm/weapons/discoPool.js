// import Weapon from "./weapon.js";
// import { player, objects, context } from "../gameConfig/gameConfig.js";
// import Enemy from "../entities/enemy.js";
// import { lerp, randomRange, pointInCircle } from "../utils/utils.js";
// import Animation from "../utils/animation.js";
// import { ballImage1, ballImage2 } from "../static/images.js";

// export default class DiscoPool extends Weapon {
//     constructor() {
//         const speed = 2000;
//         const animationFrames = 5;
//         const strength = 10;
//         super(speed, animationFrames, strength);
//         this.updateFrames = 60 * 10;
//         this.animation = new Animation([
//             { time: 12, image: ballImage1 },
//             { time: 12, image: ballImage2 },
//         ]);
//         this.x = player.x + randomRange(-300, 300);
//         this.y = player.y + randomRange(-300, 300);
//         this.fillStyle = 'rgb(225, 180, 255)';
//         this.opacity = 0.7;
//         this.radius = 80;
//     }

//     update() {
//         super.update();
//         this.animation.update();
//         if (this.updateFramesPassed > this.updateFrames) {
//             this.destroyed = true;
//         }
//         this.opacity = lerp(this.opacity, 0, 0.002);

//         if (this.firstAttackFrame()) {
//             for (const object of objects) {
//                 if (object instanceof Enemy) {
//                     if (!pointInCircle(object.x, object.y, this.x, this.y, this.radius)) continue;
//                     object.hit(this.attackStrength);
//                 }
//             }
//         }
//     }

//     draw() {
//         context.save();
//         context.fillStyle = this.fillStyle;
//         context.globalAlpha = this.opacity;
//         context.beginPath();
//         context.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
//         context.fill();
//         context.restore();

//         // draw the enemy sprite...
//         const image = this.animation.image();
//         context.drawImage(
//             image,
//             this.x - (image.width / 3.2),
//             this.y - 140,
//             image.width / 2.0, image.height / 2.0
//         );
//     }
// }
