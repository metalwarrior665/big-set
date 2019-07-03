const BigSet = require('./main.js')

const set = new BigSet();

// We create an array first so we can measure how long it took to
const insert = (set, multiplicator) => {
    const total = multiplicator * 1000 * 1000;
    let arr = []
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

    console.log('keys:', keys.length)
}

insert(set, 1)
// This may crash depending on your available memory
// insert(set, 50) 


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
console.log(`Check  took ${end - start} ms`)
