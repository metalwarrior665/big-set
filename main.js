class BigSet {
    constructor(iterable) {
        if (iterable) {
            throw new Error("haven't implemented construction with iterable yet");
        }
        this._sets = [new Set()];
        this._perSetSizeLimit = 14000000;
        this.size = 0;
    }

    has(key) {
        for (const set of this._sets) {
            if (set.has(key)) {
                return true;
            }
        }
        return false;
    }

    add(key) {
        for (const set of this._sets) {
            if (set.has(key)) {
                return this;
            }
        }
        let set = this._sets[this._sets.length - 1];
        if (set.size >= this._perSetSizeLimit) {
            set = new Set();
            this._sets.push(set);
        }
        set.add(key);
        this.size++;
        return this;
    }

    keys() {
        let total = [];
        for (const set of this._sets) {
            const arr = Array.from(set.keys());
            total = total.concat(arr);
        }
        return total;
    }
}

module.exports = BigSet;