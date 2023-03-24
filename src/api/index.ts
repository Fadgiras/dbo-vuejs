import store from '@/store'
import router from '@/router'
import { BASE_URL } from '@/api/config'
import { Fish } from '@/types/index'
import { isATokenExpired, isRTokenExpired } from '@/utils/jwt'

export async function login(name: string, pswd: string) {
  console.log('login')
  await fetch(BASE_URL + 'api/token/?format=json', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body: JSON.stringify({
      username: name,
      password: pswd,
    }),
  }).then(response => {
    if (response.status == 200) {
      store.commit('updateError', null)
      console.log('login ok')
      //TODO: Json Parse data to get access and refresh token for the function
      response.json().then(data => {
        let access = data.access
        let refresh = data.refresh

        console.log(data.access)
        // let data2 = JSON.parse(data)
        // console.log("updateTokens called")

        store.commit('updateToken', access)
        store.commit('updateRefreshToken', refresh)

        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)

        console.log('localStorage')
        console.log(localStorage.getItem('access'))
        console.log(localStorage.getItem('refresh'))

        // store.commit('updateTokens', {access, refresh})
      })
    } else {
      console.log('login ko')
      store.state.error = 'Login or password incorrect'
    }
  })
}

// async function isTokenExpired(token: string) {
//   console.log(BASE_URL + 'infoproducts/?format=json')
//   fetch(BASE_URL + 'infoproducts/?format=json', {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     headers: { Authorization: 'Bearer ' + token },
//   }).then(response => {
//     console.log('expired fn : response')
//     console.log(response.status == 200)
//     if (response.status == 200) {
//       console.log('expired fn : token is valid')
//       return false
//     } else {
//       console.log('expired fn : token is invalid')
//       return true
//     }
//   })
// }

export async function loggedIn() {
  console.log('loggedIn called')
  
  let aTokenExp : boolean = await isATokenExpired(store.state.accessT)
  
    if (aTokenExp) {
      console.log('aTokenExp')
      let rTokenExp = await isRTokenExpired(store.state.refreshT)
      if (rTokenExp) {
        console.log('rTokenExp')
        return false
      } else {
        console.log('rToken not Exp')
        refreshToken()
        store.commit('updateError', null)
        return true
      }
    }
  store.commit('updateError', null)
  return true
}

export function fillArray() {
  console.log('token is valid')
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
            quantityInStock: number
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
              fishData.quantityInStock,
              fishData.comments,
              fishData.owner
            )
        )
      )
    })
    .then(() => console.log('blep'))
    .catch(error => console.error(error))
}

export async function refreshToken() {
  const resp = await fetch(BASE_URL + 'api/token/refresh/', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body: JSON.stringify({refresh : store.state.refreshT}), // body data type must match "Content-Type" header
  })

  let data = await resp.json()

  if (resp.status == 200) {
    console.log('refresh ok')
    store.commit('updateToken', data.access)
    store.commit('updateRefreshToken', data.refresh)
  }

  console.log('refresh')
  console.log(data)
  return data
}

export async function logout() {
  console.log('logout')
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  store.commit('updateToken', null)
  store.commit('updateRefreshToken', null)
  router.push('/login')
}

export function initToken() {
  console.log('init')
  if (localStorage.getItem('access') && localStorage.getItem('refresh')) {
    console.log('init ok')
    store.commit('updateToken', localStorage.getItem('access'))
    store.commit('updateRefreshToken', localStorage.getItem('refresh'))
    console.log('init ok 2')
    console.log(store.state.accessT)
    console.log(store.state.refreshT)
  }
}