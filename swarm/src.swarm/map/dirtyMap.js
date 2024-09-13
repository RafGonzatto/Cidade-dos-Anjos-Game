// configDirtyMap.js
import { context, canvas, mapObjects, player, quadtree, setMapObjects } from '../gameConfig/gameConfig.js';
import MapObject from '../entities/mapObject.js';
import { Collectable } from '../entities/collectables.js';
import { objectExistsAt, isFarEnoughFromOtherObjects, isInPlayerView } from '../utils/utils.js';
import {insertObjectsIntoQuadtree} from '../gameConfig/gameLoop.js';

const MARGIN = 200; // Margem de 200px
const MIN_DISTANCE = 150; // Distância mínima de 150px entre objetos

const elements = [
    { url: '/swarm/images/map/grass.png', probability: 0.1, height: 40, width: 40, distance: 60, massive: false },
    { url: '/swarm/images/map/grass2.png', probability: 0.1, height: 40, width: 40, distance: 60, massive: false },
    { url: '/swarm/images/map/grass3.png', probability: 0.1, height: 120, width: 115, distance: 100, massive: false },
    { url: '/swarm/images/map/grass4.png', probability: 0.1, height: 110, width: 110, distance: 250, massive: false },
    { url: '/swarm/images/map/rock.png', probability: 0.1, height: 20, width: 40, distance: 100, massive: false },
    { url: '/swarm/images/map/rock2.png', probability: 0.1, height: 20, width: 40, distance: 150, massive: false },
    { url: '/swarm/images/map/rock3.png', probability: 0.1, height: 20, width: 40, distance: 100, massive: false },
    { url: '/swarm/images/map/rock4.png', probability: 0.1, height: 20, width: 40, distance: 100, massive: false },
    { url: '/swarm/images/map/barrel.png', probability: 0.01, height: 40, width: 75, distance: 120, massive: true },
    { url: '/swarm/images/map/car.png', probability: 0.01, height: 49, width: 161, distance: 120, massive: true },
    { url: '/swarm/images/map/chest.png', probability: 0.005, height: 30, width: 30, distance: 120, massive: true, destroyed: false,
        destroy: function(player) {
            player.gainXp(10);
            this.destroyed = true;
        }
    },
];

export function configDirtyMap() {
    console.log("configDirtyMap");
    const startX = player.x - canvas.width / 2 - MARGIN;
    const startY = player.y - canvas.height / 2 - MARGIN;
    const endX = player.x + canvas.width / 2 + MARGIN;
    const endY = player.y + canvas.height / 2 + MARGIN;

    elements.forEach(({ url, probability, height, width, distance, massive, destroy }) => {
        context.imageSmoothingEnabled = false;

        for (let y = startY; y < endY; y += distance) {
            for (let x = startX; x < endX; x += distance) {
                if (Math.random() < probability &&
                    !objectExistsAt(x, y, width, height, mapObjects) &&
                    isFarEnoughFromOtherObjects(x, y, MIN_DISTANCE, mapObjects) &&
                    !isInPlayerView(x, y, width, height, player, canvas)) {
                        const newObject = probability === 0.005
                            ? new Collectable(url, x, y, width, height, massive, destroy)
                            : new MapObject(url, x, y, width, height, massive);

                        mapObjects.push(newObject);
                        console.log(mapObjects)
                }
            }
        }
    });

    // Update visible map objects if needed
    setMapObjects(mapObjects.filter(mapObject => !mapObject.destroyed));
}
