import {
    CreateOptionProps,
    DrawArrowOptionProps,
    DrawBezierOptionProps,
    DrawCircleOptionProps,
    DrawImageOptionProps,
    DrawLineOptionProps,
    DrawRectOptionProps,
    DrawSectorOptionProps,
    DrawTextOptionProps,
    OptionProps,
    Point
} from './interface';
import drawBezier from './drawAnimateBezier.js';
import {getBezierControlPoints} from './utils.js';

const _color = '#000';
const _lineWidth = 1;

export class Create {
    public container: HTMLCanvasElement | null;
    public ctx: CanvasRenderingContext2D | null;
    public canvasWidth: number;
    public canvasHeight: number;
    protected canvasBgColor: string | CanvasGradient | CanvasPattern;
    constructor(container: string | HTMLCanvasElement, options?: CreateOptionProps) {
        this.container = null;
        this.ctx = null;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.canvasBgColor = _color;
        this.createCanvas(container, options);
    }

    /**
     * 创建画布
     * @param container string | HTMLCanvasElement
     * @returns
     */
    createCanvas(container: string | HTMLCanvasElement, options?: CreateOptionProps) {
        if (typeof container === 'string') {
            this.container = <HTMLCanvasElement>document.getElementById(container);
        } else if (container instanceof HTMLCanvasElement) {
            this.container = container;
        } else {
            console.error('container should be typed as string or HTMLCanvasElement');
            return;
        }
        this.ctx = this.container.getContext('2d');

        if (options?.clientWidth) {
            this.container.width = options.clientWidth;
        }
        if (options?.clientHeight) {
            this.container.height = options.clientHeight;
        }
        this.canvasWidth = this.container.width;
        this.canvasHeight = this.container.height;
        
        if (options?.background) {
            this.canvasBgColor = options.background;
            this.setCanvasBackground(options.background);
        }
    }

    /**
     *  将 canvas 按原始 x点的水平方向、原始的 y点垂直方向进行平移变换
     * @param x
     * @param y
     */
    setStartPoint(x: number, y: number) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.translate(x, y);
        }
    }

    /**
     * 设置落笔点
     * @param point
     */
    setDrawPoint(point: Point) {
        this.ctx?.moveTo(point.x, point.y);
    }

    setRotate(angle: number) {
        // 如果想使用此方法，建议考虑好起始点的位置，因为是相对于起始点位置开始旋转的
        const ctx = this.ctx;
        if (ctx) {
            ctx.rotate(angle);
        }
    }

    /**
     * 设置canvas的背景颜色
     * @param color
     */
    setCanvasBackground(color: string) {
        if (this.ctx) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        }
    }

    /**
     * 创建文字
     * @param text
     * @param x
     * @param y
     * @param options
     */
    drawText(text: string, x: number, y: number, options?: DrawTextOptionProps) {
        const ctx = this.ctx;
        if (ctx) {
            // ctx.createLinearGradient() 可以用来创建渐变，但是目前并不需要这个
            ctx.save();
            // 这里要按顺序填写 字重、字号、字体
            ctx.font = `${options?.fontWeight || 400} ${options?.fontSize || '14px'} ${
                options?.fontFamily || 'PingFang SC'
            }`;
            // 设置文字的水平位置
            ctx.textAlign = 'center';
            // 设置文字垂直位置
            ctx.textBaseline = 'middle';
            if (options?.isStroke === true) {
                ctx.strokeStyle = options?.color || '#000';
                ctx.strokeText(text, x, y, options.maxWidth);
            } else {
                ctx.fillStyle = options?.color || '#000';
                ctx.fillText(text, x, y, options?.maxWidth);
            }
            ctx.restore();
        }
    }

    /**
     * 创建一个点
     * @param x
     * @param y
     * @param radius
     * @param options
     */
    drawPoint(x: number, y: number, radius: number, options?: OptionProps) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = options?.color || _color;
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    /**
     * 创建一条线段
     * @param start
     * @param end
     */
    drawLine(start: Point, end: Point, options?: DrawLineOptionProps) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            // 为了解决线段发虚并且粗细度不对的问题
            ctx.translate(0.5, 0.5);
            ctx.lineJoin = 'round'; // round bevel miter
            ctx.beginPath();
            if (options?.isLineDash) {
                ctx.setLineDash([6, 6]);
                ctx.lineDashOffset = options.lineDashOffset || 2;
            }
            ctx.lineCap = options?.round ? 'round' : 'butt';
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = options?.strokeStyle || _color;
            ctx.lineWidth = options?.width || _lineWidth;
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }

    /**
     * 创建一条路径线
     * @param points
     * @param option
     */
    drawMultipleLine(points: Point[], option?: DrawLineOptionProps) {
        points.forEach((point, index) => {
            if (index + 1 <= points.length - 1) {
                this.drawLine(point, points[index + 1], option);
            }
        });
    }

    /**
     * 创建一个圆
     * @param point
     * @param radius
     * @param options
     */
    drawCircle(point: Point, radius: number, options?: DrawCircleOptionProps) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = options?.fillColor || _color;
            ctx.strokeStyle = options?.strokeColor || _color;
            ctx.lineWidth = options?.lineWidth || _lineWidth;
            ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
            if (options?.isFill) {
                ctx.fill();
            }
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }

    /**
     * 绘制扇形
     * @param point
     * @param radius
     * @param startAngle
     * @param endAngle
     * @param options
     */
    drawSector(point: Point, radius: number, startAngle: number, endAngle: number, options?: DrawSectorOptionProps) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = options?.fillColor || _color;
            ctx.arc(point.x, point.y, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    /**
     * 创建一个矩形
     * @param point
     * @param width
     * @param height
     * @param options
     */
    drawRect(point: Point, width: number, height: number, options?: DrawRectOptionProps) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.lineJoin = 'round'; // round bevel miter
            ctx.lineWidth = options?.lineWidth || _lineWidth;
            ctx.strokeStyle = options?.strokeColor || _color;
            if (options?.isLineDash) {
                ctx.setLineDash([4, 8]);
                ctx.lineDashOffset = options.lineDashOffset || 2;
            }

            ctx.fillStyle = options?.fillColor || _color;
            if (options?.isFill) {
                ctx.rect(point.x, point.y, width, height);
                ctx.fill();
            } else {
                ctx.strokeRect(point.x, point.y, width, height);
            }
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }

    /**
     * 指定创建一个指定图形中心的矩形
     * @param point
     * @param width
     * @param height
     * @param options
     */
    drawCenterRect(point: Point, width: number, height: number, options?: DrawRectOptionProps) {
        this.drawRect({x: point.x - width / 2, y: point.y - height / 2}, width, height, options);
    }

    /**
     * 画图片
     * @param image
     * @param options
     */
    drawImage(image: CanvasImageSource, options: DrawImageOptionProps) {
        const ctx = this.ctx;
        if (ctx) {
            const {sWidth, sHeight, dWidth, dHeight, point} = options;
            ctx.save();
            this.setStartPoint(point.x - dWidth / 2, point.y - dHeight / 2);
            ctx.drawImage(image, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
            ctx.restore();
        }
    }

    /**
     * 画箭头
     * @param startPoint
     * @param options
     */
    drawArrow(startPoint: Point, options?: DrawArrowOptionProps) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.save();
            this.setStartPoint(startPoint.x, startPoint.y);
            // 默认是向下
            if (options?.direction === 'top') {
                ctx.rotate((-180 * Math.PI) / 180);
                ctx.translate(-8, -4);
            } else if (options?.direction === 'right') {
                ctx.rotate((-90 * Math.PI) / 180);
                ctx.translate(-8, -8);
            } else if (options?.direction === 'down') {
                ctx.rotate((0 * Math.PI) / 180);
                ctx.translate(-8, -4);
            } else if (options?.direction === 'left') {
                ctx.rotate((90 * Math.PI) / 180);
                ctx.translate(-8, -4);
            }
            ctx.beginPath();
            ctx.lineTo(8, 2);
            ctx.lineTo(16, 0);
            ctx.lineTo(8, 12);
            ctx.lineTo(0, 0);
            ctx.fillStyle = options?.fillColor || _color;
            ctx.strokeStyle = options?.strokeColor || _color;
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }

    _getBezierCurveTo(point1: Point, point2: Point, point3: Point, point4: Point, curvature: number) {
        return getBezierControlPoints(point1, point2, point3, point4, curvature);
    }

    /**
     * 绘制三次贝塞尔曲线
     * @param paths
     * @param options
     */
    drawBezierCurve(paths: Point[], options?: DrawBezierOptionProps) {
        const ctx = this.ctx;
        const curvature = 0.1;
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = options?.color || _color;
            ctx.lineWidth = options?.lineWidth || 1;
            ctx.moveTo(paths[0].x, paths[0].y);
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
                const {cp1x, cp1y, cp2x, cp2y} = this._getBezierCurveTo(point1, point2, point3, point4, curvature);
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, point3.x, point3.y);
            }
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }

    /**
     * 绘制动画版的
     * @param paths
     * @param options
     */
    drawAnimationBezierCurve(paths: Point[], options?: DrawBezierOptionProps) {
        const ctx = this.ctx;
        if (ctx) {
            drawBezier(this.ctx, this.canvasWidth, this.canvasWidth, paths, options || undefined);
        }
    }

    /**
     * 清除画布
     * @param x
     * @param y
     * @param width
     * @param height
     */
    clearRect(x: number, y: number, width: number, height: number) {
        const ctx = this.ctx;
        if (ctx) {
            ctx.clearRect(x, y, width, height);
        }
    }

    /**
     * 清除画布
     */
    clearCanvas() {
        this.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    /**
     * 保存当前画布设置
     */
    save() {
        this.ctx?.save();
    }

    /**
     * 在save和restore之前的设置均不会保留下来，也就是还原到save之前的设置。
     */
    restore() {
        this.ctx?.restore();
    }
}
