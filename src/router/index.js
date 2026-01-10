import { createRouter, createWebHistory } from "vue-router";
import TransactionsView from "@/views/TransactionsView.vue";
import SettingsView from "@/views/SettingsView.vue";

const routes = [
  { path: "/", redirect: "/transactions" },
  { path: "/transactions", name: "transactions", component: TransactionsView },
  { path: "/settings", name: "settings", component: SettingsView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
