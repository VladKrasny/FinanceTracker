<template>
  <CSSReset>
    <TheTypography>
      <div class="app">
        <nav class="app__header">
          <RouterLink
            class="app__tab"
            :class="{
              'app__tab--active': $route.path === '/transactions',
            }"
            to="/transactions"
          >
            Transactions
          </RouterLink>
          <RouterLink
            class="app__tab"
            :class="{ 'app__tab--active': $route.path === '/categories' }"
            to="/categories"
          >
            Categories
          </RouterLink>
          <RouterLink
            class="app__tab"
            :class="{ 'app__tab--active': $route.path === '/dashboard' }"
            to="/dashboard"
          >
            Dashboard
          </RouterLink>
        </nav>
        <router-view />
      </div>
    </TheTypography>
  </CSSReset>
</template>

<script setup>
import CSSReset from "./CSSReset.vue";
import TheTypography from "./components/TheTypography.vue";
</script>

<style scoped>
.app {
  padding: 50px 100px 100px 100px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.app__header {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid black;
  padding: 0 0 10px 0;
}

.app__tab {
  background-color: inherit;
  border-width: 0;
  font-size: 20px;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.app__tab--active {
  font-weight: 600;
  text-decoration: underline;
}
@media (max-width: 1024px) {
  .app {
    padding: 10px 20px 20px 20px;
  }
  .app__header {
    display: flex;
    justify-content: center;
    gap: 30px;
  }
}
@media (max-width: 768px) {
  .app {
    padding: 10px 20px 20px 20px;
  }
  .app__header {
    display: flex;
    gap: 30px;
    justify-content: center;
  }
}
@media (max-width: 450px) {
  .app {
    padding: 0;
  }
  .app__header {
    display: flex;
    gap: 20px;
  }
  .app__tab {
    font-size: 17px;
  }
}
</style>
