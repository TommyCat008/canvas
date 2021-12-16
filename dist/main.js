const _color = '#000';
const _lineWidth = 1;
export class Create {
    constructor(container, options) {
        Object.defineProperty(this, "container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "canvasWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "canvasHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "canvasBgColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.container = null;
        this.ctx = null;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.canvasBgColor = _color;
        this.createCanvas(container, options);
    }
    createCanvas(container, options) {
        if (typeof container === 'string') {
            this.container = document.getElementById(container);
        }
        else if (container instanceof HTMLCanvasElement) {
            this.container = container;
        }
        else {
            console.error('container should be typed as string or HTMLCanvasElement');
            return;
        }
        this.canvasWidth = this.container.width;
        this.canvasHeight = this.container.height;
        this.ctx = this.container.getContext('2d');
        if (options === null || options === void 0 ? void 0 : options.background) {
            this.canvasBgColor = options.background;
            this._setCanvasBackground(options.background);
        }
    }
    setStartPath(x, y) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.translate(x, y);
        }
    }
    _setCanvasBackground(color) {
        if (this.ctx) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        }
    }
    drawText(text, x, y, options) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            ctx.font = `${options.fontWeight || 400} ${(options === null || options === void 0 ? void 0 : options.fontSize) || '14px'} ${(options === null || options === void 0 ? void 0 : options.fontFamily) || '微软雅黑'}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if ((options === null || options === void 0 ? void 0 : options.isStroke) === true) {
                ctx.strokeStyle = (options === null || options === void 0 ? void 0 : options.color) || '#000';
                ctx.strokeText(text, x, y, options.maxWidth);
            }
            else {
                ctx.fillStyle = (options === null || options === void 0 ? void 0 : options.color) || '#000';
                ctx.fillText(text, x, y, options.maxWidth);
            }
            ctx.restore();
        }
    }
    drawPoint(x, y, radius, options) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = (options === null || options === void 0 ? void 0 : options.color) || _color;
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
    drawLine(start, end, options) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            ctx.lineJoin = 'round';
            ctx.beginPath();
            if (options === null || options === void 0 ? void 0 : options.isLineDash) {
                ctx.setLineDash([6, 6]);
                ctx.lineDashOffset = options.lineDashOffset || 2;
            }
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = (options === null || options === void 0 ? void 0 : options.strokeStyle) || _color;
            ctx.lineWidth = (options === null || options === void 0 ? void 0 : options.width) || _lineWidth;
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }
    drawMultipleLine(points, option) {
        points.forEach((point, index) => {
            if (index + 1 <= points.length - 1) {
                this.drawLine(point, points[index + 1], option);
            }
        });
    }
    drawCircle(point, radius, options) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = (options === null || options === void 0 ? void 0 : options.fillColor) || _color;
            ctx.strokeStyle = (options === null || options === void 0 ? void 0 : options.strokeColor) || _color;
            ctx.lineWidth = (options === null || options === void 0 ? void 0 : options.lineWidth) || _lineWidth;
            ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
            if (options === null || options === void 0 ? void 0 : options.isFill) {
                ctx.fill();
            }
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }
    drawRect(point, width, height, options) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.lineJoin = 'round';
            ctx.lineWidth = (options === null || options === void 0 ? void 0 : options.lineWidth) || _lineWidth;
            ctx.strokeStyle = (options === null || options === void 0 ? void 0 : options.strokeColor) || _color;
            if (options === null || options === void 0 ? void 0 : options.isLineDash) {
                ctx.setLineDash([4, 8]);
                ctx.lineDashOffset = options.lineDashOffset || 2;
            }
            ctx.strokeRect(point.x, point.y, width, height);
            ctx.fillStyle = (options === null || options === void 0 ? void 0 : options.fillColor) || _color;
            if (options === null || options === void 0 ? void 0 : options.isFill) {
                ctx.fill();
            }
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }
    drawImage(image, options) {
        const ctx = this.ctx;
        if (ctx) {
            const { sWidth, sHeight, dWidth, dHeight, point } = options;
            ctx.save();
            this.setStartPath(point.x - dWidth / 2, point.y - dHeight / 2);
            ctx.drawImage(image, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
            ctx.restore();
        }
    }
    drawArrow(startPoint, options) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            this.setStartPath(startPoint.x, startPoint.y);
            if ((options === null || options === void 0 ? void 0 : options.direction) === 'top') {
                ctx.rotate((-180 * Math.PI) / 180);
                ctx.translate(-8, -4);
            }
            else if ((options === null || options === void 0 ? void 0 : options.direction) === 'right') {
                ctx.rotate((-90 * Math.PI) / 180);
                ctx.translate(-8, -8);
            }
            else if ((options === null || options === void 0 ? void 0 : options.direction) === 'down') {
                ctx.rotate((0 * Math.PI) / 180);
                ctx.translate(-8, -4);
            }
            else if ((options === null || options === void 0 ? void 0 : options.direction) === 'left') {
                ctx.rotate((90 * Math.PI) / 180);
                ctx.translate(-8, -4);
            }
            ctx.beginPath();
            ctx.lineTo(8, 2);
            ctx.lineTo(16, 0);
            ctx.lineTo(8, 12);
            ctx.lineTo(0, 0);
            ctx.fillStyle = (options === null || options === void 0 ? void 0 : options.fillColor) || _color;
            ctx.strokeStyle = (options === null || options === void 0 ? void 0 : options.strokeColor) || _color;
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }
    clearRect(x, y, width, height) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.clearRect(x, y, width, height);
        }
    }
}
//# sourceMappingURL=main.js.map