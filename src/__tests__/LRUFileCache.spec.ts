import { join } from 'path';

import { LRUFileCache } from '../LRUFileCache';

test('LRUFileCache', (done) => {
  const cache = new LRUFileCache({
    file_cache_size: '20 KB',
    ram_cache_size: '10 KB',
    tmp_folder: '/tmp/__cache__xxx',
  });

  const operations = {
    a: join(__dirname, '../../LICENSE'),
    b: join(__dirname, '../../LICENSE'),
    c: join(__dirname, '../../LICENSE'),
    d: join(__dirname, '../../LICENSE'),
    e: join(__dirname, '../../LICENSE'),
    f: join(__dirname, '../../LICENSE'),
    g: join(__dirname, '../../LICENSE'),
    h: join(__dirname, '../../LICENSE'),
    i: join(__dirname, '../../LICENSE'),
    j: join(__dirname, '../../LICENSE'),
    k: join(__dirname, '../../LICENSE'),
    l: join(__dirname, '../../LICENSE'),
  };

  Promise.all(
    Object.entries(operations).map(async ([k, v]) => {
      await cache.addFile(k, v);
    }),
  )
    .then(async (_) => {
      expect(cache.ramSize).toBeGreaterThan(0);
      const data = await cache.getFile('a');
      expect(data).toBeUndefined();

      expect(await cache.getFile('l')).toBeDefined();

      done();
    })
    .catch((err) => {
      done(err);
    });

  // console.log()
});
