import { LRUFileCache } from "../LRUFileCache";

test('LRUFileCache', () => {

  const cache = new LRUFileCache({
    'file_cache_size': '1GB',
    'ram_cache_size': '500MB'
  });

});
