import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
// import First from "./views/First.vue";
// import Second from "./views/Second.vue";
// import Third from "./views/Third.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      component: Dashboard,
    },
    // {
    //   path: "/other",
    //   components: {
    //     default: Third,
    //     a: Second,
    //     b: First,
    //   },
    // },
  ],
});

export default router;
