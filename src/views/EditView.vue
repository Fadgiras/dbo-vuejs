<template>
  <main>
    <div v-if="fish">
      <div v-if="fish" class="inputs">
        <div class="header">Edit : {{ fish.name }}</div>
        <div class="inputs">
          <div class="min-w-max input bg-greyd">Fish name :</div>
          <input class="txt input" v-model="fish.name" />
          <div class="min-w-max input bg-greyd">Sale</div>
          <input class="check input" type="checkbox" name="On sale" v-model="fish.sale" />
          <div class="min-w-max input bg-greyd">Fish Comment</div>
          <textarea class="txt mb-2 resize input" v-model="fish.comments" />
          <div class="min-w-max input bg-greyd">Fish Price</div>
          <input class="txt input" min="0" type="number" step="any" v-model="fish.price" />
          <div class="min-w-max input bg-greyd">Fish Discount</div>
          <input class="txt input" min="0" type="number" step="any" v-model="fish.discount" />
          <div class="min-w-max input bg-greyd">Discount price</div>
          <div class="input">
            {{ (fish.price - (fish.discount / 100) * fish.price).toFixed(2) }}
          </div>
          <div class="min-w-max input bg-greyd">Fish unit</div>
          <input class="txt input" v-model="fish.unit" />
          <div class="min-w-max input bg-greyd">Stock quantity</div>
          <input class="txt input" min="0" type="number" v-model="fish.quantityInStock" />
          <div class="min-w-max input bg-greyd">Availability</div>
          <input required class="check" type="checkbox" name="availability" v-model="fish.availability" />
        </div>
      </div>
      <div class="p-4">
        <div class="p-2">
          <button class="delete-btn input button-green" v-on:click="update(fish)">Confirm Edit</button>
        </div>
        <div class="p-2">
          <button class="button input button-blue" v-on:click="$router.back()">Back</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="m-8 text-2xl">No fish found</div>
    </div>
  </main>
</template>

<script lang="ts">
import { loggedIn } from '@/api'
import { BASE_URL } from '@/api/config'
import router from '@/router'
import { defineComponent } from 'vue'
import store from '../store'

export default defineComponent({
  name: 'EditView',
  components: {},
  methods: {
    update(fish: any) {
      console.log('update')
      console.log(fish)
      fetch(BASE_URL + 'editProduct/' + fish.id + '/?format=json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fish),
      })
      store.commit('updateFish', fish)
      router.back()
    },
  },
  computed: {
    fish() {
      const id = Number(this.$route.params.id)
      const fish: any = store.getters.getFishById(id)
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
