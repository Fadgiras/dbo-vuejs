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
      console.log(refreshT)
      console.log('state')
      console.log(state.accessT)
      console.log(state.refreshT)
    },
  },
  actions: {},
  modules: {},
})

function outputCheckToken() {
  const resp = checkToken()
  let val = null
  resp.then(value => {
    val = value
  })
  return val
}

async function refreshToken() {
  const resp = await fetch(BASE_URL + 'token/refresh/', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body: JSON.stringify(localStorage.getItem('refresh')), // body data type must match "Content-Type" header
  })

  let data = await resp.json()

  if (resp.status == 200) {
    console.log('refresh ok')
    store.commit('updateTokens', {
      accessT: data.access,
      refreshT: data.refresh,
    })
  }

  console.log('refresh')
  console.log(data)
  return data
}

async function checkToken() {
  //will return null if token is not valid and the token if it is
  console.log(store.state.accessT)
  if (localStorage.getItem('access') != '') {
    let resp = await fetch(BASE_URL + 'infoproducts/', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    }).then(response => response.json())

    //If token is not valid, try to refresh it
    if (resp.code == 'token_not_valid') {
      console.log('resp token not valid')

      console.log(JSON.stringify({ refresh: localStorage.getItem('refresh') }))
      let resp2 = refreshToken()

      // if (resp2.code == 'token_not_valid') {
      //   return null
      // } else {
      //   localStorage.setItem('access', resp2.access)
      //   localStorage.setItem('refresh', resp2.refresh)
      //   // store.state.accessT = resp2.access
      //   // store.state.refreshT = resp2.refresh
      //   return resp2
      // }
    } else {
      localStorage.setItem('access', resp.access)
      localStorage.setItem('refresh', resp.refresh)

      // store.state.accessT = resp.access
      // store.state.refreshT = resp.refresh
      return resp
    }
  } else {
    return Response
  }
}
// Fetch data from API
console.log('fetching data')
console.log(localStorage.getItem('access'))

loggedIn().then(res => {
  console.log('loggedIn : ' + res)
  if (res) {
    checkToken().catch(error => console.error(error))
    console.log("token isn't null")
    fetch(BASE_URL + 'infoproducts/?format=json', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    })
      .then(response => response.json())
      .then(data => {
        // Create array of Fish objects using constructor
        store.commit(
          'loadAllFish',
          data.map(
            (fishData: {
              id: number
              name: string
              category: number
              price: number
              unit: string
              availability: boolean
              sale: boolean
              discount: number
              comments: string
              owner: string
            }) =>
              new Fish(
                fishData.id,
                fishData.name,
                fishData.category,
                fishData.price,
                fishData.unit,
                fishData.availability,
                fishData.sale,
                fishData.discount,
                fishData.comments,
                fishData.owner
              )
          )
        )
      })
      .then(() => console.log('blep'))
      .catch(error => console.error(error))
  } else {
    console.log('not logged in, so fuck off :D')
  }
})

export default store
