import { useState, useEffect } from "react";
import Forecast from "./components/Forecast";

import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { WeatherData } from "./types";

type WeatherState = {
  loading: boolean;
  data: WeatherData | null;
  error: boolean;
};

function App() {
  const [weather, setWeather] = useState<WeatherState>({
    loading: true,
    data: null,
    error: false,
  });

  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const fetchDummyData = async () => {
      const dummyData: WeatherData = {
        city: "Islamabad",
        country: "Pakistan",
        temperature: {
          current: 25,
          humidity: 60,
        },
        wind: {
          speed: 5,
        },
        condition: {
          icon_url: "https://dummyimage.com/100x100/000/fff&text=Icon",
          description: "Sunny",
        },
      };

      try {
        setTimeout(() => {
          setWeather({ loading: false, data: dummyData, error: false });
        }, 1000); // Simulating a network delay
      } catch (error) {
        setWeather({ loading: false, data: null, error: true });
        console.log("error", error);
      }
    };

    fetchDummyData();
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="App">
      <div className="date-picker">
        <label htmlFor="date">Select Date: </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry city not found, please try again.
            </span>
          </span>
        </>
      )}

      {weather.data && weather.data.condition && (
        // Forecast component
        <Forecast weather={weather.data} />
      )}
    </div>
  );
}

export default App;
