import utils from "./utils";
import { DLList } from "./DLList";
import { join, dirname } from "path";

export type LRUFileCacheOptions = {
  'ram_cache_size': string | '128 MB',
  'file_cache_size': string | '512 MB',
  'tmp_folder'?: string
};

export class LRUFileCache {

  private maxRAMCache: number;
  private maxFSCache: number;
  private folder: string;

  private list: DLList;

  constructor(options: LRUFileCacheOptions) {
    this.maxRAMCache = utils.sizeStringToNumber(options.ram_cache_size);
    this.maxFSCache = utils.sizeStringToNumber(options.file_cache_size);

    let tmpFolder = options.tmp_folder;
    if (!tmpFolder) {
      tmpFolder = join(dirname(__dirname), "./__cache__" + utils.randomString(10));
    }
    this.folder = tmpFolder;

    this.list = new DLList();
  }
  
}