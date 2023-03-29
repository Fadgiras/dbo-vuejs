<template>
  <div class="home">
    <main class="overflow-y-hidden text-xl">
      <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p class="text-3xl text-gray-700 font-bold mb-5">
          Le seul intermédiaire entre la mer et vous, c'est nous!
        </p>
        <p class="text-gray-500 text-lg">
          Nos {{ $store.state.fishArray.length }} produits de notre terroir
          maritimes.
        </p>
      </div>
      <div>
        <div class="grid grid-cols-3 gap-4 m-8">
          <button class="button button-blue" v-on:click="$router.push('/products')">
            Liste des produits</button>
          <button class="button button-blue" v-on:click="$router.push('/createProduct')">
            Création de produit
          </button><button class="button button-blue" v-on:click="$router.push('/stats')">
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
.button-white {
  position: relative;
  padding: 10px 20px;
  border-radius: 7px;
  border: 1px solid rgb(255, 255, 255);
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  background: rgb(255, 255, 255);
  color: #000;
  overflow: hidden;
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.button-blue {
  position: relative;
  padding: 10px 20px;
  border-radius: 7px;
  border: 1px solid rgb(61, 106, 255);
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  background: rgb(59, 130, 246);
  color: #fff;
  overflow: hidden;
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.button-green {
  position: relative;
  padding: 10px 20px;
  border-radius: 7px;
  border: 1px solid rgb(115, 172, 82);
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  background: rgb(115, 172, 82);
  color: #fff;
  overflow: hidden;
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.button-red {
  position: relative;
  padding: 10px 20px;
  border-radius: 7px;
  border: 1px solid rgb(255, 0, 0);
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  background: rgb(255, 0, 0);
  color: #fff;
  overflow: hidden;
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.button-white:hover {
  background: rgb(255, 255, 255);
  box-shadow: 0 0 30px 5px rgba(255, 255, 255, 0.815);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

.button-blue:hover {
  background: rgb(61, 106, 255);
  box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

.button-green:hover {
  background: rgb(115, 172, 82);
  box-shadow: 0 0 30px 5px rgb(115, 172, 82, 0.815);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

.button-red:hover {
  background: rgb(255, 0, 0);
  box-shadow: 0 0 30px 5px rgb(255, 0, 0, 0.815);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

button:hover::before {
  -webkit-animation: sh02 0.5s 0s linear;
  -moz-animation: sh02 0.5s 0s linear;
  animation: sh02 0.5s 0s linear;
}

button::before {
  content: '';
  display: block;
  width: 0px;
  height: 86%;
  position: absolute;
  top: 7%;
  left: 0%;
  opacity: 0;
  background: #fff;
  box-shadow: 0 0 50px 30px #fff;
  -webkit-transform: skewX(-20deg);
  -moz-transform: skewX(-20deg);
  -ms-transform: skewX(-20deg);
  -o-transform: skewX(-20deg);
  transform: skewX(-20deg);
}

@keyframes sh02 {
  from {
    opacity: 0;
    left: 0%;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
    left: 100%;
  }
}

button:active {
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: box-shadow 0.2s ease-in;
  -moz-transition: box-shadow 0.2s ease-in;
  transition: box-shadow 0.2s ease-in;
}
</style>
