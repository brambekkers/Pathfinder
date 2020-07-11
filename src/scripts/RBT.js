export default class RBT {
    constructor(grid, speed) {
        this.grid = grid;
        this.speed = speed;

        this.currentCell = null;
        this.visitedCells = [];
        this.loop = true;
    }
    async start() {
        console.log("Recursive Backtracking maze generator has started");
        this.currentCell = this.randomCell();
        this.currentCell.visited = true;

        while (this.loop) {
            const neighbors = await this.findNeighbors(this.currentCell.pos);
            const avalibleNeighbors = neighbors.filter((n) => this.isAvalible(n));

            if (avalibleNeighbors.length > 0) {
                await this.updateNeighbors(avalibleNeighbors);
            } else {
                this.currentCell.wall = true;
                await this.getCellFromBacktrack();
            }
        }
    }
    randomCell() {
        const randomY = Math.floor(Math.random() * this.grid.length);
        const randomX = Math.floor(Math.random() * this.grid[0].length);

        return this.grid[randomY][randomX];
    }
    findNeighbors(pos) {
        return new Promise((resolve, reject) => {
            const neighbors = [];
            if (this.grid[pos.y - 1]) neighbors.push(this.grid[pos.y - 1][pos.x]);
            if (this.grid[pos.y + 1]) neighbors.push(this.grid[pos.y + 1][pos.x]);
            if (this.grid[pos.y][pos.x - 1]) neighbors.push(this.grid[pos.y][pos.x - 1]);
            if (this.grid[pos.y][pos.x + 1]) neighbors.push(this.grid[pos.y][pos.x + 1]);

            resolve(neighbors);
        });
    }
    updateNeighbors(neighbors) {
        return new Promise((resolve, reject) => {
            const randomNum = Math.floor(Math.random() * neighbors.length);
            setTimeout(() => {
                for (let i = 0; i < neighbors.length; i++) {
                    if (i != randomNum) {
                        neighbors[i].wall = Math.random() < 0.8 ? true : false;
                    } else {
                        this.visitedCells.push({ ...this.currentCell.pos });
                        this.currentCell = neighbors[randomNum];
                        this.currentCell.visited = true;
                    }
                }
                resolve();
            }, this.speed);
        });
    }
    avalibleCells() {
        return new Promise((resolve, reject) => {
            const arr = [];
            for (let y = 0; y < this.grid.length; y++) {
                for (let x = 0; x < this.grid[0].length; x++) {
                    const c = this.grid[y][x];
                    if (this.isAvalible(c)) arr.push(c);
                }
            }
            resolve(arr);
        });
    }
    getNewAvalibleCell() {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const avalibleCells = await this.avalibleCells();
                if (!avalibleCells.length) {
                    this.stopAlgorithme();
                    return;
                }
                const random = Math.floor(Math.random() * avalibleCells.length);
                this.currentCell = avalibleCells[random];
                resolve();
            }, this.speed);
        });
    }
    getCellFromBacktrack() {
        return new Promise(async (resolve, reject) => {
            for (let i = this.visitedCells.length - 1; i >= 0; i--) {
                const neighbors = await this.findNeighbors(this.visitedCells[i]);
                const avalibleNeighbors = neighbors.filter((n) => this.isAvalible(n));

                if (avalibleNeighbors.length > 0) {
                    this.currentCell = avalibleNeighbors[0];
                    this.visitedCells.splice(i, 1);

                    resolve();
                    return;
                }

                if (i === 0) {
                    await this.getNewAvalibleCell();
                    resolve();
                }
            }
        });
    }
    isAvalible(c) {
        return !c.visited && !c.wall && !c.finish && !c.start && !c.waypoint;
    }

    stopAlgorithme() {
        this.loop = false;
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                const c = this.grid[y][x];
                c.visited = false;
            }
        }
    }
}
