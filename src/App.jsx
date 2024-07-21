import { useState,useCallback, useEffect } from "react"
import "./App.css";
import { useRef } from "react";


function App() {
  const rows = 30
  const cols = 30

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = ()=>{
    if (!runningRef.current){
          return;
      }
    setGrid((g)=>{
      const next = g.map((row,i)=>{
        return row.map((cell,j)=>{
          let sum = 0
          positions.forEach((position)=>{
            const x = i + position[0]
            const y = j + position[1]
            if (x>= 0 && x <rows && y>=0 && y<cols){
              sum += g[x][y]
            }
          })
          if (sum<2 || sum>3){
            return 0 
          }
          if (sum === 3){
            return 1
          }
          return g[i][j]
        })
      })
      return next
    })
  }
  

  const randomGrid = ()=>{
    const grid = []
    for (let i = 0 ; i<rows ; i++){
      const row = []
      for(let j = 0 ; j<cols ; j++){
        row.push(Math.floor(Math.random() * 2))
      }
      grid.push(row)
    }
    return grid
  }

  const positions = [
    [0,-1],
    [0,1],
    [-1,-1],
    [-1,1],
    [-1,0],
    [1,-1],
    [1,1],
    [1,0],
  ]

  
  const [grid,setGrid] = useState();

useEffect(()=>{
  setGrid(randomGrid())
},[])

const handleStartStop = () => {
  if (running) {
    clearInterval(runningRef.current);
  } else {
    runningRef.current = setInterval(runSimulation, 1000);
  }
  setRunning(!running);
};



  return (
    <>
    <div className="field">
    {grid && grid.map((rows, i) =>
        rows.map((col, j) => (
          <div
          key={j}
          className={grid[i][j] ? 'alive' : 'dead'}
          onClick={() => {
            let newGrid = JSON.parse(JSON.stringify(grid));
            newGrid[i][j] = grid[i][j] ? 0 : 1;
            setGrid(newGrid);
          }}
          />
        ))
      )}
      <button className="button" 
      value={running? "STOP":"START"}
      onClick={handleStartStop} >{running?"STOP":"START"}</button>
      
      <button className="random" onClick={()=>{
        setGrid(randomGrid())
        }} >RANDOM</button>

        <button className="speed" onClick={()=>{
        setInterval(()=>{
          runSimulation(grid);
        },1000)
        }} >SPEED</button>
      </div>
    </>
  )
}

export default App
