const image = new Image();
image.src = './email.png';
export default class {
    constructor(path, rate) {
        Object.defineProperty(this, "countVal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "len", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "imagePoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "comparePoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.path = path;
        this.len = path.length;
        this.countVal = rate || 2;
        this.index = 0;
        this.imagePoint = Object.assign({}, path[this.index]);
        this.comparePoint = Object.assign({}, path[this.index + 1]);
        this.getCountVal();
    }
    getNearPoint(point) {
        const { x, y } = point;
        const leftX = this.comparePoint.x - Math.abs(this.countVal);
        const rightX = this.comparePoint.x + Math.abs(this.countVal);
        const leftY = this.comparePoint.y - Math.abs(this.countVal);
        const rightY = this.comparePoint.y + Math.abs(this.countVal);
        return leftX <= x && x <= rightX && leftY <= y && y <= rightY;
    }
    getCountVal() {
        if (this.imagePoint.x > this.comparePoint.x || this.imagePoint.y > this.comparePoint.y) {
            this.countVal = -Math.abs(this.countVal);
        }
        else {
            this.countVal = Math.abs(this.countVal);
        }
    }
    createImage(canvas) {
        if (this.getNearPoint(this.imagePoint)) {
            if (this.index + 2 === this.len) {
                this.index = 0;
            }
            else {
                ++this.index;
            }
            this.imagePoint = Object.assign({}, this.path[this.index]);
            this.comparePoint = Object.assign({}, this.path[this.index + 1]);
            this.getCountVal();
        }
        if (this.imagePoint.x === this.comparePoint.x && this.imagePoint.y !== this.comparePoint.y) {
            this.imagePoint.y += this.countVal;
        }
        if (this.imagePoint.x !== this.comparePoint.x && this.imagePoint.y === this.comparePoint.y) {
            this.imagePoint.x += this.countVal;
        }
        canvas.drawImage(image, {
            sWidth: 200,
            sHeight: 200,
            dWidth: 40,
            dHeight: 40,
            point: this.imagePoint
        });
    }
}
//# sourceMappingURL=drawAnimateImage.js.map