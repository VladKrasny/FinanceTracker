import { createMemoryHistory, createRouter } from "vue-router";

import TransactionsView from "@/components/views/TransactionsView.vue";
import SettingsView from "@/components/views/SettingsView.vue";

const routes = [
  { path: "/", redirect: "/transactions" },
  { path: "/transactions", component: TransactionsView },
  { path: "/settings", component: SettingsView },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
