<template>
  <header class="sticky top-0 z-30 flex items-center justify-between flex-wrap bg-blue-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <img class="fill-current h-12 w-12 mr-2" width="54" height="54" v-on:click="$router.push('/')"
        src="../src/assets/bateauthibaultLogo.svg" />
      <span class="font-semibold text-xl tracking-tight lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
        v-on:click="$router.push('/')">Le Bateau de Thibault!</span>
    </div>
    <div>
      <a v-on:click="poof()"
        class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">Déconnexion</a>
    </div>
  </header>

    <router-view />
  <footer class="bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-100">
    <div class="container mx-auto px-4 sm:items-center">
      <hr class="mb-4 border-b-1 border-blueGray-200">
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <div class="w-full md:w-4/12 px-4">
          <div class="text-center mb-2 md:text-left md:mb-0">
            <a href="https://www.creative-tim.com/?ref=npr-footeradmin" target="_blank"
              class="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">Copyright © 2023 CFA INSTA</a>
          </div>
        </div>
        <div class="w-full md:w-8/12 px-4">
          <ul class="flex flex-wrap list-none md:justify-end  justify-center">
            <li><a href="/" target="_blank"
                class="text-blueGray-700 hover:text-blueGray-900 text-sm font-semibold block py-1 px-3">Accueil</a>
            </li>
            <li><a href="/contact" target="_blank"
                class="text-blueGray-700 hover:text-blueGray-900 text-sm font-semibold block py-1 px-3">Contact</a>
            </li>
            <li><a href="/blog" target="_blank"
                class="text-blueGray-700 hover:text-blueGray-900 text-sm font-semibold block py-1 px-3">Blog</a>
            </li>
            <li><a href="https://www.creative-tim.com/license?ref=npr-footeradmin" target="_blank"
                class="text-blueGray-700 hover:text-blueGray-900 text-sm font-semibold block py-1 px-3">Licenses</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
body {
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: helvetica;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>

<script lang="ts">
import { logout } from '@/api'
import router from '@/router'
export default {
  name: 'App',
  components: {},
  methods: {
    poof() {
      logout()
    },
  },
}
</script>