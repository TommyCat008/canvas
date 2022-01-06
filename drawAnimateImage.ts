import {Point} from './interface';
import {Create} from './main';
const image = new Image();
image.src = './email.png';

export default class {
    private countVal: number;
    private path: Point[];
    private len: number;
    private index: number;
    imagePoint: Point;
    comparePoint: Point;
    constructor(path: Point[], rate?: number) {
        this.path = path;
        this.len = path.length;
        this.countVal = rate || 2; // 每次移动的像素值
        this.index = 0;
        this.imagePoint = Object.assign({}, path[this.index]);
        this.comparePoint = Object.assign({}, path[this.index + 1]);
        this.getCountVal();
    }

    // 判断点是否在范围内
    getNearPoint(point: Point): boolean {
        const {x, y} = point;
        const leftX = this.comparePoint.x - Math.abs(this.countVal);
        const rightX = this.comparePoint.x + Math.abs(this.countVal);
        const leftY = this.comparePoint.y - Math.abs(this.countVal);
        const rightY = this.comparePoint.y + Math.abs(this.countVal);
        return leftX <= x && x <= rightX && leftY <= y && y <= rightY;
    }

    getCountVal(): void {
        if (this.imagePoint.x > this.comparePoint.x || this.imagePoint.y > this.comparePoint.y) {
            this.countVal = -Math.abs(this.countVal);
        } else {
            this.countVal = Math.abs(this.countVal);
        }
    }

    createImage(canvas: Create) {
        if (this.getNearPoint(this.imagePoint)) {
            // 执行下一个
            if (this.index + 2 === this.len) {
                this.index = 0;
            } else {
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
