<template>
	<div id="pathfinder">
		<div>X: {{x}}, Y: {{y}}</div>
		<div id="grid" @mousedown="startDrag" @mousemove="doDrag">
			<div
				v-for="(row, index) of grid"
				class="row"
				:key="`row${index}`"
				:style="{ height: cellSize + 'px' }"
			>
				<Cell v-for="(cell, index) of row" :size="cellSize" :data="cell" :key="`cell${index}`" />
			</div>
		</div>
	</div>
</template>

<script>
import Cell from "./Cell";

export default {
	name: "Pathfinder",
	components: { Cell },
	data() {
		return {
			dragging: false,
			x: false,
			y: false,
			cellAmount: {
				width: 0,
				height: 0
			}
		};
	},
	computed: {
		grid() {
			return this.$store.getters.grid;
		},
		cellSize() {
			return this.$store.getters.cellSize;
		}
	},
	methods: {
		createNewGrid(e) {
			this.calcCellAmount();
			this.createGrid();
		},
		calcCellAmount() {
			const div = document.getElementById("grid");
			this.cellAmount.width = Math.floor(div.offsetWidth / this.cellSize);
			this.cellAmount.height = Math.floor(
				div.offsetHeight / this.cellSize
			);
		},
		createGrid() {
			const grid = [];
			for (let y = 0; y < this.cellAmount.height; y++) {
				grid.push([]);
				for (let x = 0; x < this.cellAmount.width; x++) {
					grid[y].push({
						pos: { x, y },
						disableInput: false,
						start: false,
						finish: false,
						waypoint: false,
						wall: false,
						path: false,

						visited: false,
						previousCell: {
							x: null,
							y: null
						}, 

						// Algorithmes
						dijkstra: {
							weight: 1,
							distFromStart: Infinity
						},
						aStar: {
							weight: 10,
							distFromStart: Infinity,
							distToFinish: Infinity,
							fCost: Infinity
						},
						RBT:{
							
						}
					});
				}
			}
			this.$store.commit("newGrid", grid);
		},
		startDrag() {
			
			this.dragging = true;
			this.x = this.y = 0;
		},
		stopDrag() {
			this.dragging = false;
			this.x = this.y = false;
		},
		doDrag(event) {
			if (this.dragging) {
				const newX = Math.floor(event.clientX / this.cellSize) - 1;
				const newY =
					Math.floor(
						(event.clientY - this.cellSize / 2) / this.cellSize
					) - 5;

				if (newX != this.x || newY != this.y) {
					this.x = newX;
					this.y = newY;

					if(!this.grid[newY][newX].disableInput){
						this.grid[newY][newX].disableInput = true
						this.$store.dispatch("add", this.grid[newY][newX]);

						setTimeout(()=>{
							this.grid[newY][newX].disableInput = false
						},500)
					}
					
				}
			}
		}
	},
	destroyed() {
		window.removeEventListener("resize", this.createNewGrid);
	},
	mounted() {
		this.createNewGrid();
		window.addEventListener("resize", this.createNewGrid);
		window.addEventListener("mouseup", this.stopDrag);
	}
};
</script>

<style scoped lang="scss">
	#pathfinder {
		flex-grow: 1;
		padding: 0 30px 30px 30px;
	}

	#grid {
		height: 100%;
		box-sizing: border-box;

		.row {
			display: flex;

			// Single Cell
			div {
				border-top: 1px solid #adc7ea;
				border-left: 1px solid #adc7ea;
				&:last-of-type {
					border-right: solid 1px #adc7ea;
				}
			}

			&:last-of-type {
				div {
					border-bottom: solid 1px #adc7ea;
				}
			}
		}
	}
</style>
