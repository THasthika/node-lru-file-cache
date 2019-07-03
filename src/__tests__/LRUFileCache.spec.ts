import { LRUFileCache } from "../LRUFileCache";
import { join, dirname } from "path";

test('LRUFileCache', (done) => {

  const cache = new LRUFileCache({
    'file_cache_size': '20 KB',
    'ram_cache_size': '10 KB',
    'tmp_folder': '/tmp/__cache__xxx'
  });

  cache.addFile("a", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("b", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("c", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("d", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("e", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("f", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("g", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("h", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("i", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("j", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("k", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("l", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("lasfasfas", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("lasfasfasas", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("laasfasfsfasfasas", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("las", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("lasf", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("lassssf", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("lassf", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("lasssf", join(dirname(__dirname), "../LICENSE"));
  cache.addFile("m", join(dirname(__dirname), "../LICENSE")).then(_ => {
    console.log(cache.ramSize);

    cache.getFile("b").then(data => {
      console.log(data);
      done();
    })
  });

  // console.log()
  

});
