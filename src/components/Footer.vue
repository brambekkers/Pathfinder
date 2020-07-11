<template>
    <footer class="footer">©{{ new Date().getFullYear() }}, Made by <a href="https://brambekkers.nl"> Bram Bekkers</a></footer>
</template>

<style lang="scss" scoped>
footer {
    position: absolute;
    z-index: 100;
    right: 10px;
    bottom: 10px;
    font-family: "Varela Round", sans-serif;
    font-size: 14px;

    a {
        text-decoration: none;
        color: lightseagreen;
    }
}
</style>
