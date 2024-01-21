"use client";
import React, { useState } from "react";

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

  const allergenToggled = (allergen: string) => {
    return allergens.includes(allergen);
  };

  return (
    <div className="w-[40%] mx-auto">
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
                {allergen}
              </label>
              <input
                type="checkbox"
                id={allergen}
                className="hidden"
                checked={allergenToggled(allergen)}
                onChange={() => toggleAllergen(allergen)}
              />
            </button>
          ))}
        </div>
      </div>

      {/* <div>
        <div className="space-y-100 pt-6 p-4 px-5 py-3">
          <p>Food Preferences</p>
        </div>
        <div className="space-y-4 space-x-6 p-4 px-5 py-3">
          <button>
            <input type="checkbox" id="Vegetarian" className="hidden peer" />
            <label htmlFor="Vegetarian" className="cursor-pointer text-white bg-indigo-400 px-5 py-2.5 peer-checked:bg-red-500">
              Vegetarian
            </label>
          </button>

          <button>
            <input type="checkbox" id="Non-Vegetarian" className="hidden peer" />
            <label htmlFor="Non-Vegetarian" className="cursor-pointer text-white bg-indigo-400 px-5 py-2.5 peer-checked:bg-red-500">
              Non-Vegetarian
            </label>
          </button>
        </div>
      </div> */}
    </div>
  );
}
