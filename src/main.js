import router from "./router";
import "./main.css";

import { createApp } from "vue";
import App from "./App.vue";

import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogDescription,
} from "radix-vue";

import fetch from "../plugins/fetch";

const app = createApp(App).use(router);

app.mount("#app");

app.use(fetch);

app.component("RAlertRoot", AlertDialogRoot);
app.component("RAlertTrigger", AlertDialogTrigger);
app.component("RAlertPortal", AlertDialogPortal);
app.component("RAlertOverlay", AlertDialogOverlay);
app.component("RAlertContent", AlertDialogContent);
app.component("RAlertTitle", AlertDialogTitle);
app.component("RAlertAction", AlertDialogAction);
app.component("RAlertDescription", AlertDialogDescription);
