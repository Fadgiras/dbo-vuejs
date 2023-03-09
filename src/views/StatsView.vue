<template>
  <div class="home">
    <header class="sticky top-0"></header>
    <main>
      <div class="text-3xl pb-16 m-8">Stats de ventes</div>
      <div class="max-w-[50%]">
        <VueApexCharts
          type="area"
          height="350"
          ref="chart"
          :options="chartOptions"
          :series="series"
        ></VueApexCharts>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import VueApexCharts from 'vue3-apexcharts'

export default defineComponent({
  name: 'StatsView',
  components: {
    VueApexCharts,
  },
  computed: {
    fish() {
      const store = useStore()
      const id = 10
      const fish = store.state.fishArray.find(
        (fish: { id: number }) => fish.id === id
      )
      return fish
    },
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    }
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
