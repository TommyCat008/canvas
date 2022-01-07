export interface Point {
    x: number;
    y: number;
}
export interface OptionProps {
    color?: string;
    width?: number;
}
export interface DrawLineOptionProps extends OptionProps {
    strokeStyle?: string;
    isLineDash?: boolean;
    lineDashOffset?: number;
    round?: boolean;
}
export interface CreateOptionProps {
    background: string;
}
export interface DrawTextOptionProps {
    maxWidth?: number;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string | number;
    fontSize?: string;
    fontFamily?: string;
    color?: string;
    isStroke?: boolean;
}
export interface DrawRectOptionProps extends OptionProps {
    isLineDash?: boolean;
    isFill?: boolean;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    fillColor?: string | CanvasGradient | CanvasPattern;
    lineWidth?: number;
    lineDashOffset?: number;
}
export interface DrawSectorOptionProps {
    fillColor?: string;
}
export interface DrawCircleOptionProps extends OptionProps {
    isFill?: boolean;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    fillColor?: string | CanvasGradient | CanvasPattern;
    lineWidth?: number;
}
export interface DrawImageOptionProps {
    sWidth: number;
    sHeight: number;
    dWidth: number;
    dHeight: number;
    point: Point;
}
export interface DrawArrowOptionProps {
    strokeColor?: string;
    fillColor?: string;
    direction: string;
}
export interface DrawBezierOptionProps {
    color?: string;
    lineWidth?: number;
}
export interface Create {
    container: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    canvasWidth: number;
    canvasHeight: number;
    canvasBgColor: string | CanvasGradient | CanvasPattern;
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
    clearRect(x: number, y: number, width: number, height: number): void;
    clearCanvas(): void;
    save(): void;
    restore(): void;
}
