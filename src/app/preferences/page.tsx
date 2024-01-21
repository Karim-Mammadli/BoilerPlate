"use client";
import Image from "next/image";
import React, { useState } from "react";
import updateData from "../../../firebase/updateData";
import firebase from "../../../node_modules/firebase/app";
import { getAuth } from "firebase/auth";


const ALL_ALLERGENS = [
  "Eggs",
  "Peanuts",
  "Gluten",
  "Milk",
  "Sesame",
  "Fish",
  "Tree Nuts",
  "Wheat",
  "Coconut",
  "ShellFish",
];

export default function Home() {
  const [allergens, setAllergens] = useState<string[]>([]);

  const toggleAllergen = (allergen: string) => {
    if (allergenToggled(allergen)) {
      setAllergens((prev) => prev.filter((a) => a !== allergen));
    } else {
      setAllergens((prev) => [...prev, allergen]);
    }
  };

  // This checks if the allergen is already selected
  const allergenToggled = (allergen: string) => {
    return allergens.includes(allergen);
  };

  // This handles the submit button
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit action
    const userData = { allergens }; // Prepare the data in the format expected by Firebase

    // get the current user
    const user = getAuth().currentUser;

    if (user) {
      const { resultUpdate, errorUpdate } = await updateData('userCollection', user.uid, userData);
      
      if (errorUpdate) {
        console.error("Error updating data: ", errorUpdate);
      } else {
        console.log("Data updated successfully: ", resultUpdate);
      }
    } else {
      console.error("No user is signed in.");
    }


  };


  return (
    <form onSubmit={handleSubmit} className="w-[90%] mx-auto">

      <p className="text-2xl hover:text-base">Tell us more about yourself</p>
      <div>
        <p>Allergens</p>
        <div className="grid grid-cols-3 gap-x-2 gap-y-3">
          {ALL_ALLERGENS.map((allergen) => (
            <button
              key={allergen}
              className=" border-solid border-2 border-indigo-200 rounded-lg has-[:checked]:bg-indigo-400 has-[:checked]:border-indigo-400 hover:bg-indigo-200 transition duration-200"
            >
              <label
                htmlFor={allergen}
                className="w-full h-full inline-block cursor-pointer px-5 py-2.5"
              >
                <input
                type="checkbox"
                id={allergen}
                className="hidden"
                checked={allergenToggled(allergen)}
                onChange={() => toggleAllergen(allergen)}
              />

                {allergen}
              </label>
              
            </button>
          ))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
        </div>
      </div>
    </form>
  );
}
