import axios from "axios";

export default async function getFoodOptions(
  date,
  time,
  location,
  allergensList
) {
  try {
    const url = `http://api.hfs.purdue.edu/menus/v2/locations/${location}/${date}`;
    const response = await axios.get(url);
    const meals = response.data.Meals;

    const itemIds = meals
      .filter((meal) => meal.Type === time)
      .flatMap((meal) => meal.Stations)
      .flatMap((station) => station.Items)
      .filter((item) => {
        const allergens = item.Allergens || [];
        return allergens.every((allergen) =>
          allergensList.includes(allergen.Name) ? !allergen.Value : true
        );
      })
      .map((item) => item.ID);

    //console.log(itemIds);
    await getFoodNutritionFacts(itemIds);
  } catch (error) {
    console.error("Error fetching food options:", error);
  }
}

async function getFoodNutritionFacts(itemIds) {
  const nutrients = ["Total Carbohydrate", "Total fat", "Calories", "Protein"];
  const itemList: any[] = [];
  const totalNutritionsList: any[] = [];
  try {
    const nutritionData = await Promise.all(
      itemIds.map(async (id) => {
        const url = `https://api.hfs.purdue.edu/menus/v2/items/${id}`;
        const response = await axios.get(url);

        return response.data;
      })
    );
    itemList.push(nutritionData);
  } catch (error) {
    console.error("Error fetching nutrition facts:", error);
  }
  //console.log(itemList);
  itemList[0].map((item) => {
    const temp = {
      Name: item.Name,
      ID: item.ID,
      Nutritions: item.Nutrition,
      Ingredients: item.Ingredients,
    };
    totalNutritionsList.push(temp);
  });
  //console.log(totalNutritionsList);
}
