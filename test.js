const BigSet = require('./main.js')

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
    const keysStart = Date.now();
    const keys = set.keys();
    const keysEnd = Date.now();
    console.log(`Final length of key: ${keys.length}, took ${keysEnd - keysStart} ms to create`);
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
