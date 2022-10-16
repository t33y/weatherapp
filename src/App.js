import { useEffect, useState } from "react";
import cold from "./assets/cold.jpg"
import hot from "./assets/hot.jpg"
import Description from './components/Description';
import { getFormattedWeatherData } from "./weatherServices";

const App = ()=>{


  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("paris");
  const [units, setUnits] = useState("metric");
  
  
    
  useEffect(()=>{
    const fetchData = async()=>{;
      const weatherData = await getFormattedWeatherData(city, units);
      setWeather(weatherData);
    };
    fetchData();

  },[city, units]);

  const enterKeyPressed =(e)=> {
    console.log(e, "checking")
    if(e.key === "Enter"){
      setCity(e.target.value);
      e.currentTarget.blur();
    }
  }

  const buttonClicked = (e)=>{
    if(e.target.innerText === "°F"){
      setUnits("metric");
      e.target.innerText = "°C";
    }else{
      setUnits("imperial");
      e.target.innerText = "°F";
    }
  }
    
  const threshold = weather?.tempUnit.endsWith("C")? 25 : 75;
  
  return (
    <div className="app" style={{backgroundImage: `url(${parseInt(weather?.tempUnit) < threshold? cold:hot })`}}>

      <div className="overlay">

        {weather && (
          <div className="container">

            <div className="section section__inputs">
              <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City..."/>
              <button onClick={buttonClicked} >°C</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3> {weather.name}, {weather.country} </h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{weather.tempUnit}</h1>
              </div>
            </div>

            <Description weather ={weather} />
            
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
