<template>
  <header>
    <Navbar />
  </header>
  <sidebar>
    <ProfileSidebar />
  </sidebar>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Annika
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import ProfileSidebar from './components/ProfileSidebar.vue'
export default {
    name: "App",
    setup() {
        return {
            appState: computed(() => AppState)
        };
    },
    components: { ProfileSidebar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --sidebar-width: 20vw;
  --navbar-height: 8vh;
}

header {
  height: var(--navbar-height);
}
sidebar {
  width: var(--sidebar-width);
  height: calc(100vh - var(--navbar-height));
}

main {
  width: calc(100vw - var(--sidebar-width));
  position: absolute;
  left: var(--sidebar-width);
  top: var(--navbar-height);
}

</style>
