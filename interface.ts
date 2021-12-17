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
    maxWidth?: number; // 最大的宽度
    fontStyle?: string; // 字体的样式 normal、italic、oblique
    fontVariant?: string; // 字体的变体
    fontWeight?: string | number; // 字重
    fontSize?: string; // 字号
    fontFamily?: string; // 字体
    color?: string;
    isStroke?: boolean; // 是否是空心的文字
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

export interface DrawBezierOptionProps {
    color?: string;
}