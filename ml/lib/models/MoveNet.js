import * as PoseDetection from '@tensorflow-models/pose-detection';
export class MoveNet {
    constructor(config) {
        this.name = `MoveNet`;
        this.debug = true;
        const maxPoses = config.maxPoses ?? 6;
        this.config = {
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
            scoreThreshold: 0.01,
            ...config
        };
    }
    async run(image) {
        if (image === undefined)
            return;
        const w = image.width;
        const h = image.height;
        const results = await this.detector?.estimatePoses(image.transferToImageBitmap(), {
            scoreThreshold: this.config.scoreThreshold,
            maxPoses: this.config.maxPoses
        }, performance.now());
        if (results === undefined)
            return;
        // Invert
        const inverted = results.map(pose => {
            const kps = pose.keypoints.map(kp => ({
                name: kp.name,
                score: kp.score,
                x: 1 - (kp.x / w),
                y: kp.y / h
            }));
            const box = pose.box ? {
                ...pose.box,
                xMax: 1 - pose.box.xMin,
                xMin: 1 - pose.box.xMax
            } : undefined;
            return {
                box: box,
                id: pose.id,
                keypoints: kps,
                score: pose.score
            };
        });
        return inverted;
    }
    debugLog(message) {
        if (!this.debug)
            return;
        console.log(`MoveNet`, message);
    }
    init(app) {
        this.debug = app.debug;
        this.getDetector().then(d => {
            this.debugLog(`Loaded`);
        });
    }
    async getDetector() {
        if (this.detector !== undefined)
            return this.detector;
        const config = {
            ...this.config,
            trackerType: this.config.trackerType
        };
        this.detector = await PoseDetection.createDetector(PoseDetection.SupportedModels.MoveNet, config);
        return this.detector;
    }
}
//# sourceMappingURL=MoveNet.js.map