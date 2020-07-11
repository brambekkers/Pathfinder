<template>
    <nav id="navbar">
        <div id="title">Pathfinder</div>
        <div id="subtitle">Visualizer</div>
        <div id="menu">
            <div class="dropdown">
                <div>
                    Algorithme
                    <span v-if="algorithme">: {{ algorithme }}</span>
                    <span class="dropdownIcon">▼</span>
                </div>
                <div class="dropdown-content align-left">
                    <a @click="$store.commit('setAlgorithme', 'Dijkstra Algorithme')" :class="{ selected: algorithme === 'Dijkstra Algorithme' }">Dijkstra Algorithme</a>
                    <a @click="$store.commit('setAlgorithme', 'A* Search')">A* Search</a>
                    <a @click="$store.commit('setAlgorithme', 'Greedy Best-first Search')">Greedy Best-first Search</a>
                    <a @click="$store.commit('setAlgorithme', 'Convergent Swarm Algorithme')">Convergent Swarm Algorithme</a>
                    <a @click="$store.commit('setAlgorithme', 'Bidirectional Swarm Algorithme')">Bidirectional Swarm Algorithme</a>
                    <a @click="$store.commit('setAlgorithme', 'Breadth-first Search')">Breadth-first Search</a>
                    <a @click="$store.commit('setAlgorithme', 'Depth-first Search')">Depth-first Search</a>
                </div>
            </div>

            <div class="dropdown">
                <div>
                    Mazes & Patterns
                    <span class="dropdownIcon">▼</span>
                </div>
                <div class="dropdown-content align-left">
                    <p>Algorithmes</p>
                    <a href="#" @click="$store.dispatch('runRBT')">Recursive Backtracker</a>
                    <a href="#" @click="$store.dispatch('runRPair')">Recursive Pairs</a>
                    
                    <p>Patterns</p>
                    <a href="#" @click="$store.dispatch('runOuterWall')">Outer Walls</a>
                    <a href="#">Maze 1</a>
                </div>
            </div>

            <div class="dropdown">
                <div>
                    Add
                    <span class="dropdownIcon">▼</span>
                </div>
                <div class="dropdown-content align-left">
                    <a @click="$store.commit('setAddItem', 'start')">Start</a>
                    <a @click="$store.commit('setAddItem', 'waypoint')">Waypoint</a>
                    <a @click="$store.commit('setAddItem', 'wall')">Wall</a>
                    <a @click="$store.commit('setAddItem', 'finish')">Finish</a>
                </div>
            </div>

            <div class="button visualize" @click="$store.dispatch('visualize')">Visualize!</div>

            <div class="dropdown">
                <div>
                    Clear
                    <span class="dropdownIcon">▼</span>
                </div>
                <div class="dropdown-content align-right">
                    <a href="#" @click="$store.dispatch('clearWalls')">Clear Walls</a>
                    <a href="#" @click="$store.dispatch('resetGrid')">Clear Path</a>
                    <a href="#" @click="$store.dispatch('clearAll')">Clear Board</a>
                </div>
            </div>

            <div class="dropdown">
                <div>
                    Speed:
                    <span class="capital">{{ speed }}</span>
                    <span class="dropdownIcon">▼</span>
                </div>
                <div class="dropdown-content align-right">
                    <a @click="$store.commit('setSpeed', 'slow')" :class="{ selected: speed === 'slow' }">Slow</a>
                    <a @click="$store.commit('setSpeed', 'medium')" :class="{ selected: speed === 'medium' }">Medium</a>
                    <a @click="$store.commit('setSpeed', 'fast')" :class="{ selected: speed === 'fast' }">Fast</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "navbar",
    data() {
        return {};
    },
    methods: {
        add(type) {},
        addStart(x, y) {
            this.clearStart();
            this.grid[y][x].start = true;
        }
    },
    computed: {
        algorithme() {
            return this.$store.getters.algorithme;
        },
        speed() {
            return this.$store.getters.speed;
        },
        speedNum() {
            return this.$store.getters.speedNum;
        }
    }
};
</script>

<style scoped lang="scss">
$nav-height: 50px;
$nav-border-radius: 8px;
$nav-background-color: #3d5a80;
$nav-hover-color: lightseagreen;
$nav-selected-color: rgb(90, 214, 208);

#navbar {
    display: flex;
    z-index: 100;
    align-items: center;
    height: $nav-height;
    background: $nav-background-color;
    color: #f0f0f0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    #title {
        font-family: "Varela Round", sans-serif;
        font-size: 30px;
        margin-left: 10px;
    }
    #subtitle {
        font-family: "Varela Round", sans-serif;
        font-size: 14px;
        padding-top: 10px;
        margin-left: 5px;
        margin-right: 30px;
    }

    #menu {
        font-family: "Manjari", sans-serif;
        display: flex;
        align-items: center;
        flex-direction: row;

        div {
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        // DROPDOWN
        .dropdown {
            position: relative;
            padding: 5px 10px 0 10px;
            margin: 0 10px;
            height: $nav-height;

            &:hover {
                background: $nav-hover-color;

                .dropdown-content {
                    display: block;
                }
            }

            .selected {
                background: $nav-selected-color;
            }

            .dropdownIcon {
                font-size: 0.7rem;
                padding-left: 5px;
            }

            .dropdown-content {
                display: none;
                position: absolute;
                top: $nav-height;
                background-color: $nav-background-color;
                min-width: 100%;
                width: auto;
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                z-index: 1;
                border-radius: 0 0 $nav-border-radius $nav-border-radius;

                p{
                    font-family: "Varela Round", sans-serif !important;
                    text-decoration: underline;
                    margin: 15px 0 5px 10px;
                    font-weight: 400;
                }

                a {
                    color: #f0f0f0;
                    white-space: nowrap;
                    padding: 12px 16px;
                    text-decoration: none;
                    display: block;

                    &:last-of-type {
                        border-radius: 0 0 $nav-border-radius $nav-border-radius;
                    }

                    &:hover {
                        background-color: lightseagreen;
                    }
                }
            }

            .align-left {
                left: 0;
                text-align: left;
            }

            .align-right {
                right: 0;
                text-align: right;
            }
        }

        .button {
            background: $nav-hover-color;
            padding: 5px 30px 0 30px;
            margin: 0 10px;
            height: 35px;
            line-height: 35px;
            border-radius: $nav-border-radius;
            font-size: 1.3rem;
        }
    }
}

.capital {
    margin-left: 5px;
    text-transform: capitalize;
}
</style>
