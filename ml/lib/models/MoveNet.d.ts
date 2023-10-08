import * as PoseDetection from '@tensorflow-models/pose-detection';
import { IApp } from '../Types';
import { MoveNetConfig } from './Types.js';
export declare class MoveNet {
    detector: PoseDetection.PoseDetector | undefined;
    config: MoveNetConfig;
    debug: boolean;
    readonly name = "MoveNet";
    constructor(config: Partial<MoveNetConfig>);
    run(image?: OffscreenCanvas): Promise<{
        box: {
            xMax: number;
            xMin: number;
            yMin: number;
            yMax: number;
            width: number;
            height: number;
        } | undefined;
        id: number | undefined;
        keypoints: {
            name: string | undefined;
            score: number | undefined;
            x: number;
            y: number;
        }[];
        score: number | undefined;
    }[] | undefined>;
    debugLog(message: any): void;
    init(app: IApp): void;
    getDetector(): Promise<PoseDetection.PoseDetector>;
}
//# sourceMappingURL=MoveNet.d.ts.map