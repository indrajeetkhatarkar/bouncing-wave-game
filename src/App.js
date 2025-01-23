import React, { useState, useEffect } from "react";
import "./App.css";

// Grid size
const gridRows = 15;
const gridColumns = 20;

// Colors to be used in the wave effect
const colors = ["#00ff00", "#ff0000", "#0000ff", "#ff1493", "#800080", "#00ffff"];

const App = () => {
  const [grid, setGrid] = useState([]);

  // Initialize grid with black squares
  const initializeGrid = () => {
    const initialGrid = Array(gridRows)
      .fill()
      .map(() => Array(gridColumns).fill("#000"));
    setGrid(initialGrid);
  };

  // Function to move the wave from left to right and change colors
  const moveWave = () => {
    const newGrid = grid.map((row) => [...row]); // Make a copy of the current grid

    // Select a random row for the wave
    const waveRow = Math.floor(Math.random() * gridRows);

    // Move wave from left to right, changing colors randomly
    for (let col = 0; col < gridColumns; col++) {
      newGrid[waveRow][col] = colors[Math.floor(Math.random() * colors.length)];
    }

    setGrid(newGrid); // Update the grid with the new wave
  };

  // Run the moveWave function at regular intervals to simulate the wave effect
  useEffect(() => {
    initializeGrid(); // Initialize grid with black squares

    // Interval to move wave and change colors every 300ms
    const interval = setInterval(() => {
      moveWave(); // Move wave
    }, 300);

    return () => clearInterval(interval); // Clean up interval when component unmounts
  }, []);

  return (
    <div className="game-container">
      <div className="grid-container">
        {grid.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="grid-box"
              style={{
                backgroundColor: color, // Set the color for each square
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
