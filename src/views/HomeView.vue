<template>
  <div class="home">
    <header class="sticky top-0">
      <div class="flex w-full">
        <button class="button mr-auto mt-2" v-on:click="$router.push('/')">
          Home
        </button>
        <button class="button ml-auto mt-2" v-on:click="poof()">Logout</button>
      </div>
    </header>
    <main class="overflow-y-hidden text-xl">
      <div class="m-8 flex flex-cols">Bonjour page d'accueil !</div>
      <div>
        <div class="grid grid-cols-3 gap-4 m-8">
          <button class="button" v-on:click="$router.push('/products')">
            Liste des produits</button
          ><button class="button" v-on:click="$router.push('/createProduct')">
            Création de produit
          </button><button class="button" v-on:click="$router.push('/stats')">
            Statistiques de ventes
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { logout } from '@/api'
import router from '@/router'
export default {
  name: 'HomeView',
  components: {},
  methods: {
    poof() {
      logout()
    },
  },
}
</script>

<style>
.home {
}
header {
  min-height: 120px;
  background: #3c7a1f;
}
</style>
