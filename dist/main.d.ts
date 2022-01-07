import { CreateOptionProps, DrawArrowOptionProps, DrawBezierOptionProps, DrawCircleOptionProps, DrawImageOptionProps, DrawLineOptionProps, DrawRectOptionProps, DrawSectorOptionProps, DrawTextOptionProps, OptionProps, Point } from './interface';
export declare class Create {
    container: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    protected canvasWidth: number;
    protected canvasHeight: number;
    protected canvasBgColor: string | CanvasGradient | CanvasPattern;
    constructor(container: string | HTMLCanvasElement, options?: CreateOptionProps);
    createCanvas(container: string | HTMLCanvasElement, options?: CreateOptionProps): void;
    setStartPoint(x: number, y: number): void;
    setDrawPoint(point: Point): void;
    setRotate(angle: number): void;
    setCanvasBackground(color: string): void;
    drawText(text: string, x: number, y: number, options?: DrawTextOptionProps): void;
    drawPoint(x: number, y: number, radius: number, options?: OptionProps): void;
    drawLine(start: Point, end: Point, options?: DrawLineOptionProps): void;
    drawMultipleLine(points: Point[], option?: DrawLineOptionProps): void;
    drawCircle(point: Point, radius: number, options?: DrawCircleOptionProps): void;
    drawSector(point: Point, radius: number, startAngle: number, endAngle: number, options?: DrawSectorOptionProps): void;
    drawRect(point: Point, width: number, height: number, options?: DrawRectOptionProps): void;
    drawImage(image: CanvasImageSource, options: DrawImageOptionProps): void;
    drawArrow(startPoint: Point, options?: DrawArrowOptionProps): void;
    _getBezierCurveTo(point1: Point, point2: Point, point3: Point, point4: Point, curvature: number): {
        cp1x: number;
        cp1y: number;
        cp2x: number;
        cp2y: number;
    };
    drawBezierCurve(paths: Point[], options?: DrawBezierOptionProps): void;
    drawAnimationBezierCurve(paths: Point[], options?: DrawBezierOptionProps): void;
    clearRect(x: number, y: number, width: number, height: number): void;
    clearCanvas(): void;
    save(): void;
    restore(): void;
}
