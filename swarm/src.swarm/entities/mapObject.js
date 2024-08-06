import { context } from "../gameConfig/gameConfig.js";

import { makeImage } from "../utils/utils.js";
export default class MapObject {
    constructor(url,x, y, width, height, massive) {
        this.image =  makeImage(`${url}`);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width; 
        this.massive = massive
    }

    draw() {
        const image = this.image
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

}


