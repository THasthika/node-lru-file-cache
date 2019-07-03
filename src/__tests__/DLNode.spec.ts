import { DLNode } from '../DLNode';

test('DLNode - create', () => {
  const node = new DLNode('keyname', 'path.xxx');
  expect(node).toBeDefined();
  expect(node.inMemory).toBe(false);
  expect(node.prev).toBeUndefined();
});

test('DLNode - linking', () => {
  const node1 = new DLNode('node1', 'node1.jpg');
  const node2 = new DLNode('node2', 'node2.jpg');

  node1.next = node2;
  node2.prev = node1;

  node2.inMemory = true;

  expect(node1.next).toBe(node2);
  expect(node1.next.inMemory).toBe(true);
});
