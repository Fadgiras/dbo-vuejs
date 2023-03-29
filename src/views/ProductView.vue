<template>
  <main class="grow">
    <div v-if="fish">
      <div v-if="fish" class="bloc grid grid-cols-2 p-4 max-w-[50%]">
        <div class="text-3xl pb-16">
          {{ fish.name }}
        </div>
        <div>
          <div v-if="fish.sale" class="rotate-12 text-red-600">
            En promotion !
          </div>
        </div>

        <div class="text-sm italic font-light">
          {{
            fish.comments == ''
            ? 'Pas de description supplémentaire'
            : fish.comments
          }}
        </div>
        <div>
          <div>
            {{
              fish.sale
              ? discountPrice().toFixed(2) + '€ /' + fish.unit
              : fish.price + '€ /' + fish.unit
            }}
          </div>
        </div>
      </div>
      <div class="p-4">
        <button class="button" v-on:click="$router.back()">Back</button>
        <button class="button" v-on:click="openWindow(fish.id)">Edit</button>
        <button class="delete-btn" v-on:click="deleteFish(fish)">
          Delete
        </button>
      </div>
    </div>
    <div v-else>
      <div class="m-8 text-2xl">No fish found</div>
    </div>
  </main>
</template>

<script lang="ts">
import { loggedIn, deleteFish } from '@/api'
import { BASE_URL } from '@/api/config'
import store from '@/store'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ProductsView',
  components: {},
  methods: {
    openWindow(id: string | URL | undefined) {
      this.$router.push('/edit/' + id)
    },
    deleteFish(fish: any) {
      deleteFish(fish)
    },
    discountPrice() {
      return this.fish.price - (this.fish.discount / 100) * this.fish.price
    },
  },
  computed: {
    fish() {
      const id = Number(this.$route.params.id)
      const fish = this.$store.state.fishArray.find(
        (fish: { id: number }) => fish.id === id
      )
      console.log(fish)
      return fish || null
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    loggedIn().then(res => {
      console.log('loggedIn : ' + res)
      if (!res) {
        next('/login')
      } else {
        next()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    loggedIn().then(res => {
      console.log('loggedIn : ' + res)
      if (!res) {
        store.commit(
          'updateError',
          'Vous devez vous reconnecter pour accéder à cette page'
        )
        next('/login')
      } else {
        next()
      }
    })
  },
})
</script>

<style></style>
