import MapObject from "./mapObject.js";

export class Collectable extends MapObject {
    constructor(url, x, y, width, height, massive, destroy) {
        super(url, x, y, width, height, massive);
        this.destroy = destroy;
    }

    interact(player) {
        if (this.destroy) {
            this.destroy(player);
        }
    }
}