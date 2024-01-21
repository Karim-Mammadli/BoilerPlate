// pages/index.tsx or pages/page.tsx depending on your routing setup
'use client'
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// import settingsIcon from "path-to-your-settings-icon.svg"; // Make sure to import your settings icon correctly

const HomePage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activeDiningCourt, setActiveDiningCourt] = useState("");

  const diningCourts = ["Wiley", "Earhart", "Hillenbrand", "Cary", "Windsor"];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Greetings, Name!</h1>
        <button>
          {/* <Image src={settingsIcon} alt="Settings" width={24} height={24} /> */}
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
