export default {
    state: {
        grid: [],
        addItem: "start",
        cellSize: 30
    },
    getters: {
        grid(state) {
            return state.grid;
        },
        cellSize(state) {
            return state.cellSize;
        },
        addItem(state) {
            return state.addItem;
        }
    },
    mutations: {
        newGrid(state, newGrid) {
            state.grid = newGrid;
        },
        setAddItem(state, addItem) {
            state.addItem = addItem;
        }
    },
    actions: {
        add({ getters, dispatch, commit }, cell) {
            const addItem = getters.addItem;

            if (addItem === "start") {
                dispatch("clearStart");
                cell.start = true;
                cell.finish = false;
                cell.wall = false;
                commit("setAddItem", "finish");
            }

            if (addItem === "finish") {
                dispatch("clearFinish");
                cell.start = false;
                cell.finish = true;
                cell.wall = false;
                commit("setAddItem", "wall");
            }

            if (addItem === "wall") {
                cell.start = false;
                cell.finish = false;
                cell.wall = cell.wall ? false : true;
            }

            if (addItem === "waypoint") cell.waypoint = true;
        },
        clearAll({ dispatch }) {
            dispatch("clearStart");
            dispatch("clearFinish");
            dispatch("clearWalls");
            dispatch("resetGrid");
        },
        clearStart({ getters }) {
            getters.grid.map((row) => row.map((cell) => (cell.start = false)));
        },
        clearFinish({ getters }) {
            getters.grid.map((row) => row.map((cell) => (cell.finish = false)));
        },
        clearWalls({ getters }) {
            getters.grid.map((row) => row.map((cell) => (cell.wall = false)));
        },
        resetGrid({ getters }) {
            getters.grid.map((row) =>
                row.map((cell) => {
                    // Reset globaly
                    cell.visited = false;
                    cell.path = false;

                    // Reset Dijkstra
                    cell.dijkstra.distFromStart = Infinity;

                    // Reset aStar
                    cell.aStar.fCost = Infinity;
                })
            );
        }
    }
};
