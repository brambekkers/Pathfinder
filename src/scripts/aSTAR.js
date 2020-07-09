export default class ASTAR {
    constructor(grid, speed) {
        this.grid = grid
        this.speed = speed
        this.startCell = null
        this.finishCell = null
        this.toVisitCell = []

    }

    start() {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('A* Search started')
                await this.findStartAndFinishCell()
                this.toVisitCell.push(this.startCell)
                // Loop trough to visit cells
                while (this.toVisitCell.length) {
                    await this.visitCell(this.toVisitCell[0])
                }

                // Make Path visible
                const path = await this.findPath()

                resolve(path)
                
            } catch (error) {
                reject(error)
            }
        });
    }

    findStartAndFinishCell() {
        return new Promise((resolve, reject) => {
            for (const row of this.grid) {
                for (const cell of row) {
                    if (cell.start) {
                        this.startCell = cell
                    }
                    if (cell.finish) {
                        this.finishCell = cell
                    }
                   

                }
            }

            if (this.startCell && this.finishCell) resolve()
            else reject('no start or finish cell')
        })
    }

    visitCell(cell) {
        return new Promise(async (resolve, reject) => {
            const neighbors = await this.findNeighbors(cell.pos)

            for (const neighbor of neighbors) {
                neighbor.aStar.fCost = this.calcDistTo(neighbor.pos, this.finishCell.pos) + neighbor.aStar.weight

                if (!neighbor.previousCell.x) {
                    neighbor.previousCell = cell.pos
                }
            }
            // Remove this cell
            cell.visited = true
            this.toVisitCell.shift()

            // add newest nearest cell to cell list
            const newCell = await this.findLowestFCost()
            if (newCell) {

                this.toVisitCell.push(newCell)
            }

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

    calcDistTo(pos, pos2) {
        return Math.abs(pos.x - pos2.x) + Math.abs(pos.y - pos2.y)
    }

    findLowestFCost() {
        return new Promise((resolve, reject) => {
            let nearestNeighbor = null

            for (const row of this.grid) {
                for (const cell of row) {
                    if (!cell.visited && !cell.wall) {
                        if (cell.aStar.fCost != Infinity) {
                            if (!nearestNeighbor) nearestNeighbor = cell
                            else if (cell.aStar.fCost < nearestNeighbor.aStar.fCost) nearestNeighbor = cell
                        }
                    }
                }
            }

            resolve(nearestNeighbor)
        });
    }

    findPath() {
        return new Promise(async (resolve, reject) => {
            let currentCell = this.finishCell

            if (currentCell.previousCell.x || currentCell.previousCell.y) {
                currentCell.path = true

                while (!currentCell.start) {
                    console.log(currentCell.previousCell.x, currentCell.previousCell.y)
                    currentCell.path = true
                    currentCell = this.grid[currentCell.previousCell.y][currentCell.previousCell.x]
                }

                resolve('Path Found')
            }
            resolve('No Path Found')
        });
    }
}