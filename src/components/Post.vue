<template>
  <div class="component">
    <div class="card p-2 m-4">
      <img :src="post.imgUrl" alt="post image" class="card-img">
      <div class="card-img-overlay">
        <!-- put a router link here omg om gom g and pass creatorid through -->
        <!-- WHY TF DOES @CLICK WORK HERE -->
        <h3 class="card-title" @click="gotoProfile">
          <img v-if="post.creator.picture != '' && post.creator.picture" :src="post.creator.picture" :alt="post.creator.name" class="profile-pic-small">
          {{post.creator.name}}
        </h3>
      </div>
      <div class="card-body">
        <p class="card-text">{{post.body}}</p>
        <div class="d-flex justify-content-end">
          <!-- BUT NOT HERE!!!! -->
          <!-- Tried using .native, v-on:click, wrapping in a <button> <div> and <h3>, even tried copying the working code above AND IT DOESNT WORK HERE -->
          <img src="../assets/img/spider.png" alt="Like" @click="likePost" class="like-button">
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import { router } from "../router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  props: {post: {type: Object, required: true} },
  setup(props){
    const router = useRouter()
    return {
      gotoProfile() {
        // logger.log('gotoProfile')
        router.push({
          name: 'Profile',
          params: {id: props.post.creator.id}
        })
      },

      likePost() {
        // This will never run because Vue is petulant and arbitrary.
        Pop.toast('booped the like spider 🕷')
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.card-img {
  min-height: 10vh;
  max-height: 40vh;
  object-fit: cover;
}
.card-title {
  color: #ffffffc0;
  text-shadow: 1px 1px 6px #000000d0;

}

.profile-pic-small {
  height: 48px;
  width: 48px;
  object-fit: cover;
  border-radius: 50%;
}

.like-button {
  height: 32px;
  width: 32px;
  object-fit: contain;
}

</style>