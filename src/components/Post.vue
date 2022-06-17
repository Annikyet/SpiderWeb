<template>
  <div class="component">
    <div class="card">
      <img :src="post.imgUrl" alt="post image" class="card-img">
      <div class="card-img-overlay">
        <h3 class="card-title">
          <img v-if="post.creator.picture != '' && post.creator.picture" :src="post.creator.picture" :alt="post.creator.name" class="profile-pic-small">
          {{post.creator.name}}
        </h3>
      </div>
      <div class="card-body">
        <p class="card-text">{{post.body}}</p>
      </div>
    </div>

  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
export default {
  props: {post: {type: Object, required: true} },
  setup(props){
    const router = useRouter()
    return {}
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

</style>