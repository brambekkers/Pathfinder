<template>
    <div id="home">
        <Navbar />
        <Legend />
        <Pathfinder />
        <Footer />
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Legend from "@/components/Legend.vue";
import Pathfinder from "@/components/Pathfinder.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "Home",
    components: {
        Navbar,
        Legend,
        Pathfinder,
        Footer
    }
};
</script>

<style lang="scss" scoped>
#home {
    display: flex;
    height: 100vh;
    background: #f0f0f0;
    flex-direction: column;
}
</style>
