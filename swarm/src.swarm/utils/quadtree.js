export default class Quadtree {
    constructor(boundary, capacity) {
        this.boundary = boundary; // Rectangle boundary
        this.capacity = capacity; // Maximum objects before subdivision
        this.objects = [];
        this.divided = false;
    }

    subdivide() {
        const { x, y, width, height } = this.boundary;
        const hw = width / 2;
        const hh = height / 2;

        this.northeast = new Quadtree({ x: x + hw, y: y - hh, width: hw, height: hh }, this.capacity);
        this.northwest = new Quadtree({ x: x - hw, y: y - hh, width: hw, height: hh }, this.capacity);
        this.southeast = new Quadtree({ x: x + hw, y: y + hh, width: hw, height: hh }, this.capacity);
        this.southwest = new Quadtree({ x: x - hw, y: y + hh, width: hw, height: hh }, this.capacity);

        this.divided = true;
    }

    insert(object) {
        if (!this.contains(this.boundary, object)) return false;

        if (this.objects.length < this.capacity) {
            this.objects.push(object);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        if (this.northeast.insert(object)) return true;
        if (this.northwest.insert(object)) return true;
        if (this.southeast.insert(object)) return true;
        if (this.southwest.insert(object)) return true;

        return false;
    }

    query(range, found) {
        if (!found) {
            found = [];
        }

        if (!this.intersects(range, this.boundary)) {
            return found;
        }

        for (let p of this.objects) {
            if (this.contains(range, p)) {
                found.push(p);
            }
        }

        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }

        return found;
    }

    contains(rect, object) {
        return (object.x >= rect.x - rect.width &&
                object.x < rect.x + rect.width &&
                object.y >= rect.y - rect.height &&
                object.y < rect.y + rect.height);
    }

    intersects(range, rect) {
        return !(range.x - range.width > rect.x + rect.width ||
                 range.x + range.width < rect.x - rect.width ||
                 range.y - range.height > rect.y + rect.height ||
                 range.y + range.height < rect.y - rect.height);
    }
}
