import { App } from "./App.js";
import { VideoSourceUi } from "./ui/VideoSourceUi.js";
export { VideoSourceUi };
export * as Models from './models/index.js';
export * from './Types.js';
export * as Coco from './Coco.js';
export const mount = (elementOrQuery) => {
    const params = (new URL(document.location.toString())).searchParams;
    const recRateStr = params.get(`recRate`);
    let config = {};
    if (recRateStr !== null) {
        config.recordSamplingMs = Number.parseInt(recRateStr);
    }
    const el = typeof elementOrQuery === `string` ? document.querySelector(elementOrQuery) : elementOrQuery;
    if (el === null)
        throw new Error(`Could not resolve element: ${elementOrQuery}`);
    const app = new App(config);
    el.append(app.ui.getElement());
    return app;
};
//# sourceMappingURL=index.js.map