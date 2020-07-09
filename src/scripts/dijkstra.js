export default class Dijkstra {
    constructor(grid, speed) {
        this.grid = grid
        this.speed = speed
        this.toVisitCell = []
        this.finishCell = null
    }

    start() {
        return new Promise(async (resolve, reject) => {
            console.log('Dijkstra Algorithme started')
            this.toVisitCell.push(await this.findStartCell())

            // Loop trough to visit cells
            while (this.toVisitCell.length) {
                await this.visitCell(this.toVisitCell[0])
            }

            // Make Path visible
            const path = await this.findPath()
            resolve(path)
        });
    }

    findStartCell() {
        return new Promise((resolve, reject) => {
            for (const row of this.grid) {
                for (const cell of row) {
                    if (cell.start) {
                        resolve(cell)
                    }
                }
            }
            reject()
        })
    }

    findNeighbors(pos) {
        return new Promise((resolve, reject) => {
            const neighbors = []

            if (this.grid[pos.y - 1]) neighbors.push(this.grid[pos.y - 1][pos.x])
            if (this.grid[pos.y + 1]) neighbors.push(this.grid[pos.y + 1][pos.x])
            if (this.grid[pos.y][pos.x - 1]) neighbors.push(this.grid[pos.y][pos.x - 1])
            if (this.grid[pos.y][pos.x + 1]) neighbors.push(this.grid[pos.y][pos.x + 1])

            resolve(neighbors)
        });
    }

    visitCell(cell) {
        return new Promise(async (resolve, reject) => {
            if (cell.start) {
                cell.dijkstra.distFromStart = 0
            }

            const neighbors = await this.findNeighbors(cell.pos)
            for (const neighbor of neighbors) {
                const distFromStart = cell.dijkstra.distFromStart + neighbor.dijkstra.weight
                if (distFromStart < neighbor.dijkstra.distFromStart) {
                    // if neighbor is not visited add to array
                    if (!neighbor.visited && !neighbor.wall) {
                        neighbor.dijkstra.distFromStart = distFromStart
                        neighbor.previousCell = cell.pos
                        this.toVisitCell.push(neighbor)
                    }
                }
            }

            // Remove cell
            cell.visited = true
            this.toVisitCell.shift()

            // if finish is found
            if (cell.finish) {
                this.toVisitCell = []
                this.finishCell = cell
            }

            setTimeout(() => {
                resolve()
            }, this.speed)

        });
    }

    findPath() {
        return new Promise(async (resolve, reject) => {
            let currentCell = this.finishCell

            if (currentCell) {
                currentCell.path = true

                while (!currentCell.start) {
                    currentCell = this.grid[currentCell.previousCell.y][currentCell.previousCell.x]
                    currentCell.path = true
                }
                resolve('Path Found')

            }
            resolve('No Path Found')
        });
    }

}