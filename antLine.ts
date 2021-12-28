import {Point} from './interface.js';
import {Create} from './main.js';
import DrawAnimateImage from './drawAnimateImage.js';

const canvas = new Create('canvas', {
    // background: '#fff8e1'
    background: '#fff'
});
const ctx = canvas.ctx;

let offset = 0;

const path_1 = [
    {x: 100, y: 100},
    {x: 100, y: 400},
    {x: 400, y: 400},
    {x: 400, y: 600},
    {x: 600, y: 600}
];
const path_2 = [
    {x: 100, y: 100},
    {x: 100, y: 400},
    {x: 400, y: 400},
    {x: 400, y: 200},
    {x: 600, y: 200}
];

const path_3 = [
    {x: 100, y: 100},
    {x: 100, y: 400},
    {x: 400, y: 400},
    {x: 400, y: 100},
    {x: 600, y: 100}
];

function createDashLine(path: Point[]) {
    canvas.drawMultipleLine(path, {
        isLineDash: true,
        width: 2,
        strokeStyle: '#2072b8',
        lineDashOffset: -offset
    });

    // 创建一个三角
    canvas.drawArrow(path[path.length - 1], {
        strokeColor: '#2072b8',
        fillColor: '#2072b8',
        direction: 'right'
    });
}

const email_1 = new DrawAnimateImage(path_1);
const email_2 = new DrawAnimateImage(path_2);
const email_3 = new DrawAnimateImage(path_3);

// 实现虚线跑马灯
function createAntLine() {
    canvas.clearRect(0, 0, 800, 800);
    offset += 1;
    if (offset > 50) {
        offset = 0;
    }
    createDashLine(path_1);
    createDashLine(path_2);
    createDashLine(path_3);
    email_1.createImage(canvas);
    email_2.createImage(canvas);
    email_3.createImage(canvas);
    requestAnimationFrame(createAntLine);
}
requestAnimationFrame(createAntLine);
