import { Create } from './main.js';
import DrawAnimateImage from './drawAnimateImage.js';
const canvas = new Create('canvas', {
    background: '#fff'
});
const ctx = canvas.ctx;
function createPoint() {
    canvas.drawPoint(400, 400, 40, { color: '#f00' });
}
function createLine() {
    canvas.drawLine({ x: 400, y: 0 }, { x: 400, y: 800 }, { color: '#999' });
    canvas.drawLine({ x: 0, y: 400 }, { x: 800, y: 400 }, { color: '#999' });
    canvas.drawLine({ x: 0, y: 0 }, { x: 800, y: 800 }, {
        color: '#999',
        isLineDash: true
    });
    canvas.drawLine({ x: 800, y: 0 }, { x: 0, y: 800 }, {
        color: '#999',
        isLineDash: true
    });
}
function createPath() {
    canvas.drawMultipleLine([
        { x: 20, y: 80 },
        { x: 60, y: 80 },
        { x: 60, y: 400 },
        { x: 100, y: 400 }
    ]);
}
function createText() {
    canvas.drawText('财', 400, 400, {
        fontSize: '400px',
        color: 'gold'
    });
}
function createRect() {
    canvas.drawRect({ x: 350, y: 350 }, 100, 100, {
        isFill: true,
        strokeColor: 'red',
        lineWidth: 5,
        fillColor: 'green'
    });
}
function createCircle() {
    canvas.drawCircle({ x: 400, y: 400 }, 300, {
        strokeColor: 'gold'
    });
}
let offset = 0;
function createDashRect() {
    offset += 1;
    if (offset > 50) {
        offset = 0;
    }
    canvas.drawRect({ x: 100, y: 100 }, 600, 600, {
        isLineDash: true,
        lineWidth: 2,
        lineDashOffset: -offset,
        strokeColor: '#ff5722'
    });
}
const path_1 = [
    { x: 100, y: 100 },
    { x: 100, y: 400 },
    { x: 400, y: 400 },
    { x: 400, y: 600 },
    { x: 600, y: 600 }
];
const path_2 = [
    { x: 100, y: 100 },
    { x: 100, y: 400 },
    { x: 400, y: 400 },
    { x: 400, y: 200 },
    { x: 600, y: 200 }
];
const path_3 = [
    { x: 100, y: 100 },
    { x: 100, y: 400 },
    { x: 400, y: 400 },
    { x: 400, y: 100 },
    { x: 600, y: 100 }
];
function createDashLine(path) {
    canvas.drawMultipleLine(path, {
        isLineDash: true,
        width: 2,
        strokeStyle: '#2072b8',
        lineDashOffset: -offset
    });
    canvas.drawArrow(path[path.length - 1], {
        strokeColor: '#2072b8',
        fillColor: '#2072b8',
        direction: 'right'
    });
}
const email_1 = new DrawAnimateImage(path_1);
const email_2 = new DrawAnimateImage(path_2);
const email_3 = new DrawAnimateImage(path_3);
function createAntLine() {
    canvas.clearRect(0, 0, 800, 800);
    createCircle();
    createLine();
    createText();
    requestAnimationFrame(createAntLine);
}
requestAnimationFrame(createAntLine);
//# sourceMappingURL=index.js.map