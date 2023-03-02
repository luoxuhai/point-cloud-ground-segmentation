import initPCLCore from '../libs/patchworkpp/build/patchworkpp';

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

async function init(options?: InitOptions) {
  const {
    arrayBuffer,
    url,
    fetchOptions: fetchSettings = { credentials: 'same-origin' },
  } = options ?? {};

  const moduleOptions = {
    wasmBinary: arrayBuffer,
    locateFile: (path: string, scriptDirectory: string) => url || scriptDirectory + path,
    fetchSettings,
  };

  return initPCLCore(moduleOptions);
}

interface PatchworkppParams {
  verbose?: boolean;
  enable_RNR?: boolean;
  enable_RVPF?: boolean;
  enable_TGR?: boolean;

  num_iter?: number; // Number of iterations for ground plane estimation using PCA.
  num_lpr?: number; // Maximum number of points to be selected as lowest points representative.
  num_min_pts?: number; // Minimum number of points to be estimated as ground plane in each patch.
  num_zones?: number; // Setting of Concentric Zone Model(CZM)
  num_rings_of_interest?: number; // Number of rings to be checked with elevation and flatness values.

  RNR_ver_angle_thr?: number; // Noise points vertical angle threshold. Downward rays of LiDAR are more likely to generate severe noise points.
  RNR_intensity_thr?: number; // Noise points intensity threshold. The reflected points have relatively small intensity than others.

  sensor_height?: number;
  th_seeds?: number; // threshold for lowest point representatives using in initial seeds selection of ground points.
  th_dist?: number; // threshold for thickenss of ground.
  th_seeds_v?: number; // threshold for lowest point representatives using in initial seeds selection of vertical structural points.
  th_dist_v?: number; // threshold for thickenss of vertical structure.
  max_range?: number; // max_range of ground estimation area
  min_range?: number; // min_range of ground estimation area
  uprightness_thr?: number; // threshold of uprightness using in Ground Likelihood Estimation(GLE). Please refer paper for more information about GLE.
  adaptive_seed_selection_margin?: number; // parameter using in initial seeds selection
}

export class PatchWorkpp {
  private _patchwork: any;

  constructor(initOptions?: InitOptions, params?: PatchworkppParams) {
    return (async (): Promise<PatchWorkpp> => {
      const core = await init(initOptions);
      const patchWorkppParams = new core.PatchWorkppParams();
      for (let key in params) {
        patchWorkppParams[key] = params[key];
      }
      this._patchwork = new core.PatchWorkpp(patchWorkppParams);
      return this;
    })() as unknown as PatchWorkpp;
  }

  public estimateGround(data: Float32Array) {
    this._patchwork.estimateGround(data);
  }

  public getGround(): Float32Array {
    return this._patchwork.getGround();
  }

  public getHeight(): number {
    return this._patchwork.getHeight();
  }

  public getTimeTaken(): number {
    return this._patchwork.getTimeTaken();
  }
}
