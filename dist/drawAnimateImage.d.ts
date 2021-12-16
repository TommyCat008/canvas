import { Point } from './interface';
import { Create } from './main';
export default class {
    private countVal;
    private path;
    private len;
    private index;
    imagePoint: Point;
    comparePoint: Point;
    constructor(path: Point[], rate?: number);
    getNearPoint(point: Point): boolean;
    getCountVal(): void;
    createImage(canvas: Create): void;
}
