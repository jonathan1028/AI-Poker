// import Authenticator from '../../auth/Authenticator'
import router from '../../router/index'
import { GC_USER_ID } from '../../constants/settings'
// import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants/settings'
// import { SIGNIN_USER_MUTATION } from '../../constants/graphql'
import { GET_USER_QUERY, CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from '../../constants/graphql'
import apolloClient from '../../apollo-client'
// import { GET_USER_QUERY, UPDATE_USER_MUTATION } from '../../constants/graphql'
// import { GET_USER_QUERY, CREATE_USER_MUTATION } from '../../constants/graphql'
// const jwt = require('jsonwebtoken')

// const auth = new Authenticator()

const state = {
  userId: '',
  user: {},
  authenticated: false
  // authenticated: localStorage.getItem('authenticated'),
  // accessToken: localStorage.getItem('access_token'),
  // idToken: localStorage.getItem('id_token'),
  // expiresAt: localStorage.getItem('expires_at')
}

const getters = {
  authenticated (state) {
    return state.authenticated
  },
  userId (state) {
    return state.userId
  }
}

const mutations = {
  authenticated (state, authResult) {
    console.log('Authenticated!!!', authResult)
    state.authenticated = true
    state.userId = authResult.user.id
    state.user = authResult.user
    console.log('User Info', state.user)
    localStorage.setItem(GC_USER_ID, authResult.user.id)
    console.log('Local Storage ID', localStorage.getItem(GC_USER_ID))
    // state.accessToken = authData.accessToken
    // state.idToken = authData.idToken
    // state.expiresAt = authData.expiresIn * 1000 + new Date().getTime()

    // localStorage.setItem('access_token', state.accessToken)
    // localStorage.setItem('id_token', state.idToken)
    // localStorage.setItem('expires_at', state.expiresAt)
    // // Decodes entire idToken and pulls out the userId portion
    // state.auth0UserId = jwt.decode(state.idToken).sub
    // state.email = jwt.decode(state.idToken).email
    // console.log('Email', state.email)
    // console.log('idToken', jwt.decode(state.idToken))
    // localStorage.setItem('auth0UserId', state.auth0UserId)
    // console.log('auth0UserId', localStorage.getItem('auth0UserId'))
    // // Checks to see if the auth0 user has been created in the GraphCool db yet
    router.push({ path: 'poker' })
  },

  userId (state, userId) {
    console.log('User ID set')
    state.userId = userId
  },

  logout (state) {
    state.authenticated = false
    state.userId = null
    // For Auth0 authentication
    // state.accessToken = null
    // state.idToken = false

    localStorage.removeItem(GC_USER_ID)

    // For Auth0 authentication
    // localStorage.removeItem('access_token')
    // localStorage.removeItem('id_token')
    // localStorage.removeItem('expires_at')
    // localStorage.removeItem('auth0UserId')

    // Navigate to the home route
    router.replace('home')
  },
  updateUser (state, data) {
    console.log('User State Changed')
    state.user = JSON.parse(JSON.stringify(data))
  }
}

const actions = {
  login ({commit, dispatch}, {email, password}) {
    // const { name, email, password } = this.$data
    apolloClient
      .mutate({
        mutation: SIGNIN_USER_MUTATION,
        variables: {
          email,
          password
        }
      }).then((result) => {
        // commit('authenticated')
        if (result.data.signinUser.user.id) {
          commit('authenticated', result.data.signinUser)
          dispatch('preloadUser', result.data.signinUser.user)
        } else {
          console.log('Incorrect username/password')
        }
      }).catch((error) => {
        alert(error)
      })
  },

  // This function caches the GET_USER_QUERY so that all user info
  // can be accessed immediately throughout the site
  preloadUser ({ commit }, user) {
    apolloClient
      .query({
        query: GET_USER_QUERY,
        variables: {
          id: user.id
        }
      }).then((result) => {
        commit('updateUser', user)
      }).catch((error) => {
        console.error(error)
      })
  },

  logout ({ commit }) {
    commit('logout')
  },

  // Creates user in graphCool database
  createUser ({dispatch, commit, state}, user) {
    console.log('Create user ran')
    apolloClient
      .mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          email: user.email,
          name: user.name,
          password: user.password
        }
      }).then((result) => {
        dispatch('login', {email: user.email, password: user.password})
        console.log('Create user succeeded')
        // Collects the graphcool user id that corresponds to the auth0UserId
        // console.log('Result2', result)
        // const userId = result.data.createUser.id
        // commit('userId', userId)
        // console.log('User created!', userId)
        // localStorage.setItem(GC_USER_ID, userId)
        // localStorage.setItem('user', JSON.stringify(result.data.createUser))
        // return userId
      }).catch((error) => {
        console.error(error)
      })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
