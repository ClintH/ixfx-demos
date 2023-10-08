import * as PoseDetection from '@tensorflow-models/pose-detection';
import { IApp } from '../Types';
export type TrackerConfig = {
    maxTracks: number;
    maxAge: number;
    minSimilarity: number;
    keypointTrackerParams?: KeypointTrackerConfig;
    boundingBoxTrackerParams?: BoundingBoxTrackerConfig;
};
export type KeypointTrackerConfig = {
    keypointConfidenceThreshold: number;
    keypointFalloff: number[];
    minNumberOfKeypoints: number;
};
export type BoundingBoxTrackerConfig = {};
export type TrackerType = "keypoint" | "boundingBox";
export type Config = {
    scoreThreshold: number;
    maxPoses: number;
    enableSmoothing: boolean;
    modelType: `SinglePose.Lightning` | `SinglePose.Thunder` | 'MultiPose.Lightning';
    minPoseScore?: number;
    multiPoseMaxDimension?: number;
    enableTracking: boolean;
    trackerType: TrackerType;
    trackerConfig?: TrackerConfig;
};
export declare class MoveNet {
    detector: PoseDetection.PoseDetector | undefined;
    config: Config;
    debug: boolean;
    readonly name = "MoveNet";
    constructor(config: Partial<Config>);
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