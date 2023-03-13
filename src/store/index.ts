import { createStore } from 'vuex'

// Define the Fish class
class Fish {
  id: number
  name: string
  category: number
  price: number
  unit: string
  availability: boolean
  sale: boolean
  discount: number
  comments: string
  owner: string
  static id: (
    this: void,
    value: never, // Define the Fish class
    index: number,
    obj: never[]
  ) => value is never
  constructor(
    id: number,
    name: string,
    category: number,
    price: number,
    unit: string,
    availability: boolean,
    sale: boolean,
    discount: number,
    comments: string,
    owner: string
  ) {
    this.id = id
    this.name = name
    this.category = category
    this.price = price
    this.unit = unit
    this.availability = availability
    this.sale = sale
    this.discount = discount
    this.comments = comments
    this.owner = owner
  }
}

const store = createStore({
  state: {
    fishArray: [Fish],
  },
  getters: {
    getFishById:
      state =>
      (
        id: (
          this: void,
          value: never,
          index: number,
          obj: never[]
        ) => value is never
      ) => {
        return state.fishArray.find(fish => fish.id === id)
      },
  },
  //TODO toucher aux mutations pour changer le states
  mutations: {
    loadAllFish(state, fishArray) {
      state.fishArray = fishArray
      console.log(state.fishArray)
    },
    updateFish(state, selectedfish) {
      console.log(selectedfish)
      const index = state.fishArray.findIndex(
        fish => fish.id === selectedfish.id
      )
      state.fishArray[index] = selectedfish
      console.log(state.fishArray[index])
    },
    deleteFish(state, selectedfish) {
      const index = state.fishArray.findIndex(
        fish => fish.id === selectedfish.id
      )
      state.fishArray.splice(index, 1)
    },
  },
  actions: {},
  modules: {},
})

fetch('http://127.0.0.1:8000/products/?format=json', {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
})
  .then(response => response.json())
  .then(data => {
    // Create array of Fish objects using constructor
    store.commit(
      'loadAllFish',
      data.map(
        (fishData: {
          id: number
          name: string
          category: number
          price: number
          unit: string
          availability: boolean
          sale: boolean
          discount: number
          comments: string
          owner: string
        }) =>
          new Fish(
            fishData.id,
            fishData.name,
            fishData.category,
            fishData.price,
            fishData.unit,
            fishData.availability,
            fishData.sale,
            fishData.discount,
            fishData.comments,
            fishData.owner
          )
      )
    )
  })
  .then(() => console.log('blep'))
  .catch(error => console.error(error))

export default store
