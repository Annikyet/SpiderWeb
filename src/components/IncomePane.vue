<template>
  <div class="component income-vertical">

      <!-- <h1>buy stuff</h1>
      <h2>SPEND MONEY</h2>
      <h3>CONSUUUUUME!!</h3> -->

<!-- why is this iterating if the contents are undefined? -->
<!-- doesn't work with AppState either -->
<!-- Maybe it's a weird Vue scope thing? -->
<!-- Maybe it needs the key, but even then it can't read the value i.tall... -->
    <div :v-for="i in incomeBoxes" :key="i.tall" :incomeBox="i">
      <!-- <a :href="i.linkURL">
        <img :src="i.tall" :alt="i.title">
      </a> -->
      <p>buy stuff</p>
      <!-- weird... this is only triggering once, but there are two ads in the api data... -->
    </div>

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
  setup(){
    onMounted(async () => {
      try {
        await incomeService.get()
        // why is this not triggering?
        // if the v-for is commented out, this works fine. data as expected
        // maybe it has something to do with async?
        console.log(AppState.incomeBoxes[0].tall)
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