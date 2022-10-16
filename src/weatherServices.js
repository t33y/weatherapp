
const makeIconURL = (iconID) => `https://openweathermap.org/img/wn/${iconID}@2x.png`


const getFormattedWeatherData = async (city, units="metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=${units}`
    
    const data = await fetch(URL)
    .then((res)=>res.json())
    
    const {
        weather, 
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
        wind: {speed},
        sys: {country},
        name,
    } = data;

    const {description, icon } = weather[0];
    
    const addUnits = (data) =>{
        let unitData
       switch(data){
           case temp:
           case temp_min:
           case temp_max:
           case feels_like:
            if(units === "metric"){
               unitData = `${data.toFixed(0)}°C`;
            } else{unitData = `${data.toFixed(0)}°F` }
            return unitData;

           case speed:
            if(units === "metric"){
               unitData = `${data.toFixed(0)} m/s`;
            } else{unitData = `${data.toFixed(0)} m/h` }
            return unitData;

           case humidity:
                unitData = `${data.toFixed(0)} %`
                return unitData;

           case pressure:
                unitData = `${data.toFixed(0)} hpa`;
                return unitData;

            default: return data
       }
    }

    return{
        description,
        iconURL: makeIconURL(icon),
        tempUnit: addUnits(temp),
        feels_likeUnit: addUnits(feels_like),
        temp_minUnit: addUnits(temp_min),
        temp_maxUnit: addUnits(temp_max),
        pressureUnit: addUnits(pressure),
        humidityUnit: addUnits(humidity),
        speedUnit: addUnits(speed),
        temp,
        country,
        name,
    };

}

export {getFormattedWeatherData};