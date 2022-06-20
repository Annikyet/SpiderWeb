<template>
  <div class="component income-vertical">

    <!-- <h1>buy stuff</h1>
      <h2>SPEND MONEY</h2>
      <h3>CONSUUUUUME!!</h3> -->

    <!-- why is this iterating if the contents are undefined? -->
    <!-- doesn't work with AppState either -->
    <!-- Maybe it's a weird Vue scope thing? -->
    <!-- Maybe it needs the key, but even then it can't read the value i.tall... -->
    <!-- Alias doesn't help -->
    <!-- maybe putting a v-if to gate it until assigned a value??? -->
    <!-- nope did precisely nothing :/ -->
    <!-- <div :v-if="incomeBoxes"> -->

      <div :v-for="i in incomeBoxes">
        <!-- <a :href="i.linkURL">
        <img :src="i.tall" :alt="i.title">
      </a> -->
        <p>buy stuff</p>
        <!-- weird... this is only triggering once, but there are two ads in the api data... -->
      </div>
    <!-- </div> -->

  </div>
</template>

<!-- export default {
    name: "Home",
    setup() {
        onMounted(async () => {
            try {
                postsService.getAll();
            }
            catch (error) {
                Pop.toast(error.message, "error");
                logger.error(error);
            }
        });
        return {
            posts: computed(() => AppState.posts)
        };
    },
    components: { IncomePane }
} -->

<script>
import { AppState } from "../AppState";
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { incomeService } from "../services/IncomeService";
export default {
  // Maybe a name will help?
  // Doubtful, nothing I do works...
  name: 'IncomePage',
  // PROPS!!!
  // No wait that didn't help WHYYY
  // Missing required incomeBoxes, what
  // Shouldn't this async trigger when the page loads? WHYNOT
  props: { incomeBoxes: { type: Object, required: true } },
  // Oh right, gotta add props to argument because... vue? i guess?
  // Nope still doesn't work
  // Why does Vue hate me
  // Wait I don't need it
  // But it still won't work
  setup(props) {
    onMounted(async () => {
      try {
        // maybe if i get rid of await?
        await incomeService.get()
        // why is this not triggering?
        // if the v-for is commented out, this works fine. data as expected
        // maybe it has something to do with async?
        // As SOON as I try to do anything with this data this line stops running...
        // Shrodingers data...
        // now it's undefined, and tall doesn't exist...
        // wtf
        // but now it exists again when I don't drill down
        // WHAT IS HAPPENING????
        // looks liks the object is being accessed before being generated...
        // even then it should just be an empty array and not trigger a v-for...
        // console.log(AppState.incomeBoxes[0])
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      incomeBoxes: computed(() => AppState.incomeBoxes)
    }
  }
}
</script>


<style lang="scss" scoped>
.income-vertical {
  display: flex;
  flex-direction: column;
}
</style>