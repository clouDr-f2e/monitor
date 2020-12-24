export = PuppeteerEnvironment;
declare const PuppeteerEnvironment_base: typeof import("jest-environment-node");
declare class PuppeteerEnvironment extends PuppeteerEnvironment_base {
    constructor(config: any);
}
