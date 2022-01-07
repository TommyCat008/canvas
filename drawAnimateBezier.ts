import {DrawBezierOptionProps, Point} from './interface';
import {getBezierControlPoints} from './utils.js';

const step = 0.05; // 默认设置步长
let t = 0;
let canvasWidth = 0;
let canvasHeight = 0;
let optionsProps: DrawBezierOptionProps | undefined;
let originNodes: Point[] = [];
const bezierNodes: Point[] = []; // 曲线上的点的集合
const pathControlPointsGroup: Point[][] = [];
let index = 0; // 标识当前绘制的pathControlPointsGroup 的index
let ctx: CanvasRenderingContext2D | null;
function factorial(num: number): number {
    //递归阶乘
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

function bezier(arr: Point[], t: number) {
    //通过各控制点与占比t计算当前贝塞尔曲线上的点坐标
    let x = 0,
        y = 0,
        n = arr.length - 1;
    arr.forEach(function (item, index) {
        if (!index) {
            x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index);
            y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index);
        } else {
            x +=
                (factorial(n) / factorial(index) / factorial(n - index)) *
                item.x *
                Math.pow(1 - t, n - index) *
                Math.pow(t, index);
            y +=
                (factorial(n) / factorial(index) / factorial(n - index)) *
                item.y *
                Math.pow(1 - t, n - index) *
                Math.pow(t, index);
        }
    });
    return {x, y};
}

function drawNode(nodes: Point[]) {
    if (!nodes.length) return;
    const _nodes = nodes;
    const next_nodes = [];
    _nodes.forEach(function (point: Point) {
        const x = point.x;
        const y = point.y;
        if (ctx) {
            if (_nodes.length === 1) {
                bezierNodes.push(point);
                if (bezierNodes.length > 1) {
                    bezierNodes.forEach(function (point, i) {
                        if (i) {
                            const startX = bezierNodes[i - 1].x,
                                startY = bezierNodes[i - 1].y,
                                x = point.x,
                                y = point.y;
                            if (ctx) {
                                ctx.save();
                                ctx.beginPath();
                                ctx.strokeStyle = optionsProps?.color || '#000';
                                ctx.lineWidth = optionsProps?.lineWidth || 1;
                                ctx.moveTo(startX, startY);
                                ctx.lineTo(x, y);
                                ctx.stroke();
                                ctx.restore();
                            }
                        }
                    });
                }
            }
        }
    });
    if (_nodes.length) {
        for (let i = 0; i < _nodes.length - 1; i++) {
            const arr = [
                {
                    x: _nodes[i].x,
                    y: _nodes[i].y
                },
                {
                    x: _nodes[i + 1].x,
                    y: _nodes[i + 1].y
                }
            ];
            next_nodes.push(bezier(arr, t));
        }
        drawNode(next_nodes);
    }
}

function startDraw() {
    if (t > 1 + step && index === pathControlPointsGroup.length - 1) {
        // 绘制拐点
        originNodes.forEach((point) => {
            const {x, y} = point;
            if (ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = optionsProps?.color || '#000';
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        });
        // 清空数组，重置index的值
        pathControlPointsGroup.length = 0;
        index = 0;
        return;
    }
    if (t > 1 && index < pathControlPointsGroup.length - 1) {
        t = 0;
        index++;
        // 设置绘制点
        const {x, y} = pathControlPointsGroup[index][0];
        ctx?.moveTo(x, y);
    }
    if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    drawNode(pathControlPointsGroup[index]);
    t += step;
    requestAnimationFrame(startDraw);
}

export default function drawBezier(
    c: CanvasRenderingContext2D | null,
    width = 0,
    height = 0,
    paths: Point[],
    options?: DrawBezierOptionProps
) {
    canvasWidth = width;
    canvasHeight = height;
    ctx = c;
    optionsProps = options;
    originNodes = paths;
    if (!paths.length) {
        return;
    }

    // 获取到所有的q控制点
    for (let index = 0; index < paths.length; index++) {
        if (index === paths.length - 1) {
            continue;
        }
        let point1 = paths[index - 1];
        const point2 = paths[index];
        const point3 = paths[index + 1];
        let point4 = paths[index + 2];
        if (index === 0) {
            point1 = point2;
        }
        if (index === paths.length - 2) {
            point4 = point3;
        }
        // 三次贝塞尔曲线
        const {cp1x, cp1y, cp2x, cp2y} = getBezierControlPoints(point1, point2, point3, point4);
        pathControlPointsGroup.push([paths[index], {x: cp1x, y: cp1y}, {x: cp2x, y: cp2y}, {x: point3.x, y: point3.y}]);
    }
    // 拿到了所有的点，开始进行绘制
    startDraw();
}
