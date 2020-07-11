import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
import store from "./store/";
import "./registerServiceWorker";

// Vue Sweet alert 2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const options = {
    confirmButtonColor: "lightseagreen",
    cancelButtonColor: "lightred",
    customClass: {
        container: "swal-container"
    }
};
Vue.use(VueSweetalert2, options);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");
