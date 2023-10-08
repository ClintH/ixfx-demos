export var NamedKeypoints;
(function (NamedKeypoints) {
    NamedKeypoints[NamedKeypoints["nose"] = 0] = "nose";
    NamedKeypoints[NamedKeypoints["left_eye"] = 1] = "left_eye";
    NamedKeypoints[NamedKeypoints["right_eye"] = 2] = "right_eye";
    NamedKeypoints[NamedKeypoints["left_ear"] = 3] = "left_ear";
    NamedKeypoints[NamedKeypoints["right_ear"] = 4] = "right_ear";
    NamedKeypoints[NamedKeypoints["left_shoulder"] = 5] = "left_shoulder";
    NamedKeypoints[NamedKeypoints["right_shoulder"] = 6] = "right_shoulder";
    NamedKeypoints[NamedKeypoints["left_elbow"] = 7] = "left_elbow";
    NamedKeypoints[NamedKeypoints["right_elbow"] = 8] = "right_elbow";
    NamedKeypoints[NamedKeypoints["left_wrist"] = 9] = "left_wrist";
    NamedKeypoints[NamedKeypoints["right_wrist"] = 10] = "right_wrist";
    NamedKeypoints[NamedKeypoints["left_hip"] = 11] = "left_hip";
    NamedKeypoints[NamedKeypoints["right_hip"] = 12] = "right_hip";
    NamedKeypoints[NamedKeypoints["left_knee"] = 13] = "left_knee";
    NamedKeypoints[NamedKeypoints["right_knee"] = 14] = "right_knee";
    NamedKeypoints[NamedKeypoints["left_ankle"] = 15] = "left_ankle";
    NamedKeypoints[NamedKeypoints["right_ankle"] = 16] = "right_ankle";
})(NamedKeypoints || (NamedKeypoints = {}));
export const nameToIndex = new Map();
export const indexToName = new Map();
for (const [key, value] of Object.entries(NamedKeypoints)) {
    const keyAsNumber = Number.parseInt(key);
    const couldCast = !Number.isNaN(keyAsNumber);
    if (typeof key === `number` || couldCast) {
        indexToName.set(Number.parseInt(key), value.toString());
    }
    else {
        nameToIndex.set(key, Number.parseInt(value.toString()));
    }
}
export const getKeypoint = (pose, nameOrIndex) => {
    if (pose === undefined)
        throw new Error(`Parameter 'pose' is undefined`);
    if (pose === null)
        throw new Error(`Parameter 'pose' is null`);
    if (pose.keypoints === undefined)
        throw new Error(`Parameter 'pose.keypoints' undefined`);
    if (nameOrIndex === undefined)
        throw new Error(`Parameter 'nameOrIndex' is undefined`);
    if (nameOrIndex === null)
        throw new Error(`Parameter 'nameOrIndex' is null`);
    if (typeof nameOrIndex === `number`)
        return pose.keypoints[nameOrIndex];
    const index = nameToIndex.get(nameOrIndex);
    if (index === undefined)
        throw new Error(`Keypoint '${nameOrIndex}' is not a valid Coco keypoint`);
    return pose.keypoints[index];
};
//# sourceMappingURL=Coco.js.map