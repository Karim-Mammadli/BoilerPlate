// pages/index.tsx or pages/page.tsx depending on your routing setup
'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import queryData from "../generate-answer";

// import settingsIcon from "path-to-your-settings-icon.svg"; // Make sure to import your settings icon correctly
async function getFoodOptions(
  date: string,
  time: string,
  location: string,
  allergensList: string[]
) {
  try {
    const url = `
    https://damp-caverns-90178-896e73de335a.herokuapp.com/http://api.hfs.purdue.edu/menus/v2/locations/${location}/${date}`;
    const response = await axios.get(url);
    const meals = response.data.Meals;

    const itemIds = meals
      .filter((meal: any) => meal.Type === time)
      .flatMap((meal: any) => meal.Stations)
      .flatMap((station: any) => station.Items)
      .filter((item: any) => {
        const allergens = item.Allergens || [];
        return allergens.every((allergen: any) =>
          allergensList.includes(allergen.Name) ? !allergen.Value : true
        );
      })
      .map((item: any) => item.ID);

    getFoodNutritionFacts(itemIds);
  } catch (error) {
    console.error("Error fetching food options:", error);
  }
}

async function getFoodNutritionFacts(itemIds: any) {
  const itemList: any[] = [];
  const totalNutritionsList: any[] = [];
  try {
    const nutritionData = await Promise.all(
      itemIds.map(async (id: any) => {
        const url = `https://api.hfs.purdue.edu/menus/v2/items/${id}`;
        const response = await axios.get(url);

        return response.data;
      })
    );
    await itemList.push(nutritionData);
  } catch (error) {
    console.error("Error fetching nutrition facts:", error);
  }
  itemList[0].map((item: any) => {
    const temp = {
      Name: item.Name,
      ID: item.ID,
      Nutritions: item.Nutrition,
      Ingredients: item.Ingredients,
    };
    totalNutritionsList.push(temp);
  });
  console.log(totalNutritionsList)

  const query = queryData(`Height: 5 ft 1 in
  Gender: Male
  Weight: 120 lbs
  Age: 20
  Number of times of exercise per week: 3
  
  Given the list of items offered at a dining court above and my body description, 
  generate a meal that would be healthy based on the ingredients and nutrition facts 
  on given data for each item to fulfill protein, carbohydrates, and fat - ${JSON.stringify(totalNutritionsList)}. 
  Return the list of items in the form of JSON matching the format of the data I provided.`)
  console.log((await query).choices[0].message.content)
  //return temp
  //return totalNutritionsList
}

const allergens =  ["Milk"]
const temp = getFoodOptions("01-17-2024", "Lunch", "Earhart", allergens);
//console.log(temp)

const HomePage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activeDiningCourt, setActiveDiningCourt] = useState("");

  const diningCourts = ["Wiley", "Earhart", "Hillenbrand", "Cary", "Windsor"];
  const allergens = ["Milk"];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Greetings, Name!</h1>
        <button>
        </button>
      </div>

      <div className="flex space-x-2 overflow-x-auto py-4">
        {diningCourts.map((court) => (
          <button
            key={court}
            onClick={() => setActiveDiningCourt(court)}
            className={`rounded-full px-4 py-1 ${
              activeDiningCourt === court
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {court}
          </button>
        ))}
      </div>
      
      {/* Drop down for date of foods */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="mm-dd-yyyy"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />

        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" disabled selected>
            Choose a time
          </option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Late Lunch">Late Lunch</option>
        </select>
      </div>

      <div className="output-field my-4 p-4 border border-gray-300 rounded">
        {/* Placeholder for dynamic output */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dummy output fields */}
        <div className="p-4 border border-gray-300 rounded">Output 1</div>
        <div className="p-4 border border-gray-300 rounded">Output 2</div>
        <div className="p-4 border border-gray-300 rounded">Output 3</div>
      </div>
    </div>
  );
};

export default HomePage;
