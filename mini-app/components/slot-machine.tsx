"use client";

import { useState, useEffect } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const fruits = ["apple", "banana", "cherry", "lemon"] as const;
type Fruit = typeof fruits[number];

function getRandomFruit(): Fruit {
  return fruits[Math.floor(Math.random() * fruits.length)];
}

export default function SlotMachine() {
  const [grid, setGrid] = useState<Fruit[][]>(Array.from({ length: 3 }, () => Array.from({ length: 3 }, getRandomFruit)));
  const [spinning, setSpinning] = useState(false);
  const [winMessage, setWinMessage] = useState<string | null>(null);

  useEffect(() => {
    // Initialize grid with random fruits on mount
    setGrid(Array.from({ length: 3 }, () => Array.from({ length: 3 }, getRandomFruit)));
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinMessage(null);
    const interval = setInterval(() => {
      setGrid(prev => {
        const newGrid = prev.map(col => [getRandomFruit(), ...col.slice(0, 2)]);
        return newGrid;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
      // Check win condition
      const allRows = grid.map(row => row.every(f => f === row[0]));
      const allCols = grid[0].map((_, i) => grid.every(row => row[i] === grid[0][i]));
      if (allRows.some(v => v) || allCols.some(v => v)) {
        setWinMessage("You win!");
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.map((col, colIdx) =>
          col.map((fruit, rowIdx) => (
            <img
              key={`${colIdx}-${rowIdx}`}
              src={`/${fruit}.png`}
              alt={fruit}
              width={64}
              height={64}
              className="border rounded"
            />
          ))
        )}
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {winMessage && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xl font-bold">{winMessage}</span>
          <Share text={`I just ${winMessage} on the Slot Machine Mini App! ${url}`} />
        </div>
      )}
    </div>
  );
}
