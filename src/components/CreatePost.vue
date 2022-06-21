<template>
  <div class="component">
    <div class="p-2 m-4 bg-dark text-light">
      <h3>Create New Post</h3>
      <form action="" @submit.prevent="createPost">
        <input type="text" v-model="newPost.imgUrl" placeholder="Image URL">
        <textarea v-model="newPost.body" cols="65" rows="10" placeholder="Bottom Text"></textarea>
        <div class="d-flex justify-content-end">
          <button class="btn btn-light">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { postsService } from '../services/PostsService'
import { ref } from 'vue'
export default {
  setup(){
    let newPost = ref({})
    return {
      newPost,
      // put createpost handler here
      async createPost() {
        // maybe async it?
        // pass object, variable, nothing???
        await postsService.createPost(newPost.value)
        newPost = {}
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  input {
    width: 100%;
    margin-bottom: 0.4em;
  }

</style>