<template>
  <div class="h-screen flex">
    <div
      class="flex w-1/2 bg-gradient-to-tr from-blue-500 to-blue-700 i justify-around items-center"
    >
      <div>
        <h1 class="text-white font-bold text-4xl font-sans">
          Le Bateau de Thibault !
        </h1>
        <p class="text-white mt-1">
          Revenez en lieu sûr pour consulter nos articles.
        </p>
        <button
          type="submit"
          class="block w-28 bg-white text-black mt-4 py-2 rounded-2xl font-bold mb-2"
        >
          <router-link to="/">Site Web</router-link>
        </button>
      </div>
      <div class="loader">
        <div class="item1"></div>
        <div class="item2"></div>
        <div class="item3"></div>
      </div>
    </div>
    <div class="flex w-1/2 justify-center items-center bg-white">
      <form v-on:submit.prevent="submit">
        <h1 class="text-gray-800 font-bold text-2xl mb-1">
          Bonjour à nouveau!
        </h1>
        <p class="text-sm font-normal text-gray-600 mb-7">
          Bienvenue sur l'administration
        </p>
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <input
            for="user_name"
            class="pl-2 outline-none border-none"
            type="text"
            name=""
            id="user_name"
            placeholder="Username"
            v-model="name"
          />
        </div>
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            for="user_password"
            class="pl-2 outline-none border-none"
            type="password"
            name=""
            id="user_password"
            placeholder="password"
            v-model="password"
          />
        </div>

        <div class="flex justify-between mt-4 ml-2">
          <div class="text-sm">
            <input class="cursor-pointer" type="checkbox" name="rememberme" />
            <span class="text-sm"> Se souvenir de moi </span>
          </div>
          <span class="ml-2 text-sm hover:text-blue-500 cursor-pointer"
            >Mot de passe oublié ?
          </span>
        </div>
        <div>
          <button
            type="submit"
            class="button block w-full bg-indigo-600 hover:bg-indigo-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Connexion
          </button>
          <div
            class="flex space-x-2 justify-center items-end bg-gray-700 hover:bg-gray-600 text-white transition duration-100 py-2 rounded-2xl"
          >
            <img
              class="h-5 cursor-pointer"
              src="https://i.imgur.com/arC60SB.png"
              alt=""
            />
            <button>Se connecter avec Google</button>
          </div>
          <div v-if="$store.state.error">
            <div class="text-red-500">{{ $store.state.error }}</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login, loggedIn, fillArray, initToken } from '../api'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import store from '../store'
export default {
  data() {
    return {
      name: '',
      password: '',
    }
  },
  methods: {
    submit() {
      console.log(this.name)
      console.log(this.password)
      login(this.name, this.password).then(() => {
        if (store.state.error == '') {
          this.$router.push('/')
        }
      })
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter from login')
    initToken()
    loggedIn().then(res => {
      console.log('loggedIn : ' + res)
      if (res) {
        next('/')
      } else {
        next()
      }
    })
  },
}
</script>

<style>
.home {
}
/* 
.button {
  background: #0893a0;
  color: white;
  padding: 12px;
  border-radius: 12px;
  margin-right: 2rem;
}
.button:hover {
  background: #05585f;
}
.button:active {
  background: #33b1bd;
} */

header {
  min-height: 120px;
  background: #3c7a1f;
}
</style>
