import Vue from "vue";
import Vuex from "vuex";

import Dijkstra from "@/scripts/dijkstra";
import ASTAR from "@/scripts/aSTAR";



Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		grid: [],
		cellSize: 30,
		addItem: 'start',
		algorithme: '',
		speed: 'fast',
		speeds: {
			instant: 0,
			fast: 5,
			medium: 50,
			slow: 500
		},
		dev: true
	},
	getters: {
		grid(state) {
			return state.grid
		},
		cellSize(state) {
			return state.cellSize
		},
		algorithme(state) {
			return state.algorithme
		},
		addItem(state) {
			return state.addItem
		},
		speed(state) {
			return state.speed
		},
		speedNum(state) {
			return state.speeds[state.speed]
		},
		dev(state) {
			return state.dev
		}
	},
	mutations: {
		newGrid(state, newGrid) {
			state.grid = newGrid
		},
		setAddItem(state, addItem) {
			state.addItem = addItem
		},
		setAlgorithme(state, algorithme) {
			state.algorithme = algorithme
		},
		setSpeed(state, speed) {
			state.speed = speed
		}
	},
	actions: {
		async visualize({ getters, dispatch }) {
			const algorithme = getters.algorithme
			let result

			// Check for error
			if (!algorithme) {
				alert('No Algorithme selected')
				return
			}

			// Run algorithme
			dispatch('resetGrid')

			if (algorithme === 'Dijkstra Algorithme') {
				const dijkstra = new Dijkstra(getters.grid, getters.speedNum);
				result = await dijkstra.start();
			}

			if (algorithme === 'A* Search') {
				const aSTAR = new ASTAR(getters.grid, getters.speedNum);
				result = await aSTAR.start();
			}

			console.log(result)
		},
		add({ getters, dispatch, commit }, cell) {
			const addItem = getters.addItem

			if (addItem === 'start') {
				dispatch('clearStart')
				cell.start = true
				cell.finish = false
				cell.wall = false
				commit('setAddItem', 'finish')
			}

			if (addItem === 'finish') {
				dispatch('clearFinish')
				cell.start = false
				cell.finish = true
				cell.wall = false
				commit('setAddItem', 'wall')
			}

			if (addItem === 'wall') {
				cell.start = false
				cell.finish = false
				cell.wall = cell.wall ? false : true
			}


			if (addItem === 'waypoint') cell.waypoint = true
		},
		clearAll({ dispatch }) {
			dispatch('clearStart')
			dispatch('clearFinish')
			dispatch('clearWalls')
			dispatch('resetGrid')
		},
		clearStart({ getters }) {
			getters.grid.map(row => row.map(cell => cell.start = false));
		},
		clearFinish({ getters }) {
			getters.grid.map(row => row.map(cell => cell.finish = false));
		},
		clearWalls({ getters }) {
			getters.grid.map(row => row.map(cell => cell.wall = false));
		},
		resetGrid({ getters }) {
			getters.grid.map(row => row.map(cell => {
				// Reset globaly
				cell.visited = false
				cell.path = false

				// Reset Dijkstra
				cell.dijkstra.distFromStart = Infinity;

				// Reset aStar
				cell.aStar.fCost = Infinity;



			}));
		}
	}
});
