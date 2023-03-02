export interface InitOptions {
    arrayBuffer?: ArrayBuffer;
    url?: string;
    /**
     * Override the default settings object used when fetching the Wasm module from the network.
     *
     * @default { credentials: 'same-origin' }
     */
    fetchOptions?: RequestInit;
    onsuccess?: () => void;
    onerror?: (error: unknown) => void;
}
interface PatchworkParams {
    verbose: boolean;
    enable_RNR: boolean;
    enable_RVPF: boolean;
    enable_TGR: boolean;
}
export declare class PatchWork {
    private _patchwork;
    constructor(initOptions?: InitOptions, params?: PatchworkParams);
    estimateGround(): any;
    getHeight(): void;
    getTimeTaken(): void;
    getGround(): void;
    getNonground(): void;
    getCenters(): void;
    getNormals(): void;
}
export {};
