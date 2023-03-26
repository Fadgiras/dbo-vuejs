import { BASE_URL } from '@/api/config'
import store from '@/store'

export async function isATokenExpired(token: string ) {
  let res: boolean = true

  console.log('isATokenExpired called, token is: ' + token )
  if (!token) {
    return true
  }
  console.log("blup")
  await fetch(BASE_URL + 'infoproducts/?format=json', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: { Authorization: 'Bearer ' + token },
  }).then(response => {
    console.log('isATokenExpired : response')
    console.log(response.status == 200)

    if (response.status == 200) {
      console.log('token is valid from isATokenExpired')
      res = false
    } else {
      console.log('token is invalid from isATokenExpired')
      res = true
    }
  })
  return res
}

export async function isRTokenExpired(token : string) {
  let res: boolean = true

  if (!token) {
    return true
  }

  console.log('isRTokenExpired called, token is: ' + token)
  await fetch(BASE_URL + 'api/token/refresh/?format=json', {
    method: 'POST', // GET, *POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body: JSON.stringify({ refresh: token }), // body data type must match "Content-Type" header
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.status == 200) {
      console.log('token is valid from isRTokenExpired')
      res = false

      response.json().then(data => {

        console.log(data.access)

        console.log('localStorage from isRTokenExpired')
        console.log(localStorage.getItem('access'))
      })

    } else {
      console.log('token is invalid')
      res = true
    }
  })
  return res
}
