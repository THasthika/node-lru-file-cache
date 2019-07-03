# LRU File Cache

A 2 tier caching for files

## Usage
```ts
import { LRUFileCache } from "lru-file-cache";

const cache = new LRUFileCache({
  'ram_cache_size': '1 GB',
  'fs_cache_size': '2 GB',
  'tmp_folder': '/tmp/__my_cache__'
});

cache.addFile('image_01', './xx.jpg').then(_ => {

}).catch(err => {
  throw err;
});

cache.getFile('image_01').then(data => {
  // data is a buffer or undefined
}).catch(err => {
  throw err;
});

```