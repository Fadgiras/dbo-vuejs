<template>
  <div class="home">
    <header class="sticky top-0">
      <div>
        <button v-on:click="poof()">
          POOF
        </button>
      </div>
    </header>
    <main class="overflow-y-hidden text-xl">
      <div class="m-8">
        Bonjour page d'accueil ! Je sais pas quoi mettre ici, mais je vais y
        arriver ! Pour l'instant je vais juste mettre un bouton pour aller sur
        la page de login.
        <button class="button" v-on:click="$router.push('/login')">
          Login
        </button>
        Voilà, le bouton marche, je vais pouvoir faire des tests. Pourquoi je
        parle à moi même ? Je sais pas, c'est un réflexe.
      </div>
      <div >
        <div class="grid grid-cols-3 gap-4 m-8">
          <button class="button" v-on:click="$router.push('/products')" >
            liste des produits
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { logout } from '@/api';
export default {
  name: 'HomeView',
  components: {},
  methods: {
    poof(){
      logout();
    }
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
