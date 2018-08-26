<template>
  <div class="_box loginContainer">
    <div class="companyName">AI Poker</div>
    <div class="inputs">
      <div class="field">
        <label for="">Username</label>
        <input
          v-model="email"
          type="text"
          placeholder="Your email address or mobile number">
      </div>
      <div class="field">
        <label for="">Email</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password">
      </div>
    </div>
    <div class="forgot-password align-right">
      <router-link
        class="link"
        to="signup"
      >
        Forgot Password?
      </router-link>
    </div>
    <div>
      <button
        class="_button1"
        @click="login">
        LOGIN
      </button>
    </div>
    <div>or</div>
    <button class="_button3">LOGIN WITH FACEBOOK</button>
    <button class="_button3">LOGIN WITH GOOGLE</button>
    <div class="linkBlock">
      <router-link
        class="link"
        to="signup"
      >
        Don't have an account? Sign Up
      </router-link>
    </div>
  </div>
</template>

<script>
// import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants/settings'
// import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from '../../constants/graphql'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      // login: true,
      // name: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['authenticated'])
  },
  methods: {
    login () {
      this.$store.dispatch('login', {email: this.email, password: this.password})
    },
    ...mapActions(['logout'])
  }
  // methods: {
  //   handleAuthenticate () {
  //     const { name, email, password } = this.$data
  //     if (this.login) {
  //       this.$apollo.mutate({
  //         mutation: SIGNIN_USER_MUTATION,
  //         variables: {
  //           email,
  //           password
  //         }
  //       }).then((result) => {
  //         const id = result.data.signinUser.user.id
  //         const token = result.data.signinUser.token
  //         this.saveUserData(id, token)
  //       }).catch((error) => {
  //         alert(error)
  //       })
  //     } else {
  //       this.$apollo.mutate({
  //         mutation: CREATE_USER_MUTATION,
  //         variables: {
  //           name,
  //           email,
  //           password
  //         }
  //       }).then((result) => {
  //         const id = result.data.signinUser.user.id
  //         const token = result.data.signinUser.token
  //         this.saveUserData(id, token)
  //       }).catch((error) => {
  //         alert(error)
  //       })
  //     }
  //     this.$router.push({path: '/'})
  //   },
  //   saveUserData (id, token) {
  //     localStorage.setItem(GC_USER_ID, id)
  //     localStorage.setItem(GC_AUTH_TOKEN, token)
  //     this.$root.$data.userId = localStorage.getItem(GC_USER_ID)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.loginContainer {
  width: 25vw;
  // height: 40vh;
  margin: auto;
  margin-top: 10vh;
  padding: 2vh;
  //display: flex;
  // align-items: center;
  //justify-content: center;
  text-align: center;
}
.box {
}
.companyName {
  margin-top: 10vh;
  color: var(--text-color1);
  font-size: 4vh;
}
.field {
  width: 100%;
  margin-top: 3vh;
  // display: flex;
  // justify-content: center;
  // border: 1px solid black;
}
label {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: var(--font-color3);
  font-size: 1.8vh;
}
input {
  width: 100%;
  font-size: 2.2vh;
  color: var(--font-color1);
  padding: 1vh 0vh;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: .25vh solid lightgray;
}
// This is a hack required to make the input background not turn yellow after
// user has entered data which is the default functionality for Chrome
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
}
button {
  margin-top: 1.2vh;
}
.forgot-password {
  margin-top: 0.5vh;
  margin-bottom: 2vh;
  .link {
    font-size: 2.5vh;
    color: var(--font-color1);
  }
}
.linkBlock {
  margin-top: 1.8vh;
  .link {
    font-size: 2.5vh;
    color: var(--font-color1);
  }
}
.align-right {
  text-align: right;
}
</style>
