export default class Animation {
    constructor(frames) {
        this.frames = frames;
        this.currentFrameIndex = 0;
        this.timeSinceLastFrame = Date.now();
    }

    update(idle) {
        if (!idle && Date.now() - this.timeSinceLastFrame > this.frames[this.currentFrameIndex].time) {
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
            this.timeSinceLastFrame = Date.now();
        }
    }

    image() {
        return this.frames[this.currentFrameIndex].image;
    }

    reset() {
        this.currentFrameIndex = 0;
        this.timeSinceLastFrame = Date.now();
    }
}
