import {Point} from './interface.js';
import {Create} from './main.js';

const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;
const canvas = new Create('canvas', {
    background: 'rgba(0,0,0,0.1)',
    clientWidth,
    clientHeight
});
const ctx = canvas.ctx;
// 解决线段发虚的问题

// canvas.container?.addEventListener('mousemove', (event: MouseEvent) => {
//     // 这里应该拿到的是偏移量
//     const {offsetX, offsetY} = event;
//     console.log(offsetX, offsetY);
//     // 需要判断
// });

const path_1 = [
    {x: 390, y: 375},
    {x: 390, y: 200},
    {x: 300, y: 200},
    {x: 300, y: 100}
];
const path_2 = [
    {x: 400, y: 375},
    {x: 400, y: 200},
    {x: 400, y: 100}
];
const path_3 = [
    {x: 410, y: 375},
    {x: 410, y: 200},
    {x: 500, y: 200},
    {x: 500, y: 100}
];

let offset = 0;

// 实现虚线跑马灯
function createAntLine() {
    canvas.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);

    if (ctx) {
        ctx.save();
        ctx?.translate(0.5, 0.5);
        ctx.globalCompositeOperation = 'xor';
        ctx.beginPath();
        ctx.moveTo(300, 300);
        ctx.lineTo(750, 300);
        // ctx.lineTo(750, 450);
        // ctx.lineTo(300, 450);
        ctx.lineCap = 'butt';
        ctx.shadowBlur = 3;
        ctx.lineWidth = 6;
        ctx.shadowColor = 'rgba(27,116,255,1)';
        ctx.strokeStyle = 'rgba(27, 71, 193, 1)';
        ctx.stroke();
        ctx.restore();
    }

    const width = 30;
    const point = {x: 300, y: 300};
    // 绘制流光
    if (ctx) {
        ctx.save();
        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(point.x + offset, point.y, point.x + offset + width, point.y);
        gradient.addColorStop(0, 'rgba(115, 136, 255, 0)');
        gradient.addColorStop(1, '#00FFFF');
        ctx.moveTo(point.x + offset, point.y);
        ctx.lineTo(point.x + offset + width, point.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = gradient;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
    }
    offset += 2;
    if (point.x + width + offset > 750) {
        offset = 0;
    }
    // 开始移动流光

    requestAnimationFrame(createAntLine);
}

requestAnimationFrame(createAntLine);
