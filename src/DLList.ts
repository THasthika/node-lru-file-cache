import { DLNode } from "./DLNode";


/**
 * Doubly Linked List to store the cache references
 */
export class DLList {

  public head?: DLNode;
  public tail?: DLNode;
  private count: number = 0;
  

  // pushHead - add the the head
  public pushHead(node: DLNode) {
    // case no nodes in the list
    if (this.count === 0) {
      this.addFirstNode(node);
      this.count++;
      return this;
    }

    node.next = this.head;
    node.prev = undefined;

    node.next!.prev = node;

    this.head = node;
    this.count++;
    return this;
  }

  // pushTail
  public pushTail(node: DLNode) {
    // case no nodes in the list
    if (this.count === 0) {
      this.addFirstNode(node);
      this.count++;
      return this;
    }

    node.prev = this.tail;
    node.next = undefined;

    node.prev!.next = node;

    this.tail = node;
    this.count++;
    return this;
  }

  // popHead
  public popHead() : DLNode | undefined {

    if (this.count === 0) {
      return undefined;
    }

    const node = this.head;
    this.head = node!.next;
    this.count--;

    node!.prev = undefined;
    node!.next = undefined;

    if (this.count === 0) {
      this.tail = undefined;
    } else {
      this.head!.prev = undefined;
    }

    return node;
  }

  // popTail
  public popTail() : DLNode | undefined {
    if (this.count === 0) {
      return undefined;
    }

    const node = this.tail;
    this.tail = node!.prev;
    this.count--;

    node!.next = undefined;
    node!.prev = undefined;

    if (this.count === 0) {
      this.head = undefined;
    } else {
      this.tail!.next = undefined;
    }

    return node;
  }

  // get
  public get(key: string) : DLNode | undefined {
    if (this.count === 0) {
      return undefined;
    }

    let node = this.head;
    while (node) {
      if (node.key === key) {
        break;
      }
      node = node.next;
    }

    if (!node) {
      return undefined;
    }

    if (this.head === node) {
      return node;
    }

    const sNext = node.next;
    const sPrev = node.prev;

    if (sNext) {
      sNext.prev = sPrev;
    }
    if (sPrev) {
      sPrev.next = sNext;
    }

    node.prev = undefined;
    node.next = this.head;
    this.head = node;

    return node;
  }

  private addFirstNode(node: DLNode) {
    this.head = node;
    this.tail = node;
    this.head.next = undefined;
    this.head.prev = undefined;
  }

  // get by key - while getting move the node to the head

}