import {Point} from './interface';
import {getBezierControlPoints} from './utils';

let t = 0;

const bezierNodes: Point[] = []; //绘制内部控制点的数组
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
    var x = 0,
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
    return {
        x: x,
        y: y
    };
}

function drawNode(nodes: Point[]) {
    if (!nodes.length) return;
    var _nodes = nodes;
    const next_nodes = [];
    _nodes.forEach(function (point: Point) {
        const x = point.x;
        const y = point.y;
        if (ctx) {
            if (_nodes.length === 1) {
                bezierNodes.push(point);
                if (bezierNodes.length > 1) {
                    bezierNodes.forEach(function (obj, i) {
                        if (i) {
                            var startX = bezierNodes[i - 1].x,
                                startY = bezierNodes[i - 1].y,
                                x = obj.x,
                                y = obj.y;
                            if (ctx) {
                                ctx.save();
                                ctx.beginPath();
                                ctx.moveTo(startX, startY);
                                ctx.lineTo(x, y);
                                ctx.strokeStyle = 'red';
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
        for (var i = 0; i < _nodes.length - 1; i++) {
            var arr = [
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

const getRandomColor = function () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

function startDraw() {
    if (t > 1) {
        return;
    }
    t += 0.01;
    if (ctx) {
        // ctx.clearRect(0, 0, 800, 800);
    }
    // drawNode();
    // requestAnimationFrame(startDraw);
}

export default function drawBezier(c: CanvasRenderingContext2D | null, paths: Point[]) {
    ctx = c;
    if (!paths.length) {
        return;
    }
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
        // [paths[index], {x: cp1x, y: cp1y}, {x: cp2x, y: cp2y}, {x: point3.x, y: point3.y}]
    }

    // startDraw();
}
