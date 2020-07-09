import Dijkstra from "@/scripts/dijkstra";
import ASTAR from "@/scripts/aSTAR";

export default {
    state: {
        algorithme: ""
    },
    getters: {
        algorithme(state) {
            return state.algorithme;
        }
    },
    mutations: {
        setAlgorithme(state, algorithme) {
            state.algorithme = algorithme;
        }
    },
    actions: {
        async visualize({ getters, dispatch }) {
            const algorithme = getters.algorithme;
            let result;

            // Check for error
            if (!algorithme) {
                alert("No Algorithme selected");
                return;
            }
            // Reset grid
            dispatch("resetGrid");

            // Run algorithme
            if (algorithme === "Dijkstra Algorithme") dispatch("runDijkstra");
            if (algorithme === "A* Search") dispatch("runAStar");
        },
        async runDijkstra({ getters }) {
            const dijkstra = new Dijkstra(getters.grid, getters.speedNum);
            try {
                const result = await dijkstra.start();
            } catch (error) {
                alert(error);
            }
        },
        async runAStar({ getters }) {
            const aSTAR = new ASTAR(getters.grid, getters.speedNum);
            try {
                const result = await aSTAR.start();
            } catch (error) {
                alert(error);
            }
        }
    }
};
