import {Point} from './interface.js';
import {Create} from './main.js';
import DrawAnimateImage from './drawAnimateImage.js';

const canvas = new Create('canvas', {
    // background: '#fff8e1'
    background: '#fff'
});
const ctx = canvas.ctx;

// 创建点
function createPoint() {
    canvas.drawPoint(400, 400, 40, {color: '#f00'});
}

// 创建一条线
function createLine() {
    canvas.drawLine({x: 400, y: 0}, {x: 400, y: 800}, {color: '#999'});
    canvas.drawLine({x: 0, y: 400}, {x: 800, y: 400}, {color: '#999'});
    canvas.drawLine(
        {x: 0, y: 0},
        {x: 800, y: 800},
        {
            color: '#999',
            isLineDash: true
        }
    );
    canvas.drawLine(
        {x: 800, y: 0},
        {x: 0, y: 800},
        {
            color: '#999',
            isLineDash: true
        }
    );
}

// 创建一条路径
function createPath() {
    canvas.drawMultipleLine([
        {x: 20, y: 80},
        {x: 60, y: 80},
        {x: 60, y: 400},
        {x: 100, y: 400}
    ]);
}

// 创建文字
function createText() {
    canvas.drawText('财', 400, 400, {
        fontSize: '400px',
        // color: '#da4026'
        color: 'gold'
    });
}

// 画一个四边形
function createRect() {
    canvas.drawRect({x: 350, y: 350}, 100, 100, {
        isFill: true,
        strokeColor: 'red',
        lineWidth: 5,
        fillColor: 'green'
    });
}

// 画一个圆形
function createCircle() {
    canvas.drawCircle({x: 400, y: 400}, 300, {
        strokeColor: 'gold'
    });
}

let offset = 0;
function createDashRect() {
    offset += 1;
    if (offset > 50) {
        offset = 0;
    }
    canvas.drawRect({x: 100, y: 100}, 600, 600, {
        isLineDash: true,
        lineWidth: 2,
        lineDashOffset: -offset,
        strokeColor: '#ff5722'
    });
}

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
    createCircle();
    createLine();
    createText();
    // createDashRect();
    // createDashLine(path_1);
    // createDashLine(path_2);
    // createDashLine(path_3);
    // email_1.createImage(canvas);
    // email_2.createImage(canvas);
    // email_3.createImage(canvas);
    requestAnimationFrame(createAntLine);
}
requestAnimationFrame(createAntLine);