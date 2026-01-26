import { createMemoryHistory, createRouter } from "vue-router";
import TransactionsView from "@/views/TransactionsView.vue";
import SettingsView from "@/views/SettingsView.vue";
import DashboardView from "@/views/DashboardView.vue";

const routes = [
  { path: "/", redirect: "/transactions" },
  { path: "/transactions", component: TransactionsView },
  { path: "/settings", component: SettingsView },
  { path: "/dashboard", component: DashboardView },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
