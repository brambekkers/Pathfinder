import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// modules
import grid from "./modules/grid";
import algorithme from "./modules/algorithme";

export default new Vuex.Store({
    modules: { algorithme, grid },
    state: {
        speed: "fast",
        speeds: {
            fast: 5,
            medium: 50,
            slow: 500
        },
        dev: true
    },
    getters: {
        speed(state) {
            return state.speed;
        },
        speedNum(state) {
            return state.speeds[state.speed];
        },
        dev(state) {
            return state.dev;
        }
    },
    mutations: {
        setSpeed(state, speed) {
            state.speed = speed;
        }
    },
    actions: {}
});
