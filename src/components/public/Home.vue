<template>
  <div>
    <h1 class='box'>Welcome to AI Poker</h1>
    <!-- <h4 v-if="authenticated">
        You are logged in!
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4> -->
  </div>
</template>

<script>
export default {
  name: 'Home'
  // props: ['auth', 'authenticated']
  // computed: {
  //   isAuthenticated () {
  //     if (localStorage.getItem('access_token')) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // }
}
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
