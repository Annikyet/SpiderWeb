<template>
  <header>
    <Navbar />
  </header>
  <div class="d-flex">
    <div class="sidebar">
      <AccountSidebar />
    </div>
    <div class="scrolling">
      <main>
        <router-view />
      </main>
      <footer>
        <div class="bg-dark text-light p-1 h-100">
          <InfoFooter />
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import AccountSidebar from './components/AccountSidebar.vue'
import InfoFooter from './components/InfoFooter.vue';
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState)
    };
  },
  components: { AccountSidebar, InfoFooter }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --sidebar-width: 20vw;
  --navbar-height: 8vh;
  --footer-height: 8vh;
}

header {
  height: var(--navbar-height);
  position: fixed;
  width: 100vw;
  z-index: 1;
}

.sidebar {
  width: var(--sidebar-width);
  height: calc(100vh - var(--navbar-height));
  position: fixed;
  top: var(--navbar-height);
}

.scrolling {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: var(--sidebar-width);
  top: var(--navbar-height);
}

main {
  width: calc(100vw - var(--sidebar-width));
  min-height: calc(200vh - (var(--navbar-height) + var(--footer-height)));
  // position: absolute;
  // left: var(--sidebar-width);
  // top: var(--navbar-height);
}

footer {
  height: var(--footer-height);
  width: calc(100vw - var(--sidebar-width));
  // position: absolute;
  // left: var(--sidebar-width);
}
</style>
