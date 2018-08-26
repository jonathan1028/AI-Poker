<template>
  <div class="header">
    <div class="header-content">
        <div class="main-nav">
          <!-- Logo -->
          <div class="logo">AI Poker</div>
          <!-- Main navigation -->
          <div class="nav-buttons">
            <!-- <router-link to="/admin">About</router-link>
            <div>|</div>
            <router-link to="/newusers">Contact</router-link> -->
          </div>
        </div>
        <!-- Login buttons   -->
        <router-link to="/login">Login</router-link>
        <!-- <button
          v-if="!authenticated"
          @click="login()">
            Log In
        </button> -->

        <!-- <button
          v-if="authenticated"
          @click="logout()">
            Log Out
        </button> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'PublicHeader',
  data () {
    return {
    }
  }
}
</script>

<style>
.header{
  position: fixed;
  width: 100%;
  height: 40px;
  background-color: white;
  top: 0;
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
  color: #3273dc;
  cursor: pointer;
  text-decoration: none;
}

.nav-buttons a{
  color: #3273dc;
  text-decoration: none;
}

.nav-buttons a:visited{
  color: #3273dc;
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
   color: #3273dc;
   text-decoration: none;
}

.login a:visited{
  color: #3273dc;
  text-decoration: none;
}

.login a:hover{
  color: gray;
}
</style>
