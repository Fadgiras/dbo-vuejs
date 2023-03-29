<!-- eslint-disable prettier/prettier -->
<template>
  <main>
    <div>
      <div class="bloc p-4 max-w-[400px]">
        <div class="text-3xl pb-16 w-max">Create Fish</div>
        <div class="wrapper">
          <div class="min-w-max">Fish name :</div>
          <input required class="txt" v-model="name" />
          <div class="min-w-max">Fish category</div>
          <select class="txt" v-model="category">
            <option class="txt" v-for="(value, name) in categories" :value="value">
              {{ name }}
            </option>
          </select>
          <div class="min-w-max">Sale</div>
          <input required class="check" type="checkbox" name="On sale" v-model="sale" />
          <div class="min-w-max">Fish Comment</div>
          <textarea class="txt mb-2 resize" v-model="comments" />
          <div class="min-w-max">Fish Price</div>
          <input required class="txt" min="0" type="number" step="any" v-model="price" />
          <div class="min-w-max">Fish Discount</div>
          <input required class="txt" min="0" type="number" step="any" v-model="discount" />
          <div class="min-w-max">Discount price</div>
          <div>
            {{ (price - (discount / 100) * price).toFixed(2) }}
          </div>
          <div class="min-w-max">Fish unit</div>
          <input required class="txt" v-model="unit" />
          <div class="min-w-max">Stock quantity</div>
          <input required class="txt" min="0" type="number" v-model="quantityInStock" />
        </div>
      </div>
      <div class="p-4">
        <button class="button button-red" v-on:click="$router.back()">Back</button>
        <button class="delete-btn button-green" v-on:click="create()">
          Confirm Create
        </button>
      </div>
    </div>
  </main>
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
</style>
