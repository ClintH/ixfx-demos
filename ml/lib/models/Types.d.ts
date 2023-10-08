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
export type MoveNetConfig = {
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
export declare const defaultMoveNetConfig: (maxPoses: number) => MoveNetConfig;
//# sourceMappingURL=Types.d.ts.map