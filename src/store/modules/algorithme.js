import Vue from "vue";

// Maze Generators
import RBT from "@/scripts/RBT";

// Path Algorithme
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

            // Check if algorithme has been selected
            if (!algorithme) {
                Vue.swal({
                    icon: "error",
                    title: "Algorithme",
                    text: "No Algorithme selected"
                });
                return;
            }

            // Run algorithme
            if (algorithme === "Dijkstra Algorithme") dispatch("runDijkstra");
            if (algorithme === "A* Search") dispatch("runAStar");
        },
        async runRBT({ getters, dispatch }) {
            // Reset grid
            dispatch("resetGrid");

            const rbt = new RBT(getters.grid, getters.speedNum);
            try {
                const result = await rbt.start();
            } catch (error) {
                alert(error);
            }
        },
        async runDijkstra({ getters, dispatch }) {
            // Reset grid
            dispatch("resetGrid");

            const dijkstra = new Dijkstra(getters.grid, getters.speedNum);
            try {
                const result = await dijkstra.start();
            } catch (error) {
                Vue.swal({
                    icon: "error",
                    title: "error",
                    text: error
                });
            }
        },
        async runAStar({ getters, dispatch }) {
            // Reset grid
            dispatch("resetGrid");

            const aSTAR = new ASTAR(getters.grid, getters.speedNum);
            try {
                const result = await aSTAR.start();
            } catch (error) {
                Vue.swal({
                    icon: "error",
                    title: "error",
                    text: error
                });
            }
        }
    }
};
