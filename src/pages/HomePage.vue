<template>
  <div class="d-flex">
    <div class="post-container">
      <CreatePost v-if="account.id" />
      <Post v-for="p in posts" :key="p._id" :post="p" />
      <div class="d-flex justify-content-around">
        <button class="btn btn-dark" :disabled="!pages.newer" @click="changePage(pages.newer)">&lt</button>
        <button class="btn btn-dark" :disabled="!pages.older" @click="changePage(pages.older)">></button>
      </div>
    </div>
    <div class="income-container">
      <IncomePane />
    </div>
  </div>
</template>
<!-- Props are the only thing in the template??? kinda??? -->
<!-- Return is the namespace-ish for the tempplate, i gusss? -->

<script>
import { AppState } from "../AppState";
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import IncomePane from "../components/IncomePane.vue"
import CreatePost from "../components/CreatePost.vue";
export default {
  // Names do?? idk, doesn't matter unnecessary
    name: "Home",
    // Accesss to route???
    setup() {
      // Called on DOM render (before or after idk)
        onMounted(async () => {
            try {
              // should there be an await here if there's an async?
              // it seems to work anyways though...
                postsService.getAll();
            }
            catch (error) {
                Pop.toast(error.message, "error");
                logger.error(error);
            }
        });
        return {
            posts: computed(() => AppState.posts),
            account: computed(() => AppState.account),
            pages: computed(() => AppState.pages),

            async changePage(url) {
              try {
                await postsService.getAll(url)
                
              } catch (error) {
                logger.error(error)
              }
            }
        };
    },
    // imports the component? (what part of the component?) Don't need it anywayss, I guess?
    // The template takes care of it for you
    components: { IncomePane, CreatePost }
}
</script>

<!-- check out the pokemang fireside -->

<style scoped lang="scss">
.post-container {
  width: 60vw;
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
