import { createRouter, createWebHistory } from "vue-router";
import TransactionsView from "@/views/TransactionsView.vue";
import SettingsView from "@/views/SettingsView.vue";
import DashboardView from "@/views/DashboardView.vue";

const routes = [
  { path: "/", redirect: "/transactions" },
  { path: "/transactions", name: "transactions", component: TransactionsView },
  { path: "/settings", name: "settings", component: SettingsView },
  { path: "/dashboard", name: "dashboard", component: DashboardView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
