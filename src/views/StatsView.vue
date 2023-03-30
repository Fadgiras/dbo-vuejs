<template>
  <main class="grow">
    <div class="text-3xl m-8 header">Stats de ventes :</div>
    <div class="m-8">
      <div class="flex">
        <div class="text-xl mr-5 input bg-greyd">Total des ventes :</div>
        <div class="text-xl input">{{ sumOut }} €</div>
      </div>
      <div class="flex">
        <div class="text-xl mr-5 input bg-greyd">Total des achats :</div>
        <div class="text-xl input">{{ sumIn }} €</div>
      </div>
      <div class="flex">
        <div class="text-xl mr-5 input bg-greyd">Chiffre d'affaire total :</div>
        <div class="text-xl input">{{ sumIn + sumOut }} €</div>
      </div>
    </div>
    <div class="m-8">
      <div class="text-2xl pt-5 input bg-greyd">Ventes et achats par jour :</div>
    </div>
    <div class="max-w-16">
      <VueApexCharts type="area" height="350" ref="chart" :options="sumByDay.chartOptions" :series="sumByDay.series">
      </VueApexCharts>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import store from '@/store'
import { loggedIn } from '@/api'

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
    sumIn() {
      let sumIn = 0
      for (let index = 0; index < store.state.data.length; index++) {
        // console.log(new Date(store.state.data[index].date).toLocaleDateString())
        if (store.state.data[index].type == 'IN')
          sumIn += store.state.data[index].price
      }
      return sumIn
    },
    sumByDay() {
      let out: number[] = []
      let expense: number[] = []
      let label: string[] = []
      let mainData = store.state.data

      mainData = mainData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )

      // console.log(mainData.length)

      for (let index = 0; index < mainData.length; index++) {
        // console.log(index)

        let date = new Date(mainData[index].date)
        // console.log(date)

        let localeDate = date.toLocaleDateString()
        if (label.includes(localeDate)) {
          // console.log('include')

          //if amount is sell
          if (mainData[index].type == 'OUT') {
            out[label.indexOf(localeDate)] += mainData[index].price
            expense[label.indexOf(localeDate)] += 0
          } else {
            expense[label.indexOf(localeDate)] += mainData[index].price
            out[label.indexOf(localeDate)] += 0
          }
        } else {
          // console.log('else include')

          label.push(localeDate)
          if (mainData[index].type == 'OUT') {
            out.push(mainData[index].price)
            expense.push(0)
          } else {
            expense.push(mainData[index].price)
            out.push(0)
          }
        }
        // console.log(label.length == out.length)

        // this.$data.chartOptions.xaxis.categories= label
        // this.$data.series[0].data= out
      }
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
          {
            name: 'achats',
            data: expense,
          },
        ],
      }
    },
    sumAmountByProdStack() {
      let mainData = store.state.data
      let tab: number[][] = []
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
