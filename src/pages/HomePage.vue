<template>
  <div class="d-flex">
    <div class="post-container">
      <Post v-for="p in posts" :key="p._id" :post="p" />
    </div>
    <div class="income-container">
      <h1>buy stuff</h1>
      <h2>SPEND MONEY</h2>
      <h3>CONSUUUUUME!!</h3>
    </div>
  </div>
</template>

<script>
import { AppState } from "../AppState";
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        // add call to service here
        postsService.getAll()
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.error(error)
      }
    })
    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
.post-container {
  width: 75%;
}
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
