<template>
  <div class="home">
    <header class="sticky top-0"></header>
    <main>
      <div v-if="fish" class="grid grid-cols-3 gap- m-8">
        <div v-if="fish" class="bloc grid grid-cols-2 p-4">
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
            <div>{{ fish.price + '€ /' + fish.unit }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="m-8 text-2xl">No fish found</div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

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
      return fish || null
    },
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
</style>
