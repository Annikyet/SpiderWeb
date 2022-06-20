<template>
  <div class="component bg-dark text-light">

    <h1>I might be logged in</h1>
    <h2><i>WHO KNOWS!!!</i></h2>
    <h3><b>THE API SURE DOESN'T</b></h3>
    <!-- {{account}} -->

  </div>
</template>

<!-- // 20220619201621
// https://bcw-sandbox.herokuapp.com/account

{
  "error": "UnauthorizedError: No authorization token was found",
  "url": "/account"
} -->

<!-- Because why should ANYTHING go right today? -->

<!-- Account is already in AppState -->
<!-- Changes registered with API -->


<script>
import { AppState } from '../AppState'
import { computed, onMounted } from "vue";

// This is off to a great start. I'm logged in, but no auth token in api... WONDERFUL
export default {
  setup(){
    return {
      account: computed(()=> AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.component {
  height: 100%;
  width: 100%;
}
</style>