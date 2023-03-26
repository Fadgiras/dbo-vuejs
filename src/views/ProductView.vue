<template>
  <div class="home">
    <header class="sticky top-0">
      <button class="button mr-auto mt-2 p-4" v-on:click="$router.push('/')">
        Home
      </button>
    </header>
    <main>
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
  </div>
</template>

<script lang="ts">
import { loggedIn, deleteFish} from '@/api'
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

<style>
.home {
}
header {
  min-height: 120px;
  background: #3c7a1f;
}
main {
  overflow-y: hidden;
  font-size: 20px;
}

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
}

.delete-btn {
  padding: 11px;
  border-radius: 12px;
  border: solid black 1px;
}
.delete-btn:hover {
  background-color: rgb(145, 145, 145);
}
.delete-btn:active {
  background-color: rgb(255, 0, 0);
  color: white;
  border: red 1px solid;
}
</style>
