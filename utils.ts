import {Point} from './interface';

/**
 * 获取
 * @param point1
 * @param point2
 * @param point3
 * @param point4
 * @param curvature
 * @returns
 */
export function getBezierControlPoints(point1: Point, point2: Point, point3: Point, point4: Point, curvature = 0.1) {
    const cp1x = point2.x + (point3.x - point1.x) * curvature;
    const cp1y = point2.y + (point3.y - point1.y) * curvature;
    const cp2x = point3.x - (point4.x - point2.x) * curvature;
    const cp2y = point3.y - (point4.y - point2.y) * curvature;
    return {
        cp1x,
        cp1y,
        cp2x,
        cp2y
    };
}

export function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
