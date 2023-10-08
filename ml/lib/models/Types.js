export const defaultMoveNetConfig = (maxPoses) => ({
    maxPoses,
    modelType: `MultiPose.Lightning`,
    enableTracking: true,
    enableSmoothing: true,
    trackerType: `keypoint`,
    // From https://github.com/tensorflow/tfjs-models/blob/ad17ade67add3e84fee0895c938ea4e1cd4d50e4/pose-detection/src/movenet/constants.ts#L75
    trackerConfig: {
        maxAge: 1000,
        maxTracks: maxPoses * 6,
        minSimilarity: 0.2,
        keypointTrackerParams: {
            keypointConfidenceThreshold: 0.3,
            keypointFalloff: [
                0.026, 0.025, 0.025, 0.035, 0.035, 0.079, 0.079, 0.072, 0.072, 0.062,
                0.062, 0.107, 0.107, 0.087, 0.087, 0.089, 0.089
            ],
            minNumberOfKeypoints: 4
        },
        boundingBoxTrackerParams: {
            maxTracks: maxPoses * 3,
            maxAge: 1000,
            minSimilarity: 0.15,
            trackerParams: {}
        }
    },
    scoreThreshold: 0.01
});
//# sourceMappingURL=Types.js.map