// Cell class
class Cell {
    constructor() {
        this.mark = 'Z';
    }

    isMarked() {
        return this.mark !== 'Z';
    }

    isEmpty() {
        return this.mark == 'Z';
    }

    markCell(symbol) {
        if (this.isEmpty()) {
            this.mark = symbol;
            return true;
        }
        return false;
    }
}

module.exports = Cell;
