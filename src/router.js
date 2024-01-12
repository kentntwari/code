import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import New from "@/views/New.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Dashboard,
      children: [
        {
          path: "/new",
          name: "new",
          component: New,
        },
      ],
    },
  ],
});

export default router;
