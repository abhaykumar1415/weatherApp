import './App.css';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import API from './services/api.js';

function App() {
  const [city, setCity] = useState(["Pune", "Mumbai"])

  const [searchKey, setSearchKey] = useState("");
  const [response, setResponse] = useState({})
  const [cityName, setCityName] = useState("")

  const handleChange = (city) => {
    API.getData(city).then(data => setResponse(data));
  };

  const removeCity = (cityname) => {
    console.log("remove city", cityname)
    const newCityList = [...city];
    const newFilter = newCityList.filter(item => {
      return item !== cityname
    })
    setCity(newFilter);
  };
  const handleTextChange = (event) => {
    setCityName(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchKey(event.target.value?.toLowerCase());
  }
  const handleSubmit = (event) => {
    const newCityList = [...city];
    newCityList.push(cityName)
    setCity(newCityList);
    setCityName("")
  }

  return (
    <div className="App" style={{ margin: "10px" }} >
      <div className='flex'>
        <TextField value={cityName} onChange={handleTextChange} id="outlined-basic" label="Add a new city" variant="outlined" />
        <Button onClick={handleSubmit} variant="outlined" style={{ margin: "10px" }}>Submit</Button>
        
      </div>
      <Divider variant="middle" />
      <div className='data-wrapper margin-top'>
      <TextField onChange={handleSearchChange} id="outlined-basic" label="Search city" variant="outlined" />
        {
          city.map((item, index) => {
            return item.toLowerCase().includes(searchKey) && <div className='city-wrapper cursor-pointer' value={item} key={index}>
              <div onClick={() => {
                handleChange(item)
              }} style={{ width: "100px" }}>{item}</div>
              <div className='cursor-pointer' onClick={() => {
                removeCity(item)
              }}>X</div></div>

          })
        }
      </div>
      <div className='onePx-border-red'>{response?.weather?.length ? response?.weather[0]?.description : ""}</div>
    </div >
  );
}

export default App;
