<template>
  <div class="home">
    <header class="sticky top-0"></header>
    <main class="overflow-y-hidden text-xl">
      <div class="m-8 text-2xl italic">Back Gestion Login</div>
      <div class="flex flex-row">
        <div class="flex flex-col m-8">
          <div>
            <form v-on:submit.prevent="submit">
              <div>
                <input
                  v-model="name"
                  class="bloc rounded border border-gray-300 shadow-sm px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-2"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  v-model="password"
                  class="bloc rounded border border-gray-300 shadow-sm px-3 py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-2"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div>
                <button class="button" type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
        <div v-if="$store.state.error">
          <div class="text-red-500">{{ $store.state.error }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { login, loggedIn, fillArray } from '../api'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
export default {
  data() {
    return {
      name: '',
      password: '',
    }
  },
  methods: {
    submit() {
      console.log(this.name)
      console.log(this.password)
      login(this.name, this.password)
        .then(() => console.log('push'))
        .then(() => this.$router.push('/'))
    },
  },
}
</script>

<style>
.home {
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

header {
  min-height: 120px;
  background: #3c7a1f;
}
</style>
