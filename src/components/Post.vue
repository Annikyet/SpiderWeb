<template>
  <div class="component">
    <div class="post-card p-2 m-4 bg-dark text-light">
      <img :src="post.imgUrl" alt="post image" class="card-img">
      <div class="card-title">
        <!-- add delete button here -->
        <h3 class="" @click="gotoProfile">
          <img v-if="post.creator.picture != '' && post.creator.picture" :src="post.creator.picture" :alt="post.creator.name" class="profile-pic-small">
          {{post.creator.name}}
        </h3>
        <h3><i v-if="post.creator.id == account.id" class="mdi mdi-delete" @click="deletePost"></i></h3>
      </div>
      <div class="">
        <p class="card-text">{{post.body}}</p>
        <div class="d-flex justify-content-between">
          <div class="time-posted">{{prettyTimeSince}}</div>
          <div class="likes">
            <!-- Nothing is responsive, kinda defeats the point of Vue... -->
            <!-- Maybe I need to use the proxystate trick? -->
            <!-- Right, like it would be that easy, it's Vue -->
            {{post.likeIds.length}}
            <img src="../assets/img/spider.png" alt="Like" @click="likePost" class="like-button">
          </div>
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
// Does Date need to be imported?
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
// Why does this not match the structure on the Vue documentation?
// Like, not even a little bit:
// Wait what the hell, these are inside an object. BUT WHAT OBJECT??? IT DOESN'T SAY!
// data() {
//   return {
//     name: 'Vue.js'
//   }
// },
// methods: {
//   greet(event) {
//     // `this` inside methods points to the current active instance
//     alert(`Hello ${this.name}!`)
//     // `event` is the native DOM event
//     if (event) {
//       alert(event.target.tagName)
//     }
//   }
// }
export default {
  // maybe adding a name will help?
  name: 'Post',
    props: {
      post: { type: Object, required: true },
      // account: {type: Object, required: true}
      },
    setup(props) {
        const router = useRouter();
        return {
          // Why am I 'returning' my method declarations inside of an object instead of just declaring them???
          // For that matter why is everything inside an object???
            gotoProfile() {
                // logger.log('gotoProfile')
                // How does pushing to a... class(???) (or calling the black box method 'push') take me to the ProfilePage
                // If it's a custom method, WHY IS IT NAMED PUSH???
                // If it's an array method on a class(???), WHY AM I APPENDING TO AN ARRAY TO TRIGGER GOING TO A SINGLE PAGE???
                router.push({
                    name: "Profile",
                    params: { id: props.post.creator.id }
                });
            },
            async likePost() {
              // logger.log('AppState.account: ', AppState.account)
              if (AppState.account.id) {
                try {
                  logger.log("booped the like spider 🕷");
                  const res = await postsService.likePost(props.post.id)
                } catch (error) {
                  logger.error(error)
                }
              } else {
                logger.error('User not logged in')
              }
            },
            async deletePost() {
              // Pop.toast('get ridda that post!')
              postsService.deletePost(props.post.id)
            },
          account: computed(() => AppState.account)
        };
    },
    // nope adding the methods object does nothing
    // methods: {
    //   likePost() {
    //     // This will never run because...???
    //     Pop.toast("booped the like spider 🕷");
    //   },
    // },
    // calculating pretty datetime
    // should be in a module
    // linking said module in Vue would take too long to figure out (todo)
    computed: {
      prettyTimeSince() {
        // why is post not defined in this scope?
        // wait so it IS a class? how?
        const timeBetween = Date.now() - new Date(this.post.createdAt)

        if (timeBetween < 60000) {
          // Acts weirdly sometimes?
          return Math.floor(timeBetween / 1000) + ' seconds ago'
        } else if (timeBetween < 3600000) {
          return Math.floor(timeBetween / 60000) + ' minutes ago'
        } else if (timeBetween < 86400000) {
          return Math.floor(timeBetween / 3600000) + ' hours ago'
        } else if (timeBetween < 604800000) {
          return Math.floor(timeBetween / 86400000) + ' days ago'
        } else if (timeBetween < 31536000000) {
          return Math.floor(timeBetween / 604800000) + ' weeks ago'
        } else {
          return Math.floor(timeBetween / 31536000000) + ' years ago'
        }
      }
    }
}
</script>


<style lang="scss" scoped>

.post-card {
  position: relative;
  // background-color: #000000d0;
  // color: #ffffffd0;
}
.card-img {
  min-height: 10vh;
  max-height: 40vh;
  object-fit: cover;
}

.card-title {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  width: 96%;
  justify-content: space-between;
  color: #ffffffc0;
  text-shadow: 1px 1px 6px #000000d0;
}
.post-creator {
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
  filter: invert(1);
}

</style>