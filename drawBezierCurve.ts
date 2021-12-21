import {Create} from './main.js';

const canvas = new Create('canvas', {
    background: '#fff'
});

const paths = [
    {x: 100, y: 100},
    {x: 200, y: 600},
    {x: 300, y: 300},
    {x: 400, y: 600},
    {x: 500, y: 200},
    {x: 600, y: 400},
    {x: 700, y: 600}
];

function drawLine() {
    canvas.drawMultipleLine(paths, {
        isLineDash: false,
        width: 2,
        strokeStyle: '#2072b8'
    });
}

function drawBezierCurve() {
    canvas.drawBezierCurve(paths, {
        color: '#2072b8',
        lineWidth: 2
    });
}

// 基础对比线
// drawLine();
drawBezierCurve();

paths.forEach((path) => {
    canvas.drawPoint(path.x, path.y, 4, {color: '#2072b8'});
});
