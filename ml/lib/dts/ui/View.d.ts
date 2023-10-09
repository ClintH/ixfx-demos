import { Pose } from "@tensorflow-models/pose-detection";
import { IApp, Point, Rect } from "../Types.js";
import { BaseUi } from "./BaseUi.js";
export declare class View extends BaseUi {
    #private;
    constructor(app: IApp);
    protected initUi(): HTMLElement;
    toggle(): void;
    getCtx(): CanvasRenderingContext2D | undefined;
    /**
     * Called by the sampler
     * @param bounds
     */
    setSize(bounds: Rect): void;
    relToAbs(x: number, y: number): {
        x: number;
        y: number;
    };
    drawPoses(poses: Pose[]): void;
    drawDot(ctx: CanvasRenderingContext2D, point: Point, radius: number, label: string): void;
    drawPose(ctx: CanvasRenderingContext2D, pose: Pose, index: number): void;
    traceLine(ctx: CanvasRenderingContext2D, ...points: Array<Point | undefined>): void;
    drawOffscreen(buffer: OffscreenCanvas): void;
}
//# sourceMappingURL=View.d.ts.map