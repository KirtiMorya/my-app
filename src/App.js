import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
function App() {
  const apiKey="20c0d87e614ce2be40b34a72c6dd3ed6";
  const [inputCity,setInputCity]=useState("")
  const [data,setData]=useState({});
  const getWeatherDetails=(cityName)=>{
    if(!cityName){
      return;
    }
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey;
    axios.get(apiUrl).then((res) => {
      console.log("response",res.data)
      setData(res.data)
    }).catch((err)=>{
       console.log("err",err);
    })
  }
  const handleChangeInput=(e)=>{
  setInputCity(e.target.value)
  }
  const handleSearch=()=>{
    getWeatherDetails(inputCity)
  }
  useEffect(()=>{
    getWeatherDetails("delhi");
  },[])
  return (
    <div className="col-md-12">
      <div className="weatherBG">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
        <input type="text" className="form-control" 
        value={inputCity} onChange={handleChangeInput}/>
        <button className="btn btn-primary"type="button"
        onClick={handleSearch}
        >Search</button>
        </div>
      </div>
      <div className="col-md-12 text center mt-5">
        <div className="shadow rounded weatherResultBox">
          <img className="weatherIcon"
          src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"/>
          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTemp">{((data?.main?.temp)-273.15).toFixed(2)}°C</h6>
        </div>
      </div>
    </div>
  );
}

export default App;
