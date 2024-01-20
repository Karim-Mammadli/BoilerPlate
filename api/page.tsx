import axios from 'axios';

export default async function getFoodOptions(date: string, time: string, location: string) {
    const url = `http://api.hfs.purdue.edu/menus/v2/locations/${location}/${date}`;

    axios.get(url)
      .then(
        res => {
            const menus = res.data.Meals
            menus.map((menu) => console.log(menu))
            return res.data.Meals
        }
      )
}