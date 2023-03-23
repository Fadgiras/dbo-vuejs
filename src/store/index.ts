import { createStore } from 'vuex'

// Define the Fish class

import series from '../../ventes/medium.json'
import { BASE_URL } from '@/api/config'
import { Fish } from '@/types/index'
import { loggedIn } from '@/api'

const data = series as Vente[]
export type ProductAmount = {
  amount: number
  pid: number
}

export type Vente = {
  date: string | Date
  id: string
  price: number
  type: 'IN' | 'OUT'
  products: ProductAmount[]
}

const store = createStore({
  state: {
    fishArray: [Fish],
    data,
    accessT: '',
    refreshT: '',
    error: '',
  },
  getters: {
    getFishById:
      state =>
      (
        id: (
          this: void,
          value: never,
          index: number,
          obj: never[]
        ) => value is never
      ) => {
        return state.fishArray.find(fish => fish.id === id)
      },
  },
  //TODO toucher aux mutations pour changer le states
  mutations: {
    loadAllFish(state, fishArray) {
      state.fishArray = fishArray
    },
    updateFish(state, selectedfish) {
      const index = state.fishArray.findIndex(
        fish => fish.id === selectedfish.id
      )
      state.fishArray[index] = selectedfish
    },
    deleteFish(state, selectedfish) {
      const index = state.fishArray.findIndex(
        fish => fish.id === selectedfish.id
      )
      state.fishArray.splice(index, 1)
    },
    updateTokens(state, { accessT, refreshT }) {
      state.accessT = accessT
      state.refreshT = refreshT
      console.log('updateTokens')
      console.log(accessT)
      console.log({refreshT})
      console.log('state')
      console.log(state.accessT)
      console.log(state.refreshT)
    },
    updateToken(state, accessT) {
      state.accessT = accessT
      console.log('updateToken')
      console.log({accessT})
      console.log('state')
      console.log(state.accessT)
      localStorage.setItem('access', accessT)
    },
    updateRefreshToken(state, refreshT) {
      state.refreshT = refreshT
      console.log('updateRefreshToken')
      console.log({refreshT})
      console.log('state')
      console.log(state.refreshT)
      localStorage.setItem('refresh', refreshT)
    }
  },
  actions: {},
  modules: {},
})

// Fetch data from API
console.log('fetching data')
console.log(localStorage.getItem('access'))

// loggedIn().then(res => {
//   console.log('loggedIn : ' + res)
//   if (res) {
//     checkToken().catch(error => console.error(error))
//     console.log("token isn't null")
    
//   } else {
//     console.log('not logged in, so fuck off :D')
//   }
// })

export default store
