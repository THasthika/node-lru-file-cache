import { DLNode } from './DLNode';

/**
 * Doubly Linked List to store the cache references
 */
export class DLList {
  public head?: DLNode;
  public tail?: DLNode;
  private count: number = 0;

  private readonly keySet: Set<string> = new Set();

  // pushHead - add the the head
  public pushHead(node: DLNode): DLList {
    if (this.keyExists(node.key)) {
      throw new Error('key already exists!');
    }

    node.next = this.head;
    node.prev = undefined;

    if (node.next != null) {
      node.next.prev = node;
    }

    if (this.tail == null) {
      this.tail = node;
    }

    this.head = node;
    this.count++;
    this.addKey(node);
    return this;
  }

  // pushTail
  public pushTail(node: DLNode): DLList {
    if (this.keyExists(node.key)) {
      throw new Error('key already exists!');
    }

    node.prev = this.tail;
    node.next = undefined;

    if (node.prev != null) {
      node.prev.next = node;
    }

    if (this.head == null) {
      this.head = node;
    }

    this.tail = node;
    this.count++;
    this.addKey(node);
    return this;
  }

  // popHead
  public popHead(): DLNode | undefined {
    if (this.head == null) {
      return undefined;
    }

    const node = this.head;
    this.head = node.next;
    this.count--;

    node.prev = undefined;
    node.next = undefined;

    if (this.count === 0) {
      this.tail = undefined;
    } else {
      if (this.head != null) this.head.prev = undefined;
    }

    this.removeKey(node);

    return node;
  }

  // popTail
  public popTail(): DLNode | undefined {
    if (this.tail == null) {
      return undefined;
    }

    const node = this.tail;
    this.tail = node.prev;
    this.count--;

    node.next = undefined;
    node.prev = undefined;

    if (this.count === 0) {
      this.head = undefined;
    } else {
      if (this.tail != null) this.tail.next = undefined;
    }

    this.removeKey(node);

    return node;
  }

  // get
  public get(key: string): DLNode | undefined {
    if (this.count === 0) {
      return undefined;
    }

    let node = this.head;
    while (node != null) {
      if (node.key === key) {
        break;
      }
      node = node.next;
    }

    if (node == null) {
      return undefined;
    }

    if (this.head === node) {
      return node;
    }

    const sNext = node.next;
    const sPrev = node.prev;

    if (sNext != null) {
      sNext.prev = sPrev;
    }
    if (sPrev != null) {
      sPrev.next = sNext;
    }

    if (this.tail === node) {
      this.tail = sPrev;
    }

    node.prev = undefined;
    node.next = this.head;
    this.head = node;

    return node;
  }

  // key exists
  public keyExists(key: string): boolean {
    return this.keySet.has(key);
  }

  private addKey(node: DLNode): void {
    this.keySet.add(node.key);
  }

  private removeKey(node: DLNode): void {
    this.keySet.delete(node.key);
  }
}
