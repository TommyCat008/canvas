import { Point } from './interface';
export declare function getBezierControlPoints(point1: Point, point2: Point, point3: Point, point4: Point, curvature?: number): {
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
};
export declare function getRandomColor(): string;
