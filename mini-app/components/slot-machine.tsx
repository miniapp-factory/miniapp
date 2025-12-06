"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";
import apple from "@/public/apple.png";
import banana from "@/public/banana.png";
import cherry from "@/public/cherry.png";
import lemon from "@/public/lemon.png";

const fruits = ["apple", "banana", "cherry", "lemon"] as const;
type Fruit = typeof fruits[number];

const fruitImages: Record<Fruit, string> = {
  apple,
  banana,
  cherry,
  lemon,
};

export default function SlotMachine() {
  const [grid, setGrid] = useState<Fruit[][]>(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => fruits[Math.floor(Math.random() * fruits.length)])
    )
  );
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const interval = setInterval(() => {
      setGrid((prev) => {
        const newRow = Array.from({ length: 3 }, () =>
          fruits[Math.floor(Math.random() * fruits.length)]
        );
        const newGrid = [...prev.slice(1), newRow];
        return newGrid;
      });
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
    }, 2000);
  };

  // Check win condition directly in render
  const win =
    (!spinning &&
      ((grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) ||
        (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) ||
        (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) ||
        (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) ||
        (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) ||
        (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]))) ||
    false;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.flat().map((fruit, idx) => (
          <div key={idx} className="w-16 h-16 flex items-center justify-center">
            <img src={fruitImages[fruit]} alt={fruit} className="w-12 h-12" />
          </div>
        ))}
      </div>
      <Button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </Button>
      {win && (
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold">Congratulations! You won!</h2>
          <Share text={`I won a slot machine! ${url}`} />
        </div>
      )}
    </div>
  );
}
