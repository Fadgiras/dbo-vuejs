<template>
  <div class="home">
    <header class="sticky top-0"></header>
    <main>
      <div class="text-3xl pb-16 m-8">Stats de ventes</div>
      <div class="hidden">{{ sumByDay }} €</div>
      <div class="max-w-[50%]">
        <VueApexCharts
          type="area"
          height="350"
          ref="chart"
          :options="sumByDay.chartOptions"
          :series="sumByDay.series"
        ></VueApexCharts>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import VueApexCharts from 'vue3-apexcharts'
import store from '@/store'

export default defineComponent({
  name: 'StatsView',
  components: {
    VueApexCharts,
  },
  computed: {
    sumOut() {
      let sumOut = 0
      for (let index = 0; index < store.state.data.length; index++) {
        // console.log(new Date(store.state.data[index].date).toLocaleDateString())
        if (store.state.data[index].type == 'OUT')
          sumOut += store.state.data[index].price
      }
      return sumOut
    },
    sumByDay() {
      let out: number[] = []
      let expense : number[] = []
      let label: number | Date | string[] = []
      let mainData = store.state.data

      for (let index = 0; index < mainData.length; index++) {
        let date = new Date(mainData[index].date)
        let localeDate = date.toLocaleDateString()
        if (label.includes(localeDate)) {
          //if amount is sell
          if(mainData[index].type== "OUT"){

          }

          out[label.indexOf(localeDate)] += mainData[index].price
        } else {
          label.push(localeDate)
          out.push(mainData[index].price)
        }
      }
      console.log(label.length == out.length)

      // this.$data.chartOptions.xaxis.categories= label
      // this.$data.series[0].data= out

      return {
        chartOptions: {
          chart: {
            id: 'vuechart-example',
          },
          xaxis: {
            categories: label,
          },
        },
        series: [
          {
            name: 'ventes',
            data: out,
          },
        ],
      }
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
