import Image from "next/image";

export default function Home() {
  return (
    <div>
        <p className="text-2xl hover:text-base"> Tell us more about yourself </p>
        <div>
      <p>Allergens</p>
      <div className="space-y-4 space-x-6">
        <button>
          <input type="checkbox" id="Login22" className="hidden peer" />
          <label htmlFor="Login22" className="cursor-pointer text-white bg-indigo-400 px-5 py-2.5 peer-checked:bg-red-500">
            Login22
          </label>
        </button>
        
        <button>
          <input type="checkbox" id="Login23" className="hidden peer" />
          <label htmlFor="Login23" className="cursor-pointer text-white bg-indigo-400 px-5 py-2.5 peer-checked:bg-red-500">
            Login23
          </label>
        </button>
      </div>

      <div className="space-y-4 space-x-6">
        <button>
          <input type="checkbox" id="Login24" className="hidden peer" />
          <label htmlFor="Login24" className="cursor-pointer text-white bg-indigo-400 px-5 py-2.5 peer-checked:bg-red-500">
            Login24
          </label>
        </button>
        
        <button>
          <input type="checkbox" id="Login25" className="hidden peer" />
          <label htmlFor="Login25" className="cursor-pointer text-white bg-indigo-400 px-5 py-2.5 peer-checked:bg-red-500">
            Login25
          </label>
        </button>
      </div>
</div>
<div>
<div className="space-y-100 pt-6">
<p>Food Preferences</p>
</div>
      <div className="space-y-4 space-x-6">
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
</div>
    </div>
  );
}
