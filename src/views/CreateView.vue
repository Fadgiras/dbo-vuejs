<template>
  <main>
    <div>
      <div class="header">Create Fish</div>
      <div class="inputs">
        <div class="min-w-max input bg-greyd">Fish name</div>
        <input required class="txt input" v-model="name" />
        <div class="min-w-max input bg-greyd">Fish category</div>
        <select class="txt input" v-model="category">
          <option class="txt" v-for="(value, name) in categories" :value="value">
            {{ name }}
          </option>
        </select>
        <div class="min-w-max input bg-greyd">Sale</div>
        <input required class="check" type="checkbox" name="On sale" v-model="sale" />
        <div class="min-w-max input bg-greyd">Fish Comment</div>
        <textarea class="txt mb-2 resize input" v-model="comments"></textarea>
        <div class="min-w-max input bg-greyd">Fish Price</div>
        <input required class="txt input" min="0" type="number" step="any" v-model="price" />
        <div class="min-w-max input bg-greyd">Fish Discount</div>
        <input required class="txt input" min="0" type="number" step="any" v-model="discount" />
        <div class="min-w-max input bg-greyd">Discount price</div>
        <div class="input">
          {{ (price - (discount / 100) * price).toFixed(2) }}
        </div>
        <div class="min-w-max input bg-greyd">Fish unit</div>
        <input required class="txt input" v-model="unit" />
        <div class="min-w-max input bg-greyd">Stock quantity</div>
        <input required class="txt input" min="0" type="number" v-model="quantityInStock" />
      </div>
    </div>
    <div class="p-2">
      <button class="delete-btn input button-green" v-on:click="create()">
        Confirm Create
      </button>
    </div>
    <div class="p-2">
      <button class="button input button-red" v-on:click="$router.back()">Back</button>
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
