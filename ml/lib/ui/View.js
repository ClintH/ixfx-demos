var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _View_canvasEl, _View_ctx, _View_rect, _View_poseColours, _View_visible;
import { BaseUi } from "./BaseUi.js";
const PiPi = Math.PI * 2;
const DotRadius = 5;
const SkeletonLineWidth = 5;
export class View extends BaseUi {
    constructor(app) {
        super(`View`, app);
        _View_canvasEl.set(this, void 0);
        _View_ctx.set(this, void 0);
        _View_rect.set(this, { width: 0, height: 0 });
        _View_poseColours.set(this, new Map());
        _View_visible.set(this, true);
    }
    initUi() {
        const canvas = document.createElement(`canvas`);
        canvas.style.position = `fixed`;
        canvas.style.left = `0px`;
        canvas.style.top = `0px`;
        canvas.style.zIndex = `2`;
        __classPrivateFieldSet(this, _View_canvasEl, canvas, "f");
        return canvas;
    }
    toggle() {
        __classPrivateFieldSet(this, _View_visible, !__classPrivateFieldGet(this, _View_visible, "f"), "f");
    }
    getCtx() {
        if (__classPrivateFieldGet(this, _View_ctx, "f") === undefined && __classPrivateFieldGet(this, _View_canvasEl, "f")) {
            const ctx = __classPrivateFieldGet(this, _View_canvasEl, "f").getContext(`2d`);
            if (ctx !== null) {
                __classPrivateFieldSet(this, _View_ctx, ctx, "f");
            }
        }
        return __classPrivateFieldGet(this, _View_ctx, "f");
    }
    setSize(bounds) {
        if (__classPrivateFieldGet(this, _View_canvasEl, "f") === undefined)
            throw new Error(`CanvasEl undefined`);
        this.debugLog(`setSize ${bounds.width}x${bounds.height}`);
        __classPrivateFieldGet(this, _View_canvasEl, "f").width = bounds.width;
        __classPrivateFieldGet(this, _View_canvasEl, "f").height = bounds.height;
        __classPrivateFieldSet(this, _View_rect, bounds, "f");
    }
    relToAbs(x, y) {
        return {
            x: x * __classPrivateFieldGet(this, _View_rect, "f").width,
            y: y * __classPrivateFieldGet(this, _View_rect, "f").height
        };
    }
    // update() {
    //   const ctx = this.getCtx();
    //   if (!ctx) return;
    //   const {width, height} = this.#rect;
    //   ctx.strokeStyle = `red`;
    //   ctx.beginPath();
    //   ctx.moveTo(0, 0);
    //   ctx.lineTo(width, height);
    //   ctx.lineTo(width, 0);
    //   ctx.lineTo(0, 0);
    //   ctx.lineTo(0, height);
    //   ctx.lineTo(width, height);
    //   ctx.lineWidth = 2;
    //   ctx.stroke();
    //   ctx.fillStyle = `blue`;
    //   ctx.fillText(`hello`, 100, 100);
    // }
    drawPoses(poses) {
        const ctx = this.getCtx();
        const { width, height } = __classPrivateFieldGet(this, _View_rect, "f");
        if (!ctx)
            return;
        ctx.clearRect(0, 0, width, height);
        ctx.textAlign = `left`;
        ctx.textBaseline = `bottom`;
        ctx.font = `14pt monospace`;
        poses.sort((a, b) => a.id - b.id);
        for (let i = 0; i < poses.length; i++) {
            this.drawPose(ctx, poses[i], i);
        }
    }
    drawDot(ctx, point, radius, label) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, PiPi, false);
        ctx.fill();
        if (label.length > 0) {
            ctx.fillText(label, point.x, point.y - 15);
        }
    }
    drawPose(ctx, pose, index) {
        const { width, height } = __classPrivateFieldGet(this, _View_rect, "f");
        const map = new Map();
        let colour;
        if (pose.id) {
            colour = __classPrivateFieldGet(this, _View_poseColours, "f").get(pose.id);
            if (colour === undefined) {
                colour = `hsl(${Math.random() * 360},70%,60%)`;
                __classPrivateFieldGet(this, _View_poseColours, "f").set(pose.id, colour);
            }
        }
        else {
            colour = `white`;
        }
        ctx.lineWidth = SkeletonLineWidth;
        ctx.strokeStyle = colour;
        ctx.fillStyle = colour;
        const score = pose.score ? Math.round(pose.score * 100) : 0;
        ctx.fillText(`${pose.id}: ${score}%`, 20, height - 20 - (index * 20));
        // ctx.font = `8pt monospace`;
        // ctx.textAlign = `center`;
        // ctx.textBaseline = `middle`;
        for (const kp of pose.keypoints) {
            const abs = { x: kp.x * width, y: kp.y * height };
            map.set(kp.name ?? ``, abs);
            this.drawDot(ctx, abs, DotRadius, ``); //, kp.name ?? ``);
        }
        ctx.beginPath();
        this.traceLine(ctx, map.get(`left_wrist`), map.get(`left_elbow`), map.get(`left_shoulder`), map.get(`right_shoulder`), map.get(`right_elbow`), map.get(`right_wrist`));
        this.traceLine(ctx, map.get(`left_ear`), map.get(`left_eye`), map.get(`nose`), map.get(`right_eye`), map.get(`right_ear`));
        this.traceLine(ctx, map.get(`left_shoulder`), map.get(`left_hip`), map.get(`left_knee`), map.get(`left_ankle`));
        this.traceLine(ctx, map.get(`right_shoulder`), map.get(`right_hip`), map.get(`right_knee`), map.get(`right_ankle`));
        this.traceLine(ctx, map.get(`left_hip`), map.get(`right_hip`));
        ctx.stroke();
        // ctx.strokeStyle = `yellow`;
        // const box = pose.box;
        // if (box) {
        //   ctx.strokeRect(box.xMin * width, box.yMin * height, box.width * width, box.height * height);
        // }
    }
    traceLine(ctx, ...points) {
        if (points.length < 2)
            return;
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            if (points[i] === undefined)
                continue;
            ctx.lineTo(points[i].x, points[i].y);
        }
    }
    drawOffscreen(buffer) {
        const ctx = this.getCtx();
        if (!ctx)
            return;
        ctx.drawImage(buffer, 0, 0);
    }
}
_View_canvasEl = new WeakMap(), _View_ctx = new WeakMap(), _View_rect = new WeakMap(), _View_poseColours = new WeakMap(), _View_visible = new WeakMap();
//# sourceMappingURL=View.js.map