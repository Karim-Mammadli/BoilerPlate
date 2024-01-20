import axios from 'axios';

export default async function getFoodOptions(date: string, time: string, location: string) {
    const url = `http://api.hfs.purdue.edu/menus/v2/locations/${location}/${date}`;
    // https://api.hfs.purdue.edu/menus/v2/items/<INSERT_ITEM HERE>
    axios.get(url)
      .then(
        res => {
            const menus = res.data.Meals
            //menus.map((menu: any) => console.log(menu))

            if (res.data.Meals.Type == time) {
              
            }

            console.log(res.data.Meals[0].Stations[0].Items[0])
            return res.data.Meals
        }
      )
}

export async function getFoodNutritionFacts(itemId: string) {
  const url = `https://api.hfs.purdue.edu/menus/v2/items/${itemId}`

  axios.get(url)
    .then(
      res => {
        const allergens = res.data.Allergens
        const Nutrition = res.data.Nutrition
          console.log(res.data.Nutrition)
          return res.data
      }
    )
}