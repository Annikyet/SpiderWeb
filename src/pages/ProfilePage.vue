<template>
  <div class="about text-center">
    <h1>{{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { useRoute } from "vue-router";
import Pop from '../utils/Pop'
import { profilesService } from "../services/ProfilesService"
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        // call profilesService
        await profilesService.get(route.params.id)   // dummy id for now
        logger.log(AppState.profile)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      profile: computed(() => AppState.profile)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
