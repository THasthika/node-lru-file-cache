/**
 * Doubly Linked Node
 */
export class DLNode {

  public prev?: DLNode;
  public next?: DLNode;

  public inMemory: boolean = false;
  public key: string;
  public fdata?: Buffer;
  public fpath: string;
  public fsize?: number;

  constructor(key: string, fpath: string) {
    this.key = key;
    this.fpath = fpath;
  }

}