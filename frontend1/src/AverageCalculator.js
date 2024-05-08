import React, { useEffect, useState } from 'react'
import axios from "axios";
function AverageCalculator() {
  const [windowPrevState,setWindowPrevState]=useState([]);
  const [windowCurrState,setWindowCurrState]=useState([]);
  const [numbers,setNumbers]=useState([]);
  const [average,setAverage]=useState(null);

  useEffect(()=>{
    fetchData("p");
  },[]);

  const fetchData=async(id)=>{
    try{
        const response=await axios.get(`http://localhost:9876/numbers/${id}`);
        const data=response.data;
        setWindowPrevState(data.windowPrevState);
        setWindowCurrState(data.windowCurrState);
        setNumbers(data.numbers);
        setAverage(data.average);

    }
    catch(error){
        console.log(error);
    }

  }
  const handleButtonClick=(id)=>{
    fetchData(id);

  };

  return (
    <div>
        <button onClick={()=>handleButtonClick("p")}>Primes</button>
        <button onClick={()=>handleButtonClick("f")}>Fibonaci</button>
        <button onClick={()=>handleButtonClick("e")}>Even</button>
        <button onClick={()=>handleButtonClick("r")}>Random</button>

        <div>
            <h2>Previous state:{JSON.stringify(windowPrevState)}</h2>
            <h2>Current state:{JSON.stringify(windowCurrState)}</h2>
            <h2>Numbers:{JSON.stringify(numbers)}</h2>
            <h2>Average:{average}</h2>
        </div>
    </div>

  )
}

export default AverageCalculator