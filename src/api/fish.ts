import { Fish } from "@/types";
import { Store } from "vuex";
import { BASE_URL } from "./config";

export async function getFish(store : Store<any>, token: string) {
    fetch(BASE_URL + 'infoproducts/?format=json', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: { Authorization: 'Bearer ' + token },
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
}