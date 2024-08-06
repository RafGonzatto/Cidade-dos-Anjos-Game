import {
    rafImageLeft2,
    rafImageLeft3,
    rafImageLeft4,
    rafImageIdle,
    rafImageIdleLeft,
    rafImageRight2,
    rafImageRight3,
    rafImageRight4,
    rafImageAttackLeft,
    rafImageAttackRight,
} from '../../../static/images.js';

export const rafAnimations = {
    left: [
        { time: 200, image: rafImageLeft2 },
        { time: 200, image: rafImageLeft3 },
        { time: 200, image: rafImageLeft4 }
    ],
    right: [
        { time: 200, image: rafImageRight2 },
        { time: 200, image: rafImageRight3 },
        { time: 200, image: rafImageRight4 }
    ],
    attackLeft: [
        { time: 100, image: rafImageAttackLeft }
    ],
    attackRight: [
        { time: 100, image: rafImageAttackRight }
    ],
    idleLeft: [
        { time: 200, image: rafImageIdleLeft }
    ],
    idleRight: [
        { time: 200, image: rafImageIdle }
    ]
};
