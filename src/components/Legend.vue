<template>
    <div id="legend">
        <h1 class="title">Legend</h1>
        <div>
            <ul>
                <li><i class="fas fa-play"></i>Start</li>
                <li><i class="fas fa-bullseye"></i>Finish</li>
            </ul>
        </div>
        <div>
            <ul>
                <li><i class="fas fa-flag"></i>Waypoint</li>
                <li><i class="fas fa-square-full"></i>Wall</li>
            </ul>
        </div>
        <div>
            <ul>
                <li><i class="fas fa-square-full visited"></i>Checked cells</li>
                <li><i class="fas fa-square-full path"></i>Shortest path</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Legend"
};
</script>

<style scoped lang="scss">
#legend {
    height: 100px;
    display: flex;
    padding: 0 50px;
    align-items: center;
    text-align: left;
    font-family: "Varela Round", sans-serif;

    .title {
        font-size: 30px;
        margin-right: 30px;
        flex: 1;
    }

    div {
        display: flex;
        flex: 1;
        justify-content: space-between;
        margin: 0 30px;
    }

    ul {
        font-size: 14px;
        list-style-type: none;
        i {
            margin: 4px 10px 4px 0;
        }

        .visited {
            color: lightgreen;
        }

        .path {
            color: lightcoral;
        }
    }
}
</style>
