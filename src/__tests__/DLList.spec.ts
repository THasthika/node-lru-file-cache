import { DLList } from "../DLList";
import { DLNode } from "../DLNode";

test('DLList', () => {

  const node1 = new DLNode("node1", "xxx");
  const node2 = new DLNode("node2", "xxy");
  const node3 = new DLNode("node3", "xxz");

  const list = new DLList();

  list.pushHead(node1);
  list.pushHead(node2);
  list.pushTail(node3);

  expect(list.head).toBe(node2);
  expect(list.head!.next).toBe(node1);
  expect(list.tail).toBe(node3);

  const xx1 = list.popHead();
  expect(xx1).toBe(node2);

  expect(list.head).toBe(node1);
  expect(list.head!.prev).toBeUndefined();

});

test('DLList - get', () => {
  const node1 = new DLNode("node1", "xxx");
  const node2 = new DLNode("node2", "xxy");
  const node3 = new DLNode("node3", "xxz");
  const node4 = new DLNode("node4", "xxa");

  const list = new DLList();

  list.pushHead(node1);
  list.pushHead(node2);
  list.pushHead(node3);
  list.pushTail(node4);

  expect(list.head).toBe(node3);
  expect(list.head!.next).toBe(node2);
  expect(list.head!.next!.next).toBe(node1);
  expect(list.head!.next!.next!.next).toBe(node4);

  expect(list.tail).toBe(node4);
  expect(list.tail!.prev).toBe(node1);
  expect(list.tail!.prev!.prev).toBe(node2);
  expect(list.tail!.prev!.prev!.prev).toBe(node3);

  const get1 = list.get("node1");
  expect(get1).toBe(node1);

  expect(list.head).toBe(node1);
  expect(list.head!.next).toBe(node3);
  expect(list.head!.next!.next).toBe(node2);
  expect(list.head!.next!.next!.next).toBe(node4);
});