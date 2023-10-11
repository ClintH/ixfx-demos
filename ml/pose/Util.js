import {Lines,Points} from '../../ixfx/geometry.js';
import * as MoveNet from './Poses.js';

//import * as Coco from '../lib/Coco.js';


/**
 * Sorts raw `poses` by horziontal.
 * Leftmost pose will be first.
 * @param {MoveNet.Pose[]} poses 
 */
export const horizontalSort = (poses) => {
  const withCentroids = poses.map(p => ({
    ...p,
    centroid:centroid(p)}));
  withCentroids.sort((a,b) => a.centroid.x-b.centroid.x);
  return withCentroids;
};

/**
 * Sorts raw `poses` by score. Highest score comes first.
 * @param {MoveNet.Pose[]} poses 
 */
export const scoreSort = (poses) => {
  return poses.sort((a,b)=>(b.score ?? 0) -(a.score ?? 0));
};


/**
 * Return centroid of Pose
 * @param {MoveNet.Pose} pose 
 */
export const centroid = (pose) => Points.centroid(...pose.keypoints);

/**
 * Returns a line between two named keypoints.
 * If either of the two points are not found, _undefined_ is returned.
 * @param {MoveNet.Pose} pose 
 * @param {string} a 
 * @param {string} b 
 * @returns {Lines.Line|undefined}
 */
export const lineBetween = (pose, a, b) => {
  const ptA = MoveNet.Coco.getKeypoint(pose, a);
  const ptB = MoveNet.Coco.getKeypoint(pose, b);
  if (ptA === undefined) return;
  if (ptB === undefined) return;
  return Object.freeze({
    a: ptA,
    b: ptB
  });
};

/**
 * Returns the rough center of a pose, based on
 * the chest coordinates
 * @param {MoveNet.Pose} pose 
 */
export const roughCenter = (pose) => {
  const a = lineBetween(pose, `left_shoulder`, `right_hip`);
  const b = lineBetween(pose, `right_shoulder`, `left_hip`);
  if (a === undefined) return;
  if (b === undefined) return;

  // Get halfway of each line
  const halfA = Lines.interpolate(0.5,a);
  const halfB = Lines.interpolate(0.5,b);

  // Add them up
  const sum = Points.sum(halfA, halfB);

  // Divide to get avg
  return Points.divide(sum,2,2);
};
