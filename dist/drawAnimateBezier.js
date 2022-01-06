import { getBezierControlPoints } from './utils';
let t = 0;
const bezierNodes = [];
let ctx;
function factorial(num) {
    if (num <= 1) {
        return 1;
    }
    else {
        return num * factorial(num - 1);
    }
}
function bezier(arr, t) {
    var x = 0, y = 0, n = arr.length - 1;
    arr.forEach(function (item, index) {
        if (!index) {
            x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index);
            y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index);
        }
        else {
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
function drawNode(nodes) {
    if (!nodes.length)
        return;
    var _nodes = nodes;
    const next_nodes = [];
    _nodes.forEach(function (point) {
        const x = point.x;
        const y = point.y;
        if (ctx) {
            if (_nodes.length === 1) {
                bezierNodes.push(point);
                if (bezierNodes.length > 1) {
                    bezierNodes.forEach(function (obj, i) {
                        if (i) {
                            var startX = bezierNodes[i - 1].x, startY = bezierNodes[i - 1].y, x = obj.x, y = obj.y;
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
    }
}
export default function drawBezier(c, paths) {
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
        const { cp1x, cp1y, cp2x, cp2y } = getBezierControlPoints(point1, point2, point3, point4);
    }
}
//# sourceMappingURL=drawAnimateBezier.js.map