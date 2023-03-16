import store from "@/store"
import router from "@/router"
import { BASE_URL } from "@/api/config"
import { Fish } from "@/types/index"

export async function login(name: string, pswd: string) {
  console.log('login')
  await fetch(BASE_URL+'api/token/?format=json', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body: JSON.stringify({
      username: name,
      password: pswd
    }),
  }).then(response => {
    if (response.status == 200) {
      console.log('login ok')
      //TODO: Json Parse data to get access and refresh token for the function 
      response.json().then(data => {
        console.log("AAAAAAAAAAAAAAAA "+data)
        store.commit('updateTokens', data)
      })
    } else {
      console.log('login ko')
      store.state.error = 'Login or password incorrect'
    }
  })
}

export function fillArray(){
  console.log('token is valid')
  fetch(BASE_URL+'infoproducts/?format=json', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin    
    headers: { Authorization: 'Bearer ' + store.state.accessT },
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
}
