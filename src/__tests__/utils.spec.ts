import utils from '../utils';

test('function - sizeStringToNumber', () => {
  const s1 = utils.sizeStringToNumber('1 KB');
  expect(s1).toBe(1024);

  const s2 = utils.sizeStringToNumber('1.2 KB');
  expect(s2).toBe(Math.floor(1.2 * 1024));

  const s3 = utils.sizeStringToNumber('1.5 GB');
  expect(s3).toBe(Math.floor(1.5 * 1024 * 1024 * 1024));
});
