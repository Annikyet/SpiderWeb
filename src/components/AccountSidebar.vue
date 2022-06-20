<template>
  <div class="component bg-dark text-light">
    <img :src="account.picture" alt="">
    <h5>{{account.name}}</h5>
    <p>{{account.bio}}</p>
    <ul>
      <li><i class="mdi mdi-school"></i> {{`${account.graduated ? 'Graduated' : 'Attending'} ${account.class}`}}</li>
      <li><i class="mdi mdi-github"></i> {{account.github}}</li>
      <li><i class="mdi mdi-linkedin"></i> {{account.linkedin}}</li>
      <li><i class="mdi mdi-file"></i> {{account.resume}}</li>
      <li><i class="mdi mdi-email"></i> {{account.email}}</li>
    </ul>


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
import { logger } from '../utils/Logger';

// This is off to a great start. I'm logged in, but no auth token in api... WONDERFUL
export default {
  setup(){
    return {
      account: computed(()=> AppState.account),
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