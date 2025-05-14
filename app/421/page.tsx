"use client";

import { useState } from "react";

export default function Page() {
  const [values, setValues] = useState([1, 2, 3]);

  const rollDie = (index: number) => {
    const newValues = [...values];
    newValues[index] = Math.floor(Math.random() * 6) + 1;
    setValues(newValues);
  };

  const rollAllDice = () => {
    setValues(values.map(() => Math.floor(Math.random() * 6) + 1));
  };

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-[#0F0F0F] space-y-8 deg">
      <div className="flex space-x-6">
        {values.map((value, index) => (
          <div
            key={index}
            onClick={() => rollDie(index)}
            className="w-24 h-24 bg-white text-black flex items-center justify-center text-4xl font-bold rounded cursor-pointer hover:scale-105 transition"
          >
            {value}
          </div>
        ))}
      </div>
      <button
        onClick={rollAllDice}
        className="mt-8 px-6 py-3 bg-white text-black text-lg font-semibold rounded hover:bg-gray-200 transition"
      >
        Lancer tous les dés
      </button>
    </div>
  );
}
