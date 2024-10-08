
export class Objects {
    constructor(x, y, data) {
      this.x = x;
      this.y = y;
      this.userData = data;
    }
  
    sqDistanceFrom(other, sensitivity = 1) {
      const dx = other.x - this.x;
      const dy = other.y - this.y;
  
      return dx * dx + dy * dy * sensitivity;
    }
  
    distanceFrom(other) {
      return Math.sqrt(this.sqDistanceFrom(other, sensitivity));
    }
  }
  
  export class Rectangle {
    constructor(x, y, w, h, data) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  
      this.left = x - w / 2;
      this.right = x + w / 2;
      this.top = y - h / 2;
      this.bottom = y + h / 2;
    }
  
    contains(point) {
      return (
        this.left <= point.x && point.x <= this.right &&
        this.top <= point.y && point.y <= this.bottom
      );
    }
  
    intersects(range) {
      const left = this.x - this.width / 2;
      const right = this.x + this.width / 2;
      const top = this.y - this.height / 2;
      const bottom = this.y + this.height / 2;
  
      const rangeLeft = range.x - range.width / 2;
      const rangeRight = range.x + range.width / 2;
      const rangeTop = range.y - range.height / 2;
      const rangeBottom = range.y + range.height / 2;
  
      return !(
          right < rangeLeft || 
          left > rangeRight || 
          bottom < rangeTop || 
          top > rangeBottom   
      );
  }
  
  
    subdivide(quadrant) {
      switch (quadrant) {
        case 'ne':
          return new Rectangle(this.x + this.w / 4, this.y - this.h / 4, this.w / 2, this.h / 2);
        case 'nw':
          return new Rectangle(this.x - this.w / 4, this.y - this.h / 4, this.w / 2, this.h / 2);
        case 'se':
          return new Rectangle(this.x + this.w / 4, this.y + this.h / 4, this.w / 2, this.h / 2);
        case 'sw':
          return new Rectangle(this.x - this.w / 4, this.y + this.h / 4, this.w / 2, this.h / 2);
      }
    }
  
    xDistanceFrom(point) {
      if (this.left <= point.x && point.x <= this.right) {
        return 0;
      }
  
      return Math.min(
        Math.abs(point.x - this.left),
        Math.abs(point.x - this.right)
      );
    }
  
    yDistanceFrom(point) {
      if (this.top <= point.y && point.y <= this.bottom) {
        return 0;
      }
  
      return Math.min(
        Math.abs(point.y - this.top),
        Math.abs(point.y - this.bottom)
      );
    }
  
    // Skips Math.sqrt for faster comparisons
    sqDistanceFrom(point) {
      const dx = this.xDistanceFrom(point);
      const dy = this.yDistanceFrom(point);
  
      return dx * dx + dy * dy;
    }
  
    // Pythagorus: a^2 = b^2 + c^2
    distanceFrom(point) {
      return Math.sqrt(this.sqDistanceFrom(point));
    }
  }
  
  // circle class for a circle shaped query
  class Circle {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.rSquared = this.r * this.r;
    }
  
    contains(point) {
      // check if the point is in the circle by checking if the euclidean distance of
      // the point and the center of the circle if smaller or equal to the radius of
      // the circle
      let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
      return d <= this.rSquared;
    }
  
    intersects(range) {
  
      let xDist = Math.abs(range.x - this.x);
      let yDist = Math.abs(range.y - this.y);
  
      // radius of the circle
      let r = this.r;
  
      let w = range.w / 2;
      let h = range.h / 2;
  
      let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
  
      // no intersection
      if (xDist > (r + w) || yDist > (r + h))
        return false;
  
      // intersection within the circle
      if (xDist <= w || yDist <= h)
        return true;
  
      // intersection on the edge of the circle
      return edges <= this.rSquared;
    }
  }
  
  export class Quadtree {
    DEFAULT_CAPACITY = 8;
    MAX_DEPTH = 2;
  
    constructor(boundary, capacity = this.DEFAULT_CAPACITY, _depth = 0) {

      this.boundary = boundary;
      this.capacity = capacity;
      this.objects = [];
      this.divided = false;
      this.depth = _depth;
    }
  
    get children() {
      if (this.divided) {
        return [
          this.northeast,
          this.northwest,
          this.southeast,
          this.southwest
        ];
      } else {
        return [];
      }
    }
  
    clear() {
      this.objects = [];
  
      if (this.divided) {
        this.divided = false;
        delete this.northwest;
        delete this.northeast;
        delete this.southwest;
        delete this.southeast;
      }
    }
  
    static create() {
      if (arguments.length === 0) {
        if (typeof width === "undefined") {
          throw new TypeError("No global width defined");
        }
        if (typeof height === "undefined") {
          throw new TypeError("No global height defined");
        }
        let bounds = new Rectangle(width / 2, height / 2, width, height);
        return new Quadtree(bounds, this.DEFAULT_CAPACITY);
      }
      if (arguments[0] instanceof Rectangle) {
        let capacity = arguments[1] || this.DEFAULT_CAPACITY;
        return new Quadtree(arguments[0], capacity);
      }
      if (typeof arguments[0] === "number" &&
          typeof arguments[1] === "number" &&
          typeof arguments[2] === "number" &&
          typeof arguments[3] === "number") {
        let capacity = arguments[4] || this.DEFAULT_CAPACITY;
        return new Quadtree(new Rectangle(arguments[0], arguments[1], arguments[2], arguments[3]), capacity);
      }
      throw new TypeError('Invalid parameters');
    }
  
    toJSON() {
      let obj = {};
  
      if (this.divided) {
        if (this.northeast.divided || this.northeast.objects.length > 0) {
          obj.ne = this.northeast.toJSON();
        }
        if (this.northwest.divided || this.northwest.objects.length > 0) {
          obj.nw = this.northwest.toJSON();
        }
        if (this.southeast.divided || this.southeast.objects.length > 0) {
          obj.se = this.southeast.toJSON();
        }
        if (this.southwest.divided || this.southwest.objects.length > 0) {
          obj.sw = this.southwest.toJSON();
        }
      } else {
         obj.objects = this.objects;
      }
  
      if (this.depth === 0) {
        obj.capacity = this.capacity;
        obj.x = this.boundary.x;
        obj.y = this.boundary.y;
        obj.w = this.boundary.w;
        obj.h = this.boundary.h;
      }
  
      return obj;
    }
  
    static fromJSON(obj, x, y, w, h, capacity, depth) {
      if (typeof x === "undefined") {
        if ("x" in obj) {
          x = obj.x;
          y = obj.y;
          w = obj.w;
          h = obj.h;
          capacity = obj.capacity;
          depth = 0;
        } else {
          throw TypeError("JSON missing boundary information");
        }
      }
  
      let qt = new Quadtree(new Rectangle(x, y, w, h), capacity, depth);
  
      qt.objects = obj.objects ?? null;
      qt.divided = qt.objects === null; // objects are set to null on subdivide
  
      if (
        "ne" in obj ||
        "nw" in obj ||
        "se" in obj ||
        "sw" in obj
      ) {
        const x = qt.boundary.x;
        const y = qt.boundary.y;
        const w = qt.boundary.w / 2;
        const h = qt.boundary.h / 2;
  
        if ("ne" in obj) {
          qt.northeast = Quadtree.fromJSON(obj.ne, x + w/2, y - h/2, w, h, capacity, depth + 1);
        } else {
          qt.northeast = new Quadtree(qt.boundary.subdivide('ne'), capacity, depth + 1);
        }
        if ("nw" in obj) {
          qt.northwest = Quadtree.fromJSON(obj.nw, x - w/2, y - h/2, w, h, capacity, depth + 1);
        } else {
          qt.northwest = new Quadtree(qt.boundary.subdivide('nw'), capacity, depth + 1);
        }
        if ("se" in obj) {
          qt.southeast = Quadtree.fromJSON(obj.se, x + w/2, y + h/2, w, h, capacity, depth + 1);
        } else {
          qt.southeast = new Quadtree(qt.boundary.subdivide('se'), capacity, depth + 1);
        }
        if ("sw" in obj) {
          qt.southwest = Quadtree.fromJSON(obj.sw, x - w/2, y + h/2, w, h, capacity, depth + 1);
        } else {
          qt.southwest = new Quadtree(qt.boundary.subdivide('sw'), capacity, depth + 1);
        }
      }
  
      return qt;
    }
  
    subdivide() {
      this.northeast = new Quadtree(this.boundary.subdivide('ne'), this.capacity, this.depth + 1);
      this.northwest = new Quadtree(this.boundary.subdivide('nw'), this.capacity, this.depth + 1);
      this.southeast = new Quadtree(this.boundary.subdivide('se'), this.capacity, this.depth + 1);
      this.southwest = new Quadtree(this.boundary.subdivide('sw'), this.capacity, this.depth + 1);
  
      this.divided = true;
  
      // Move objects to children.
      // This improves performance by placing objects
      // in the smallest available rectangle.
      for (const p of this.objects) {
        const inserted =
          this.northeast.insert(p) ||
          this.northwest.insert(p) ||
          this.southeast.insert(p) ||
          this.southwest.insert(p);
  
        if (!inserted) {
          throw RangeError('capacity must be greater than 0');
        }
      }
  
      this.objects = null;
    }
  
    insert(point) {
      if (!this.boundary.contains(point)) {
        return false;
      }
  
      if (!this.divided) {
        if (
          this.objects.length < this.capacity ||
          this.depth === this.MAX_DEPTH
        ) {
          this.objects.push(point);
          return true;
        }
  
        this.subdivide();
      }
  
      return (
        this.northeast.insert(point) ||
        this.northwest.insert(point) ||
        this.southeast.insert(point) ||
        this.southwest.insert(point)
      );
    }
  
    query(range, found) {
      if (!found) {
        found = [];
      }
  
      if (!range.intersects(this.boundary)) {
        return found;
      }
  
      if (this.divided) {
        this.northwest.query(range, found);
        this.northeast.query(range, found);
        this.southwest.query(range, found);
        this.southeast.query(range, found);
        return found;
      }
  
      for (const p of this.objects) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
  
      return found;
    }
  
    deleteInRange(range) {
      if (this.divided) {
        this.northwest.deleteInRange(range);
        this.northeast.deleteInRange(range);
        this.southwest.deleteInRange(range);
        this.southeast.deleteInRange(range);
      }
  
      // Delete objects with range
      this.objects = this.objects.filter(point => !range.contains(point));
    }
  
    closest(searchPoint, maxCount = 1, maxDistance = Infinity) {
      if (typeof searchPoint === "undefined") {
        throw TypeError("Method 'closest' needs a point");
      }
  
      const sqMaxDistance = maxDistance ** 2;
      return this.kNearest(searchPoint, maxCount, sqMaxDistance, 0, 0).found;
    }
  
    kNearest(searchPoint, maxCount, sqMaxDistance, furthestSqDistance, foundSoFar) {
      let found = [];
  
      if (this.divided) {
        this.children
          .sort((a, b) => a.boundary.sqDistanceFrom(searchPoint) - b.boundary.sqDistanceFrom(searchPoint))
          .forEach((child) => {
            const sqDistance = child.boundary.sqDistanceFrom(searchPoint);
            if (sqDistance > sqMaxDistance) {
              return;
            } else if (foundSoFar < maxCount || sqDistance < furthestSqDistance) {
              const result = child.kNearest(searchPoint, maxCount, sqMaxDistance, furthestSqDistance, foundSoFar);
              const childPoints = result.found;
              found = found.concat(childPoints);
              foundSoFar += childPoints.length;
              furthestSqDistance = result.furthestSqDistance;
            }
          });
      } else {
        this.objects
          .sort((a, b) => a.sqDistanceFrom(searchPoint) - b.sqDistanceFrom(searchPoint))
          .forEach((p) => {
            const sqDistance = p.sqDistanceFrom(searchPoint);
            if (sqDistance > sqMaxDistance) {
              return;
            } else if (foundSoFar < maxCount || sqDistance < furthestSqDistance) {
              found.push(p);
              furthestSqDistance = Math.max(sqDistance, furthestSqDistance);
              foundSoFar++;
            }
          });
      }
  
      return {
        found: found.sort((a, b) => a.sqDistanceFrom(searchPoint) - b.sqDistanceFrom(searchPoint)).slice(0, maxCount),
        furthestSqDistance: Math.sqrt(furthestSqDistance),
      };
    }
  
    forEach(fn) {
      if (this.divided) {
        this.northeast.forEach(fn);
        this.northwest.forEach(fn);
        this.southeast.forEach(fn);
        this.southwest.forEach(fn);
      } else {
        this.objects.forEach(fn);
      }
    }
  
    filter(fn) {
      let filtered = new Quadtree(this.boundary, this.capacity);
  
      this.forEach((point) => {
        if (fn(point)) {
          filtered.insert(point);
        }
      });
  
      return filtered;
    }
    merge(other, capacity) {
      let left = Math.min(this.boundary.left, other.boundary.left);
      let right = Math.max(this.boundary.right, other.boundary.right);
      let top = Math.min(this.boundary.top, other.boundary.top);
      let bottom = Math.max(this.boundary.bottom, other.boundary.bottom);
  
      let height = bottom - top;
      let width = right - left;
  
      let midX = left + width / 2;
      let midY = top + height / 2;
  
      let boundary = new Rectangle(midX, midY, width, height);
      let result = new Quadtree(boundary, capacity);
  
      this.forEach(point => result.insert(point));
      other.forEach(point => result.insert(point));
  
      return result;
    }
  
    get length() {
      if (this.divided) {
        return (
          this.northwest.length +
          this.northeast.length +
          this.southwest.length +
          this.southeast.length
        );
      }
  
      return this.objects.length;
    }
  }
  
  if (typeof module !== "undefined") {
  }