import { Create } from './main.js';
const canvas = new Create('canvas', {
    background: '#fff'
});
const ctx = canvas.ctx;
function createText() {
    canvas.drawText('财', 400, 400, {
        fontSize: '400px',
        color: 'gold'
    });
}
function createAntLine() {
    canvas.clearRect(0, 0, 800, 800);
    createText();
    requestAnimationFrame(createAntLine);
}
requestAnimationFrame(createAntLine);
//# sourceMappingURL=text.js.map