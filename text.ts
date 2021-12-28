import {Point} from './interface.js';
import {Create} from './main.js';
import DrawAnimateImage from './drawAnimateImage.js';

const canvas = new Create('canvas', {
    // background: '#fff8e1'
    background: '#fff'
});
const ctx = canvas.ctx;

// 创建文字
function createText() {
    canvas.drawText('财', 400, 400, {
        fontSize: '400px',
        // color: '#da4026'
        color: 'gold'
    });
}

// 实现虚线跑马灯
function createAntLine() {
    canvas.clearRect(0, 0, 800, 800);
    createText();

    requestAnimationFrame(createAntLine);
}
requestAnimationFrame(createAntLine);
