// pages/index.tsx or pages/page.tsx depending on your routing setup
'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import queryData from "../generate-answer";
import getDocument from "../../../firebase/getData";
import updateData from "../../../firebase/updateData";
import { getAuth, onAuthStateChanged } from "firebase/auth";


// import settingsIcon from "path-to-your-settings-icon.svg"; // Make sure to import your settings icon correctly

<<<<<<< HEAD
const allergens =  ["Milk"]
// const temp = getFoodOptions("01-17-2024", "Lunch", "Earhart", allergens);
=======
  const query = queryData(`Height: 4 ft 8 in
    Gender: Female
    Weight: 96 lbs
    Age: 18
    Number of times of exercise per week: 2
    
    Given the list of items offered at a dining court and my body description, 
    generate a meal that would be healthy based on the ingredients and nutrition facts 
    on given data for each item to fulfill protein, carbohydrates, and fat - ${JSON.stringify(totalNutritionsList)}. 
    Return the list of items in the form of a numbered list formatted as: X. Item Name - X Total Calories, X Protein, X Total Fat, X Total Carbohydrates`)
  console.log((await query).choices[0].message.content)

  //return temp
  //return totalNutritionsList
}

const allergens = ["Milk"]
const temp = getFoodOptions("01-17-2024", "Lunch", "Earhart", allergens);
>>>>>>> 39adaa01b149b3da3eb97e3aa909fef21516409b
// const temp2 = getFoodOptions()
//console.log(temp)



const HomePage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activeDiningCourt, setActiveDiningCourt] = useState("");
  const [output, setOutput] = useState("");
  const [outputContent, setOutputContent] = useState("");

<<<<<<< HEAD

  const diningCourts = ["Wiley", "Earhart", "Hillenbrand", "Cary", "Windsor"];
  const allergens = ["Milk"];


  const router = useRouter();

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
  
      getFoodNutritionFacts(itemIds, date, time, location, allergensList);
    } catch (error) {
      console.error("Error fetching food options:", error);
    }
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const { result, error } = await getDocument("users", user.uid);
          if (error) {
            console.log("error retrieving user data:", error);
            // Handle the error appropriately
          } else if (result?.exists()) {
            console.log("document values", result.data());
            // Process the document data as needed
          } else {
            console.log("No such document!");
            // Handle the case where the document does not exist
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
        }
      } else {
        console.log("User is not signed in!");
        router.push("/signin");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);
=======
  const router = useRouter();

  const diningCourts = ["Wiley", "Earhart", "Hillenbrand", "Cary", "Windsor"];
>>>>>>> 39adaa01b149b3da3eb97e3aa909fef21516409b

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date || !time || !activeDiningCourt) {
      console.log("Please fill in all fields.");
      return;
    }

    // Call getFoodOptions with the state variables
    console.log("sol is ", date, time, activeDiningCourt, allergens);
    await getFoodOptions(date, time, activeDiningCourt, allergens);
  };


  const getFoodNutritionFacts = async (itemIds: any, date: string, time: string, location: string, allergensList: string[]) => {
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
    Return the list of items in the form of a numbered list format: X. Item Name - X Total Calories, X Protein, X Total Fat, X Total Carbohydrates`)
  console.log((await query).choices[0].message.content)
  // document.getElementById("output1")?.setContent((await query).choices[0].message.content);
  const response = await query; // Await the query response
  if(!response.choices[0].message.content) {
    return
  }
  setOutputContent(response.choices[0].message.content);
  if(document.getElementById == null) {
    return;
  }
    document.getElementById("output1")?.textContent(response.choices[0].message.content);
  //return temp
  //return totalNutritionsList
}
  
  
  return (
    <div className="container mx-auto p-4 bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center pb-3">
        <h1 className="text-2xl font-bold dark:text-white">Greetings!</h1>
        <button>
          {/* <Image src={settingsIcon} alt="Settings" width={24} height={24} /> */}
        </button>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>


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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <form onSubmit={handleSubmit}>
        <div className="max-w-fit">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            onChange={(e) => {
              // Allow only digits and automatically add dashes
              const value = e.target.value.replace(
                // Regex to allow digits and specific format
                /^(\d{0,2})-?(\d{0,2})-?(\d{0,4}).*/,
                (match, p1, p2, p3) => {
                  // Construct the date string using groups captured by the regex
                  return `${p1}${p2 ? "-" + p2 : ""}${p3 ? "-" + p3 : ""}`;
                }
              );
              // Update state only if the change matches the desired pattern
              if (/^\d{0,2}-?\d{0,2}-?\d{0,4}$/.test(value)) {
                setDate(value);
              }
            }}
            value={date}
            required
            type="text"
            name="date"
            id="date"
            placeholder="mm-dd-yyyy"
            maxLength={10} // Limit the length to match the format mm-dd-yyyy
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-gray-50 mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto max-w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled selected>
              Choose a time
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Late Lunch">Late Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          
        </div>

        <div className="flex justify-center pt-4">
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Get Food Options
          </button>
        </div>
      </form>
      </div>

      <div className="output-field my-4 p-4 border border-gray-300 rounded">
        {/* Placeholder for dynamic output */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dummy output fields */}
        <div id="output1" className="p-4 border border-gray-300 rounded">Output 1</div>
      </div>
    </div>  );
};

export default HomePage;
