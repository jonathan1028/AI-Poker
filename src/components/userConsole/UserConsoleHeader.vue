<template>
  <div class="userConsoleLayout">
    <div class="header">
      <div class="header-content">
          <div class="main-nav">
            <!-- Logo -->
            <div class="logo">AI Poker</div>
            <div class="nav-buttons">
              <router-link to="/poker">Poker</router-link>
              <!-- <div>|</div>
              <router-link to="/feed">Feed</router-link>
              <div>|</div>
              <router-link to="/notifications">Notifications</router-link>
              <div>|</div>
              <router-link to="/profile">Profile</router-link>
              <div>|</div>
              <router-link to="/myopportunities">My Opportunities</router-link>
              <div>|</div>
              <router-link to="/admin">Admin</router-link> -->
              <!-- Logged in navigation -->
              <!-- <div class="authenticated-nav" v-if="userId">
                <router-link to="/people">People</router-link>
                <div>|</div>
                <router-link to="/opportunities">Opportunities</router-link>
                <div>|</div>
              </div>
              <router-link to="/admin">Admin Panel</router-link>
              <div>|</div>
              <router-link to="/newusers">New User Accounts</router-link> -->
            </div>
          </div>
          <!-- Login buttons   -->
          <div>
            <!-- <div>
              {{user.email}}
            </div> -->
            <!-- <button
              v-if="!authenticated"
              @click="login()">
                Log In
            </button> -->
            <!-- <router-link
              @click="logout()">
              Login
              </router-link> -->
            <div
              v-if="authenticated"
              class="link"
              @click="logout()">
                Log Out
            </div>
          </div>
      </div>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants/settings'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  computed: mapGetters(['authenticated', 'userId']),
  // {
  //   // You first retrieve the userId from this.$root.$data.
  //   // If the userId is not available, the submit-button won’t be rendered anymore.
  //   // That way you make sure only authenticated users can create new links
  //   userId () {
  //     return this.$root.$data.userId
  //   }
  // },
  methods: mapActions(['logout'])
  // methods: {
  //   logout () {
  //     localStorage.removeItem(GC_USER_ID)
  //     localStorage.removeItem(GC_AUTH_TOKEN)
  //     this.$root.$data.userId = localStorage.getItem(GC_USER_ID)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.userConsoleLayout {
  display: grid;
  grid-template-rows: 8vh auto;
}
.main-content {
  margin-top: 8vh;
}
.header{
  // position: fixed;
  width: 100%;
  background-image: linear-gradient(to bottom, #efba34, #f3cc6a, #f7dd9b, #fbeecb, #fffefb);
  margin-bottom: 2vh;
  -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.header-content{
  max-width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo{
  margin-right: 1em;
}
.main-nav{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav-buttons{
  display: flex;
  justify-content:space-between;
  align-items: center;
  color: var(--theme-color3);
  cursor: pointer;
  text-decoration: none;
}

.nav-buttons a{
  color: var(--theme-color3);
  text-decoration: none;
}

.nav-buttons a:visited{
  color: var(--theme-color3);
  text-decoration: none;
}

.nav-buttons a:hover{
  color: gray;
  text-decoration: none;
}

.authenticated-nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login a{
   color: var(--theme-color3);
   text-decoration: none;
}

.login a:visited{
  color: var(--theme-color3);
  text-decoration: none;
}

.login a:hover{
  color: gray;
}
.link {
  color: var(--theme-color3);
  text-decoration: none;
  cursor: pointer;
}

</style>
