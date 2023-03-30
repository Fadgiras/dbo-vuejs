<template>
  <main class="grow">
    <div class="bg-white p-8 rounded-md w-full">
      <div class="flex items-center justify-between pb-6">
        <div class="flex items-center justify-between w-full">
          <div class="flex bg-gray-50 items-center p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd" />
            </svg>
            <input class="bg-gray-50 outline-none ml-1 block input" type="text" name="" id=""
              placeholder="recherche..." />
          </div>
          <button class="input button-blue" v-on:click="$router.push('/createProduct')">
            Ajouter un produit
          </button>
        </div>
      </div>
      <div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Produit
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Prix unitaire
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Disponibilité
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Réduction<i class="fa-solid fa-fish"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-sky-100 hover:text-sky-900 last:border-none transition-all duration-300 ease-in-out"
                  id="produits-liste" v-on:click="$router.push('/product/' + fish.id)"
                  v-for="fish in $store.state.fishArray" :key="fish.id">
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img class="w-full h-full rounded-full" src="https://picsum.photos/seed/${{name}}/500/500"
                          alt="" />
                      </div>
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {{ fish.name }}
                        </p>
                        <p class="text-gray-400 whitespace-no-wrap">
                          {{ fish.comments }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">
                    <span v-if="fish.category === 0">Poissons</span>
                    <span v-else-if="fish.category === 1">Coquillages<font-awesome-icon
                        icon="fa-sharp fa-solid fa-shrimp" /></span>
                    <span v-else-if="fish.category === 2">Crustacés</span>
                    <span v-else>Non défini</span>
                  </td>
                  <td class="text-center">
                    {{
                      fish.sale
                      ? discountPrice(fish).toFixed(2) + '€ /' + fish.unit
                      : fish.price + '€ /' + fish.unit
                    }}
                  </td>
                  <td class="text-center px-5 py-5 border-b border-gray-200">
                    <span v-if="fish.availability === true"
                      class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span class="relative">En stock</span>
                    </span>
                    <span v-else-if="fish.availability === false"
                      class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                      <span class="relative">Hors stock</span>
                    </span>
                    <span v-else class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                      <span aria-hidden class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                      <span class="relative">?</span>
                    </span>
                  </td>
                  <td class="text-center">{{ fish.discount }}</td>
                </tr>
              </tbody>
            </table>
            <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { loggedIn, refreshToken } from '@/api'
import { getFish } from '@/api/fish'
import { isATokenExpired, isRTokenExpired } from './../utils/jwt'
import store from '@/store'
import { Fish } from '@/types'

export default defineComponent({
  name: 'ListProdView',
  components: {},
  methods: {
    openWindow(id: string | URL | undefined) {
      this.$router.push('/product/' + id)
    },
    discountPrice(fish: Fish) {
      return fish.price - (fish.discount / 100) * fish.price
    },
  },

  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    loggedIn().then(res => {
      console.log('loggedIn : ' + res)
      if (!res) {
        next('/login')
      } else {
        console.log('getFish')
        console.log(store.state.accessT)
        console.log('========================')
        getFish(store, store.state.accessT).then(() => next())
        next()
      }
    })
  },
})
</script>

<style>
/* Form style */
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  background-color: #fff;
  color: rgb(97 97 97);
  box-shadow: 20px 20px 30px rgba(0, 0, 0, .05);
  width: 22rem;
  background-clip: border-box;
}

.header {
  position: relative;
  background-clip: border-box;
  background-color: #1e88e5;
  background-image: linear-gradient(to top right, #1e88e5, #42a5f5);
  margin: 10px;
  border-radius: 0.75rem;
  overflow: hidden;
  color: #fff;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, rgba(33, 150, 243, .4);
  height: 7rem;
  letter-spacing: 0;
  line-height: 1.375;
  font-weight: 600;
  font-size: 1.9rem;
  font-family: Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inputs {
  padding: 1.5rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 200px;
  width: 100%;
  height: 2.75rem;
  position: relative;
}

.input {
  border: 1px solid rgba(128, 128, 128, 0.61);
  outline: 0;
  color: rgb(69 90 100);
  font-weight: 400;
  font-size: .9rem;
  line-height: 1.25rem;
  padding: 0.75rem;
  background-color: transparent;
  border-radius: .375rem;
  width: 100%;
  height: 100%;
}

.input:focus {
  border: 1px solid #1e88e5;
}

.checkbox-container {
  margin-left: -0.625rem;
  display: inline-flex;
  align-items: center;
}

.checkbox {
  position: relative;
  overflow: hidden;
  padding: .55rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.027);
  height: 35px;
  width: 35px;
}

.checkbox input {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.checkbox-text {
  cursor: pointer;
}

.sigin-btn {
  text-transform: uppercase;
  font-weight: 700;
  font-size: .75rem;
  line-height: 1rem;
  text-align: center;
  padding: .75rem 1.5rem;
  background-color: #1e88e5;
  background-image: linear-gradient(to top right, #1e88e5, #42a5f5);
  border-radius: .5rem;
  width: 100%;
  outline: 0;
  border: 0;
  color: #fff;
}

.signup-link {
  line-height: 1.5;
  font-weight: 300;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-link a,
.forget {
  line-height: 1.5;
  font-weight: 700;
  font-size: .875rem;
  margin-left: .25rem;
  color: #1e88e5;
}

.forget {
  text-align: right;
  font-weight: 600;
}

/* ############# */

/* Checkbox */
.bg-greyd {
  letter-spacing: 0;
  line-height: 1.375;
  font-weight: 600;
  font-size: .8rem;
  font-family: Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgb(226 232 240);
}

/* ############# */
</style>
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
