<template>
  <div class="home">
    <header class="sticky top-0">
      <button class="button mr-auto mt-2 p-4" v-on:click="$router.push('/')">
        Home
      </button>
    </header>
    <main class="overflow-y-hidden text-xl">
      <div class="grid grid-cols-3 gap-4 m-8">
        <div
          v-for="fish in $store.state.fishArray"
          v-on:click.stop.prevent="openWindow(fish.id)"
          :key="fish.id"
          class="bloc bg-blue-200 p-4 w-max-content shadow-sm border rounded outline outline-1 hover:bg-blue-300"
        >
          <div>
            {{ fish.name }}
          </div>
          <div class="text-sm italic font-light">
            {{
              fish.comments == ''
                ? 'Pas de description supplémentaire'
                : fish.comments
            }}
          </div>
          <div class="text-xs italic font-light">id : {{ fish.id }}</div>
          <div class="text-lg italic font-light mt-4">
            {{ ' En stock :' + fish.quantityInStock }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { loggedIn, refreshToken } from '@/api'
import { getFish } from '@/api/fish'
import { isATokenExpired, isRTokenExpired } from './../utils/jwt'
import store from '@/store'

export default defineComponent({
  name: 'ListProdView',
  components: {},
  methods: {
    openWindow(id: string | URL | undefined) {
      this.$router.push('/product/' + id)
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
.home {
}
header {
  min-height: 120px;
  background: #3c7a1f;
}
</style>
