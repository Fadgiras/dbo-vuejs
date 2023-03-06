<template>
  <div class="home">
    <header></header>
    <main>
      <div class="grid grid-cols-3 gap-4 m-8">
        <div
          v-if="fish"
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
        </div>
        <div v-else>No fish found</div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import store from '../store'

export default defineComponent({
  name: 'ProductView',
  components: {},
  computed: {
    fish() {
      const store = useStore()
      const id = Number(this.$route.params.id)
      const fish = store.state.fishArray.find(
        (fish: { id: number }) => fish.id === id
      )
      return fish || {}
    },
  },
})
</script>

<style>
.home {
}
header {
  top: 0;
  position: sticky;
  min-height: 120px;
  background: #3c7a1f;
}
main {
  overflow-y: hidden;
  font-size: 20px;
}
</style>
