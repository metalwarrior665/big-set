## big-set

Simple and uncomplete wrapper of [native javascript Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). It bypasses V8 max limit of approx. 14M elements. It does so by creating multiple sets and wrapping them to similar API.

Has no dependencies. Just few lines of code.

Currently it only allows these methods (usefull for a large dedup):
- `.has(key)`
- `.add(key)`
- `.keys()` (This doesn't return iterable like original set but just a plain array)

It doesn't allow passing iterable in its constructor, you have to add elements with .add(key) method.

Checking if element is present about 1-10 ms per 10k checks (depends on size) but adding millions of keys takes time. From my tests (10 character long random string) it seems about:

1M adds - 0.5 sec
20M adds - 15 sec
100M adds - 150 sec


```
const BigSet = require('big-set');

// We create an array first so we can measure how long it took to add keys to the set
// We create few million random numbers converted to a string (mocking product IDs)
const insert = (set, multiplicator) => {
    const total = multiplicator * 1000 * 1000;
    const arr = []
    for (let i = 0; i < total; i++) {
        if (i % 1000000 === 0) {
            console.log(`${i} random numbers created`)
        }
        const str = Math.random().toFixed(8)
        arr.push(str);
    }
    const start = Date.now();
    for (const str of arr) {
        set.add(str);
    } 
    const end = Date.now();
    console.log(`Final size of set: ${set.size}, took ${end - start} ms to create`);
    const keys = set.keys();
    console.log('keys length:', keys.length)
}

const set = new BigSet();

// Insert 1 million and measure how long it took
insert(set, 1)

// This may crash depending on your available memory
// insert(set, 50) 

// Now we measure the element lookup
let testingRandomNumbers = [];
for (let i = 0; i < 10000; i++) {
    const str = Math.random().toFixed(8)
    testingRandomNumbers.push(str);
}

const results = {
    true: 0,
    false: 0,
}

const start = Date.now()
for (const testN of testingRandomNumbers) {
    results[set.has(testN)]++;
}

const end = Date.now();
console.dir(results)
console.log(`Check took ${end - start} ms`)
```