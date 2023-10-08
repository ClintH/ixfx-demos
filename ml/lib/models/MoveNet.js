import * as PoseDetection from '@tensorflow-models/pose-detection';
import { defaultMoveNetConfig } from './Types.js';
export class MoveNet {
    constructor(config) {
        this.name = `MoveNet`;
        this.debug = true;
        const maxPoses = config.maxPoses ?? 6;
        this.config = {
            ...defaultMoveNetConfig(maxPoses),
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