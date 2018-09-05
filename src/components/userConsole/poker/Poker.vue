<template>
  <div class="pageLayout">
    <div>
      List of Cards
      <ul>
        <li
          v-for="(card,index) in allCards"
          :key='index'
        >
          {{card.number | formatNumber}}{{card.suit | formatSuit}}
        </li>
      </ul>
    </div>
    <div>
       <div class="hands">
        <div>Enter Hand</div>
        <div>
          <label for="">Add Card:</label>
          <input type="text" v-model="card1">
        </div>
        <button @click="add()">+</button>
      </div>
      <div>Current Hand</div>
      <div
        v-for="(card, index) in currentHand.cards"
        :key="index + '-currentHand'"
        >
        <li>{{card.code}}</li>
      </div>
      <div>Statistics</div>
      <!-- <div class="hands">
        <div>Create Hand</div>
        <div>
          <label for="">Rank:</label>
          <input type="number" v-model="rank">
        </div>
        <div>
          <label for="">Preflop Odds:</label>
          <input type="text" v-model="preflopOdds">
        </div>
        <div>
          <label for="">Card 1:</label>
          <input type="text" v-model="card1">
        </div>
        <div>
          <label for="">Card 2:</label>
          <input type="text" v-model="card2">
        </div>
        <button @click="submit">Submit</button>
      </div> -->
      <!-- ------------------------------- Search Hands --------------------------------- -->
      <div class="searchRow">
          <input
            name="query"
            v-model="searchQuery"
            placeholder="Search"
          >
      </div>
      List of Hands
      <div
        class="hands"
        v-for="(hand,index) in filteredData"
        :key='index'
      >
        <div class="cards">
          {{hand.cards[0].code}}, {{hand.cards[1].code}}
        </div>
        <div class="rank">Rank: {{hand.rank}}</div>
        <div>PreFlop Odds (2 players): {{hand.preflopOdds | percentage}}</div>
        <div>Code: {{hand.code}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ALL_CARDS_QUERY, ALL_HANDS_QUERY, CREATE_HAND_MUTATION } from '../../../constants/graphql'
import { mapGetters } from 'vuex'

export default {
  name: 'Poker',
  components: {
    // Feed, Search, NotificationsBox, CreateMedallion
  },
  data () {
    return {
      allCards: [
        {number: 13, suit: 'Hearts', code: 'KH'},
        {number: 13, suit: 'Diamonds', code: 'KD'}
      ],
      allHands2: [
        {rank: 1, preflopOdds: 0.7, code: 'AS AH', cards: [{number: 14, suit: 'Spades', code: 'AS'}, {number: 14, suit: 'Hearts', code: 'AH'}]},
        {rank: 2, preflopOdds: 0.65, code: 'KS KH', cards: [{number: 13, suit: 'Spades', code: 'KS'}, {number: 13, suit: 'Hearts', code: 'KH'}]},
        {rank: 2, preflopOdds: 0.65, code: 'KS KD', cards: [{number: 13, suit: 'Spades', code: 'KS'}, {number: 13, suit: 'Diamonds', code: 'KD'}]}
      ],
      searchQuery: '',
      rank: '',
      preflopOdds: null,
      code: '',
      card1: null,
      card2: null,
      allHands: []
    }
  },
  apollo: {
    // allPerson here pulls the data from ALL_PEOPLE_QUERY and assigns it to the data(){} object at the top of script
    allCards: {
      query: ALL_CARDS_QUERY
    },
    allHands: {
      query: ALL_HANDS_QUERY
    }
  },
  filters: {
    formatNumber (data) {
      if (data === 14) {
        return 'A'
      }
      if (data === 13) {
        return 'K'
      }
      if (data === 12) {
        return 'Q'
      }
      if (data === 11) {
        return 'J'
      } else {
        return data
      }
    },
    formatSuit (data) {
      if (data === 'Hearts') {
        return 'H'
      }
      if (data === 'Clubs') {
        return 'C'
      }
      if (data === 'Spades') {
        return 'S'
      }
      if (data === 'Diamonds') {
        return 'D'
      }
    },
    percentage (data) {
      data = data * 100
      data = data + '%'
      return data
    }
  },
  computed: {
    ...mapGetters(['currentHand']),
    filteredData: function () {
      console.log('Hands', this.allHands)
      let data = this.allHands
      let keywords = this.searchQuery.split(' ')
      console.log('Search Query', this.searchQuery)
      let attributesToFilterBy = ['code']

      if (keywords[0]) {
        // This block filters by an individual cards
        data = data.filter(function (row) {
          // Checks to see if the string is in any attributes in the attributes array
          return attributesToFilterBy.some(function (key) {
            if (String(row.cards[0][key]).toLowerCase().indexOf(keywords[0]) > -1 || String(row.cards[1][key]).toLowerCase().indexOf(keywords[0]) > -1) {
              return true
            } else {
              return false
            }
          })
        })

        // This block filters by the hand code
        // data = data.filter(function (row) {
        //   // Checks to see if the string is in any attributes in the attributes array
        //   return attributesToFilterBy.some(function (key) {
        //     if (String(row[key]).toLowerCase().indexOf(keywords) > -1 || String(row[key]).toLowerCase().indexOf(keywords) > -1) {
        //       return true
        //     } else {
        //       return false
        //     }
        //   })
        // })
      }
      if (keywords[1]) {
        // This block filters by an individual cards
        data = data.filter(function (row) {
          // Checks to see if the string is in any attributes in the attributes array
          return attributesToFilterBy.some(function (key) {
            if (String(row.cards[0][key]).toLowerCase().indexOf(keywords[1]) > -1 || String(row.cards[1][key]).toLowerCase().indexOf(keywords[1]) > -1) {
              return true
            } else {
              return false
            }
          })
        })
      }

      return data
    }
  },
  methods: {
    open () {
      this.$store.commit('toggleCreateMedallionModal')
    },
    add () {
      console.log('Add Entered')
      console.log('Current Hand at Start', this.$store.state.currentHand)
      this.$apollo.query({
        query: ALL_CARDS_QUERY,
        variables: {
          code: this.card1
        }
      }).catch((error) => {
        console.error(error)
      }).then((result) => {
        console.log('Card Result', result)
        let temp = this.$store.state.currentHand
        temp.cards.push(result.data.allCards[0])
        this.$store.commit('updateCurrentHand', temp)
        console.log('Current Hand at End', this.$store.state.currentHand)
        // if (!this.$store.state.currentHand.id) {
        //   this.$apollo.mutate({
        //     mutation: CREATE_HAND_MUTATION,
        //     variables: {
        //       temp: true,
        //       cardsIds: [result.data.allCards[0].id]
        //     }
        //   }).catch((error) => {
        //     console.error(error)
        //   }).then((result) => {
        //     this.$store.commit('updateCurrentHand', result.data.createHand)
        //     console.log('Current Hand', this.$store.state.currentHand)
        //   })
        // } else {
        //   let cardsIds = this.$store.state.currentHand.cards
        //   console.log('Cards', this.$store.state.currentHand.cards)
        //   cardsIds.push(result.data.allCards[0].id)
        //   this.$apollo.mutate({
        //     mutation: UPDATE_HAND_MUTATION,
        //     variables: {
        //       id: this.$store.state.currentHand.id,
        //       cardsIds: cardsIds
        //     }
        //   }).catch((error) => {
        //     console.error(error)
        //   }).then((result) => {
        //     this.$store.commit('updateCurrentHand', result.data.updateHand)
        //     console.log('Updated Hand', this.$store.state.currentHand)
        //   })
        // }

        // this.$apollo.mutate({
        //   mutation: CREATE_HAND_MUTATION,
        //   variables: {
        //     // Sets variables in graphql.js
        //     rank: rank,
        //     preflopOdds: preflopOdds,
        //     code: code,
        //     cardsIds: [card1Data.data.allCards[0].id, card2Data.data.allCards[0].id]
        //   },
        //   update: (store, { data: { createHand } }) => {
        //     // Pull data from the stored query
        //     const data = store.readQuery({ query: ALL_HANDS_QUERY })
        //     // We add the new data
        //     data.allHands.push(createHand)
        //     // We update the cache
        //     store.writeQuery({ query: ALL_HANDS_QUERY, data: data })
        //   }
        // }).catch((error) => {
        //   console.error(error)
        // })
      })
    },
    submit () {
      console.log('Submit', this.rank, this.preflopOdds, this.code)
      let rank = parseInt(this.rank)
      let preflopOdds = parseFloat(this.preflopOdds)
      let code = ''
      let card1 = this.card1
      let card2 = this.card2
      let card1Data = {}
      let card2Data = {}

      this.$apollo.query({
        query: ALL_CARDS_QUERY,
        variables: {
          code: card1
        }
      }).catch((error) => {
        console.error(error)
      }).then((data) => {
        card1Data = data
        console.log('Card1 Data', card1Data.data.allCards[0])
        card2Data = this.$apollo.query({
          query: ALL_CARDS_QUERY,
          variables: {
            code: card2
          }
        }).catch((error) => {
          console.error(error)
        }).then((data) => {
          card2Data = data
          code = card1Data.data.allCards[0].code + ' ' + card2Data.data.allCards[0].code
          console.log('Card2 Data', card2Data.data.allCards[0])
          this.$apollo.mutate({
            mutation: CREATE_HAND_MUTATION,
            variables: {
              // Sets variables in graphql.js
              rank: rank,
              preflopOdds: preflopOdds,
              code: code,
              cardsIds: [card1Data.data.allCards[0].id, card2Data.data.allCards[0].id]
            },
            update: (store, { data: { createHand } }) => {
              // Pull data from the stored query
              const data = store.readQuery({ query: ALL_HANDS_QUERY })
              // We add the new data
              data.allHands.push(createHand)
              // We update the cache
              store.writeQuery({ query: ALL_HANDS_QUERY, data: data })
            }
          }).catch((error) => {
            console.error(error)
          })
        })
      })
      // console.log('Card ID', card1Id)
    }
  }
}
</script>

<style lang="scss" scoped>
.pageLayout {
  margin-left: 5vw;
  margin-right: 5vw;
  display: grid;
  grid-template-columns: 18vw auto 18vw;
  grid-template-areas:
     "notifications-component carousel-component action-buttons-component"
     "search-component        feed-component     .";
  grid-column-gap: 2vh;
  grid-row-gap: 2vh;
}
.hands {
  border: .25vh solid lightgray;
  padding: 1vh;
}
.cards {
  font-size: 3vh;
}
.rank {
  color: blue;
}
</style>
