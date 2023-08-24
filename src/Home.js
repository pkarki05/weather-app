import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { clear } from "@testing-library/user-event/dist/clear";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "london",
    humidity: 10,
    speed: 2,
    image: <i class="fa-solid fa-cloud" aria-hidden="true"></i>,
  });
  const [name, setName] = useState("");
  useEffect(() => {}, []);
  const handleOnClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=eefcc3282b92858df09b443de98d798f&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main == "Clouds") {
            imagePath = <i class="fa-solid fa-cloud" aria-hidden="true"></i>;
          } else if (res.data.weather[0].main == "Clear") {
            imagePath = <i class="fa-solid fa-sun"></i>;
          } else if (res.data.weather[0].main == "Rain") {
            imagePath = <i class="fa-solid fa-cloud-rain"></i>;
          } else if (res.data.weather[0].main == "Drizzle") {
            imagePath = <i class="fa-solid fa-cloud-rain"></i>;
          } else if (res.data.weather[0].main == "Mist") {
            imagePath = <i class="fa-solid fa-water"></i>;
          } else {
            imagePath = <i class="fa-solid fa-cloud" aria-hidden="true"></i>;
          }

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="enter city name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <i
              className="fa fa-search"
              aria-hidden="true"
              onClick={handleOnClick}
            ></i>
          </button>
        </div>
        <div className="winfo">
          <i aria-hidden="true">{data.image}</i>
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <i className="fa-solid fa-temperature-low"></i>
              <div>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <i className="fa-solid fa-wind"></i>
              <div>
                <p>{Math.round(data.speed)}km/hr</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
