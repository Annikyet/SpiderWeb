<template>
  <img :src="profile.coverImg" class="profile-banner">
  <div class="profile-name">
    <img class="profile-picture" :src="profile.picture" alt="" />
    <h1>{{ profile.name }}</h1>
  </div>
  <div class="d-flex justify-content-between">

    <div class="d-flex flex-column">

      <div class="profile-details">
        <p class="bio">{{ profile.bio }}</p>
        <ul>
          <li>{{ `${profile.graduated ? 'Graduated' : 'Attending'}` }} {{ profile.class }}</li>
          <!-- v-if not working, idk fix later -->
          <li :v-if="profile.github != ''"><i class="mdi mdi-github"></i> {{ profile.github }}</li>
          <li :v-if="profile.linkedin != ''"><i class="mdi mdi-linkedin"></i> {{ profile.linkedin }}</li>
          <li :v-if="profile.resume != ''"><i class="mdi mdi-email"></i> {{ profile.email }}</li>
        </ul>
      </div>
      <div class="post-container">
        <Post v-for="p in posts" :key="p._id" :post="p" />
      </div>
    </div>
    <div class="income-container">
      <IncomePane />
    </div>
  </div>
</template>

<!-- {
  "subs": [
    "auth0|626af7654a336d00680db47f"
  ],
  "picture": "https://media.discordapp.net/attachments/346428945467441163/987952677776404560/unknown.png?width=705&height=528",
  "bio": "am badASDADWa and bingusasdwASDWADAASDADW",
  "coverImg": "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F001%2F250%2F464%2F766.jpg",
  "github": "https://github.com/big-daddy-domm",
  "linkedin": "",
  "resume": "",
  "class": "spring 22ASDWDAWasdwa",
  "graduated": false,
  "_id": "626af7659c788f325c9c151c",
  "name": "ASDasdwasadw",
  "email": "dom123@test.com",
  "createdAt": "2022-04-28T20:22:03.949Z",
  "updatedAt": "2022-06-19T08:13:38.258Z",
  "__v": 0,
  "id": "626af7659c788f325c9c151c"
} -->

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
        await profilesService.get(route.params.id)
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
  height: 30vh;
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
  /* width: 75%; */
  width: 60vw;
}
</style>
