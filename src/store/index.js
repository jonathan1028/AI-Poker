import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import VuexPersistence from 'vuex-persist'
import { CREATE_NOTIFICATION_MUTATION, ALL_NOTIFICATIONS_QUERY } from '../constants/graphql'
import apolloClient from '../apollo-client'

Vue.use(Vuex)

// This will cause the entire auth module to persist through page refreshes
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth']
})

const store = new Vuex.Store({
  modules: {
    auth
  },
  state: {
    count: 0,
    person: {},
    activeModal: null,
    currentOpportunity: null,
    currentVolunteeringLog: null,
    showCreatePerson: false,
    showCreateOpportunity: false,
    showCreateVolunteeringLog: false,
    showUpdateVolunteeringLog: false,
    showCreateMedallionModal: false,
    activeProfileTab: null,
    notificationType: '',
    searchQueryFilters: {
      keywords: '',
      today: false,
      tomorrow: false,
      thisWeek: false,
      thisWeekend: false,
      thisMonth: false,
      mornings: false,
      afternoons: false,
      evenings: false,
      interested: false,
      going: false,
      attended: false
    },
    currentHand: {
      cards: []
    }
  },

  getters: {
    searchQuery (state) {
      return state.searchQueryFilters
    },
    currentHand (state) {
      return state.currentHand
    }
  },

  mutations: {
    increment (state) {
      state.count++
    },
    toggleDisplay (state) {
      state.showCreatePerson = !state.showCreatePerson
    },
    toggleCreateOpportunity (state) {
      state.showCreateOpportunity = !state.showCreateOpportunity
    },
    toggleCreateVolunteeringLog (state) {
      state.showCreateVolunteeringLog = !state.showCreateVolunteeringLog
    },
    toggleUpdateVolunteeringLog (state) {
      state.showUpdateVolunteeringLog = !state.showUpdateVolunteeringLog
    },
    toggleCreateMedallionModal (state) {
      state.showCreateMedallionModal = !state.showCreateMedallionModal
    },
    updateActiveModal (state, data) {
      console.log('State Change', data)
      state.activeModal = data
      console.log('Current State', state.activeModal)
    },
    updateCurrentOpportunity (state, data) {
      state.currentOpportunity = JSON.parse(JSON.stringify(data))
    },
    updateCurrentVolunteeringLog (state, data) {
      state.currentVolunteeringLog = JSON.parse(JSON.stringify(data))
    },
    updateActiveProfileTab (state, data) {
      state.activeProfileTab = data
    },
    updateSearchQueryFilters (state, data) {
      state.searchQueryFilters = JSON.parse(JSON.stringify(data))
      console.log('Updated Query', state.searchQueryFilters)
    },
    updateNotificationType (state, data) {
      state.notificationType = data
    },
    updateCurrentHand (state, data) {
      state.currentHand = JSON.parse(JSON.stringify(data))
    }
  },
  actions: {
    createNotification ({state}, message) {
      console.log('Create Note Ran')
      apolloClient.mutate({
        mutation: CREATE_NOTIFICATION_MUTATION,
        variables: {
          message: message,
          ownedById: state.auth.user.id
        }
      }).catch((error) => {
        alert(error)
      }).then(mutationResult => {
        // Since we need the createdAt attribute for our notifications, we update the store
        // after the createNotification result is received rather than typically done throught the update() function
        // A query needs to be run first here in case there is not one in the cache already for Notifications
        // otherwise apollo.cache.readQuery will return undefined
        apolloClient.query({
          query: ALL_NOTIFICATIONS_QUERY
        }).then((queryResult) => {
          const data = apolloClient.cache.readQuery({ query: ALL_NOTIFICATIONS_QUERY })
          data.allNotifications.push(mutationResult.data.createNotification)
          apolloClient.cache.writeQuery({ query: ALL_NOTIFICATIONS_QUERY, data: data })
        })
      })
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
