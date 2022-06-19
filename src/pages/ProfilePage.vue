<template>
  <img :src="profile.coverImg" class="profile-banner">
  <div class="profile-name">
    <img class="profile-picture" :src="profile.picture" alt="" />
    <h1>{{ profile.name }}</h1>
  </div>
  <div class="post-container">
    <Post v-for="p in posts" :key="p._id" :post="p" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { useRoute } from "vue-router";
import Pop from '../utils/Pop'
import { profilesService } from "../services/ProfilesService"
import { postsService } from '../services/PostsService';
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    onMounted(async () => {
      // Load profile
      try {
        // call profilesService
        await profilesService.get(route.params.id)   // dummy id for now
        // logger.log(AppState.profile)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }

      // Load user's posts
      try {
        AppState.posts = []
        postsService.getByCreator(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>


  <!-- setup() {
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
  } -->


<style scoped>
.profile-picture {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0px;
  padding: 0px;
}

.profile-banner {
  width: 100%;
  height:  30vh;
  object-fit: cover;
  height: 320px;
}

.profile-name {
  position: relative;
  top: -48px;
  display: flex;
}

.profile-name h1 {
  align-self: flex-end;
}

.post-container {
  width: 75%;
}
</style>
