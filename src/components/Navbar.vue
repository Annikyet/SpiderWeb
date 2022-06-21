<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 h-100">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <!-- <img alt="logo" src="../assets/img/cw-logo.png" height="45" /> -->
        <h1 class="navbar-brand">
          <img src="../assets/img/halloween-spider-web.png" alt="SpiderWeb" class="spiderweb-logo">
          SpiderWeb
        </h1>
      </div>
    </router-link>
    <!-- whatever styling needs to be completely redone anyways, thanks for nothing Bootstrap -->
      <!-- <button @click="createPost">+</button> -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <!-- <li>
          <router-link
            :to="{ name: 'About' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            About
          </router-link>
        </li> -->
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
  <!-- <div class="d-flex w-100 justify-content-center">meow meow meows</div> -->
</template>

<script>
import Pop from '../utils/Pop';
export default {
  setup() {
    return {
      createPost() {
        Pop.toast('MEOW')
      }
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

.spiderweb-logo {
  filter: invert(1);
  height: 45px;
}

.navbar-brand {
  font-family: 'Great Vibes', cursive;
  font-size: 45px;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
