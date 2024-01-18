import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Current from "@/views/Current.vue";
import EditInvoice from "./views/Edit.vue";
import New from "@/views/New.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Dashboard,
      children: [
        {
          path: "new",
          component: New,
        },
      ],
    },
    {
      path: "/invoice/:invoiceId",
      name: "invoice",
      component: Current,
      children: [
        {
          path: "edit",
          name: "edit",
          component: EditInvoice,
        },
      ],
    },
    ,
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
