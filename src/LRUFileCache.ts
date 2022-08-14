import * as fs from 'fs-extra';
import { dirname, extname, join } from 'path';

import { DLList } from './DLList';
import { DLNode } from './DLNode';
import utils from './utils';

export interface ILRUFileCacheOptions {
  ram_cache_size: string | '128 MB';
  file_cache_size: string | '512 MB';
  tmp_folder?: string;
}

export class LRUFileCache {
  private readonly maxRAMCache: number;
  private readonly maxFSCache: number;
  private readonly folder: string;

  private ramCacheSize: number = 0;
  private fsCacheSize: number = 0;

  private readonly list: DLList;

  public get ramSize(): number {
    return this.ramCacheSize;
  }

  public get fsSize(): number {
    return this.fsCacheSize;
  }

  constructor(options: ILRUFileCacheOptions) {
    this.maxRAMCache = utils.sizeStringToNumber(options.ram_cache_size);
    this.maxFSCache = utils.sizeStringToNumber(options.file_cache_size);

    if (this.maxRAMCache > this.maxFSCache) {
      throw new Error('RAM Cache should be less than FS Cache!');
    }

    let tmpFolder = options.tmp_folder;
    if (tmpFolder == null) {
      // tmpFolder = join(dirname(__dirname), "./__cache__" + utils.randomString(10));
      tmpFolder = join(dirname(__dirname), './__cache__');
    }
    this.folder = tmpFolder;

    if (fs.existsSync(this.folder)) {
      fs.removeSync(this.folder);
    }

    this.list = new DLList();
  }

  public async addFile(key: string, filePath: string): Promise<void> {
    if (this.list.keyExists(key)) {
      throw new Error('key already exists!');
    }

    if (!fs.existsSync(filePath)) {
      throw new Error('file does not exists!');
    }

    const data = fs.readFileSync(filePath);

    if (data.byteLength > this.maxRAMCache) {
      throw new Error('file is larger than cache!');
    }

    const uniqueFileName = `${key}_${utils.randomString(10)}_${new Date().getTime()}${extname(filePath)}`;

    const node = new DLNode(key, uniqueFileName);
    node.fdata = data;
    node.inMemory = true;
    node.fsize = data.byteLength;

    this.ramCacheSize += node.fsize;
    this.fsCacheSize += node.fsize;

    this.list.pushHead(node);

    await this.writeFileToCacheFolder(node.fdata, node.fname);

    await this.checkRAMConstraint();
    await this.checkFSConstraint();
  }

  public async getFile(key: string): Promise<Buffer | undefined> {
    if (!this.list.keyExists(key)) {
      return undefined;
    }

    const node = this.list.get(key);
    if (node == null) {
      return undefined;
    }

    if (node?.inMemory) {
      await this.readToMemory(node);
    }

    await this.checkRAMConstraint();

    return node.fdata;
  }

  private async checkRAMConstraint(): Promise<void> {
    if (this.ramCacheSize <= this.maxRAMCache) {
      return;
    }

    let node = this.list.tail;
    while (node != null) {
      if (this.ramCacheSize <= this.maxRAMCache) {
        return;
      }

      if (!node.inMemory) {
        node = node.prev;
        continue;
      }

      await this.removeFromMemory(node);

      node = node.prev;
    }
  }

  private async checkFSConstraint(): Promise<void> {
    if (this.fsCacheSize <= this.maxFSCache) {
      return;
    }

    while (this.fsCacheSize > this.maxFSCache) {
      const node = this.list.popTail();
      if (node == null) {
        break;
      }
      await this.removeFromFS(node);
    }
  }

  private async readToMemory(node: DLNode): Promise<void> {
    if (node.inMemory) {
      return;
    }

    const fpath = join(this.folder, node.fname);
    const data = fs.readFileSync(fpath);
    node.fdata = data;
    node.inMemory = true;

    if (node.fsize !== undefined) {
      this.ramCacheSize += node.fsize;
    }
  }

  private async removeFromMemory(node: DLNode): Promise<void> {
    if (!node.inMemory) {
      return;
    }

    node.fdata = undefined;
    node.inMemory = false;

    if (node.fsize !== undefined) {
      this.ramCacheSize -= node.fsize;
    }
  }

  private async removeFromFS(node: DLNode): Promise<void> {
    if (node.inMemory) {
      await this.removeFromMemory(node);
    }
    await fs.unlink(join(this.folder, node.fname));

    if (node.fsize !== undefined) {
      this.fsCacheSize -= node.fsize;
    }
  }

  private async writeFileToCacheFolder(buffer: Buffer, fname: string): Promise<void> {
    if (!fs.existsSync(this.folder)) {
      fs.mkdirSync(this.folder, { recursive: true });
    }
    const fpath = join(this.folder, fname);
    fs.writeFileSync(fpath, buffer);
  }
}
