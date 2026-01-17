import { createRouter, createWebHistory } from "vue-router";
import SettingsView from "@/components/views/SettingsView.vue";
import TransactionsView from "@/components/views/TransactionsView.vue";

const routes = [
  { path: "/", redirect: "/transactions" },
  { path: "/transactions", component: TransactionsView, name: "transactions" },
  { path: "/settings", component: SettingsView, name: "settings" },
];

export default createRouter({ history: createWebHistory(), routes });
