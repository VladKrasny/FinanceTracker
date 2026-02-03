import { createWebHistory, createRouter } from "vue-router";
import TransactionsView from "../views/TransactionsView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/transactions", component: TransactionsView },
  { path: "/categories", component: CategoriesView },
  { path: "/dashboard", component: DashboardView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
