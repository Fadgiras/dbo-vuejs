<template>
  <div class="home">
    <header class="sticky top-0">
      <button class="button mr-auto mt-2 p-4" v-on:click="$router.push('/')">
        Home
      </button>
    </header>
    <main>
      <div>
        <div class="bloc p-4 max-w-[400px]">
          <div class="text-3xl pb-16 w-max">Create Fish</div>
          <div class="wrapper">
            <div class="min-w-max">Fish name :</div>
            <input class="txt" v-model="name" />
            <div class="min-w-max">Fish category</div>
            <select class="txt" v-model="category">
              <option
                class="txt"
                v-for="(value, name) in categories"
                :value="value"
              >
                {{ name }}
              </option>
            </select>
            <div class="min-w-max">Sale</div>
            <input
              class="check"
              type="checkbox"
              name="On sale"
              v-model="sale"
            />
            <div class="min-w-max">Fish Comment</div>
            <textarea class="txt mb-2 resize" v-model="comments" />
            <div class="min-w-max">Fish Price</div>
            <input
              class="txt"
              min="0"
              type="number"
              step="any"
              v-model="price"
            />
            <div class="min-w-max">Fish Discount</div>
            <input
              class="txt"
              min="0"
              type="number"
              step="any"
              v-model="discount"
            />
            <div class="min-w-max">Discount price</div>
            <div>
              {{ (price - (discount / 100) * price).toFixed(2) }}
            </div>
            <div class="min-w-max">Fish unit</div>
            <input class="txt" v-model="unit" />
            <div class="min-w-max">Stock quantity</div>
            <input
              class="txt"
              min="0"
              type="number"
              v-model="quantityInStock"
            />
          </div>
        </div>
        <div class="p-4">
          <button class="button" v-on:click="$router.back()">Back</button>
          <button class="delete-btn" v-on:click="create()">
            Confirm Create
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { loggedIn, createFish, getNewTigId } from '@/api'
import { BASE_URL } from '@/api/config'
import router from '@/router'
import { defineComponent } from 'vue'
import store from '../store'

export default defineComponent({
  data() {
    return {
      tig_id: 0,
      name: '',
      category: 0,
      price: 0,
      unit: '',
      availability: false,
      sale: false,
      discount: 0,
      comments: '',
      owner: '',
      quantityInStock: 0,
      categories: {
        Fish: 0,
        Shellfish: 1,
        Crustaceans: 2,
      },
    }
  },
  name: 'CreateView',
  components: {},
  methods: {
    async create() {
      console.log('create')
      const fish = {
        tig_id: await this.getNewTigId(),
        name: this.name,
        category: this.category,
        price: this.price,
        unit: this.unit,
        availability: this.availability,
        sale: this.sale,
        discount: this.discount,
        comments: this.comments,
        quantityInStock: this.quantityInStock,
        owner: this.owner,
      }
      createFish(fish)
    },
    async getNewTigId() {
      return await getNewTigId()
    },
  },
  computed: {},

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

.txt {
  border: solid darkgrey 1px;
  border-radius: 4px;
  height: fit-content;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(50px, auto);
}

.check {
  max-height: min-content;
  min-height: 1.5em;
  min-width: 1.5em;
  margin-right: auto;
}
</style>
