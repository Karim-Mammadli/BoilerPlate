/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import getFoodOptions from "../../api/page";
import { getFoodNutritionFacts } from "../../api/page";
import React from "react";

export default function Home() {
  const allergens = ["Milk"]
  const options = getFoodOptions("01-19-2024", "Breakfast", "Ford", allergens)
  //ßconst nutritionFacts = getFoodNutritionFacts("6c883ba0-e283-4086-ab01-e181a6615435")
  
  return (
    <div>
      HELLO
    </div>
  );
}
