<template>
  <div class="component">
    <div class="post-card p-2 m-4">
      <img :src="post.imgUrl" alt="post image" class="card-img">
      <div class="">
        <!-- card img overlay is consuming card-body -->
        <!-- put a router link here omg om gom g and pass creatorid through -->
        <!-- WHY TF DOES @CLICK WORK HERE -->
        <!-- <button @click="likePost()">test</button> -->
        <h3 class="card-title" @click="gotoProfile">
          <img v-if="post.creator.picture != '' && post.creator.picture" :src="post.creator.picture" :alt="post.creator.name" class="profile-pic-small">
          {{post.creator.name}}
        </h3>
      </div>
      <!-- </div> -->
      <!-- <div class="card"> -->
        <!-- card-img-overlay is screwing everything up... -->
        <!-- use absolute and relative, don't bother with bs5 -->
      <div class="">
        <p class="card-text">{{post.body}}</p>
        <div class="d-flex justify-content-between">
          <div class="time-posted">{{prettyTimeSince}}</div>
          <!-- BUT NOT HERE!!!! -->
          <!-- Tried using .native, v-on:click, calling a method vs object, wrapping in a <button> <div> and <h3>, -->
          <!-- even tried copying the working code above AND IT DOESNT WORK HERE -->
          <!-- WHYYYYY!?!?!?! THESE ARE THE SAME LEVEL IN THE DOM, AND NEITHER IS INSIDE ACTIVE CONTENT -->
          <!-- DOES VUE JUST ONLY ALLOW ONE ONCLICK PER COMPONENT TO MAKE THINGS HARDER FOR NO REASON? -->
          <!-- NOPE DOESN'T WORK INSIDE IT'S OWN COMPONENT EITHER (WHAT??? WHY???) -->
          <!-- THE METHOD 'CALL' *ABOVE* WORKS FINE IF I CHANGE "gotoProfile" to "likePost" SO WHY DOES IT HATE ME *HERE*-->
          <!-- TRIED USING THE methods OBJECT FROM THE VUE DOCUMENTATION AND STILL NADA -->
          <!-- It's not as simple as just the first one called either, since commenting out the above @click doesn't enable it here -->
          <!-- Maybe there's some HTML/CSS voodoo that's blocking this element from being clicked... somehow??? -->
          <!-- SERIOUSLY VUE THIS IS SIMPLE, WHY MAKE IT SO FREAKING HARD!!???!! -->
          <div class="likes">
            {{post.likes.length}}
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
    props: { post: { type: Object, required: true } },
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
            likePost() {
              try {
                logger.log('test')
                Pop.toast("booped the like spider 🕷");
                
              } catch (error) {
                logger.error(error)
              }
                // This will never run because...???
            }
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
          return Math.floor(timeBetween) + ' seconds ago'
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
  background-color: #000000d0;
  color: #ffffffd0;
}
.card-img {
  min-height: 10vh;
  max-height: 40vh;
  object-fit: cover;
}
.card-title {
  color: #ffffffc0;
  text-shadow: 1px 1px 6px #000000d0;
  position: absolute;
  top: 12px;
  left: 12px;
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