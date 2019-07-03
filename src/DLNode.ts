/**
 * Doubly Linked Node
 */
export class DLNode {

  public prev?: DLNode;
  public next?: DLNode;

  public inMemory: boolean = false;
  public key: string;
  public fdata?: Buffer;
  public fname: string;
  public fsize?: number;

  constructor(key: string, fname: string) {
    this.key = key;
    this.fname = fname;
  }

}