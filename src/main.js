import router from "./router";
import "./main.css";

import { createApp } from "vue";
import App from "./App.vue";

import fetch from "../plugins/fetch";

const app = createApp(App).use(router);

app.mount("#app");
app.use(fetch);
