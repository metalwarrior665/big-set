##big-set

Simple and uncomplete wrapper of [native javascript Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). It bypasses V8 max limit of approx. 14M elements. It does so by creating multiple sets and wrapping them to similar API.

Currently it only allows these methods (usefull for a large dedup):
- `.has(key)`
- `.add(key)`
- `.keys()` (This doesn't return iterable like original set but just array)

It doesn't allow passing iterable in its constructor, you have to add elements with .add(key) method.

Checking if element is present about 1-10 ms per 10k checks (depends on size) but adding millions of keys takes time. From my tests (10 character long random string) it seems about:

1M adds - 0.5 sec
20M adds - 15 sec
100M adds - 150 sec