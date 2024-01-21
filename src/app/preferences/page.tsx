"use client";
import React, { useState } from "react";
import updateData from "../../../firebase/updateData";
import addData from "../../../firebase/addData";
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

const VEGETERIAN = ["Yes", "No"];

export default function Home() {
  const [allergens, setAllergens] = useState<string[]>([]);
  const [vegeterian, setVegeterian] = useState("");

  const toggleAllergen = (allergen: string) => {
    if (allergenToggled(allergen)) {
      setAllergens((prev) => prev.filter((a) => a !== allergen));
    } else {
      setAllergens((prev) => [...prev, allergen]);
    }
  };

  const toggleVegeterian = (vegeterian: string) => {
    setVegeterian(vegeterian);
  };

  // This checks if the allergen is already selected
  const allergenToggled = (allergen: string) => {
    return allergens.includes(allergen);
  };

  // This checks if the vegeterian is already sellected
  const vegeterianToggled = (option: string) => {
    return vegeterian.includes(option);
  };

  // This handles the submit button
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit action
    const userData = { allergens }; // Prepare the data in the format expected by Firebase

    // get the current user
    const user = getAuth().currentUser;

    if (user) {
      console.log(user);

      const { resultUpdate, errorUpdate } = await updateData(
        "userCollection",
        user.uid,
        userData
      );

      if (errorUpdate) {
        addData("userCollection", user.uid, userData);
        console.log("User Collection Created.");
      } else {
        console.log("Data updated successfully: ", resultUpdate);
      }
    } else {
      console.error("No user is signed in.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] mx-auto">
      <br />
      <br />
      <p className="text-3xl font-extralight flex justify-center">
        Tell us more about yourself
      </p>
      <br /> <br />
      <div>
        <p className="font-sans text-lg font-extralight">Allergens</p>
        <br />
        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
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
          <br /> <br />
        </div>
        <br />
        <div>
          <br />
          <p className="font-sans text-lg font-extralight">Vegeterian?</p>
          <br />
          <div className="grid grid-cols-6 gap-x-5 gap-y-4">
            {VEGETERIAN.map((option) => (
              <button
                key={option}
                className=" border-solid border-2 border-indigo-200 rounded-lg has-[:checked]:bg-indigo-400 has-[:checked]:border-indigo-400 hover:bg-indigo-200 transition duration-200"
              >
                <label
                  htmlFor={option}
                  className="w-full h-full inline-block cursor-pointer px-5 py-2.5"
                >
                  <input
                    type="checkbox"
                    id={option}
                    className="hidden"
                    checked={vegeterianToggled(option)}
                    onChange={() => toggleVegeterian(option)}
                  />

                  {option}
                </label>
              </button>
            ))}
          </div>
        </div>
        <br /> <br />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded transition-colors hover:bg-blue-700 active:bg-blue-900"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
