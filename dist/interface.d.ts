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
