import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";

import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoaderWithMessages from "./components/Loader";
import { WeatherPredictionResponse } from "./types";

const useGetWeatherPrediction = () => {
  const [data, setData] = useState<WeatherPredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predictWeather = (date: string) => {
    setIsLoading(true);
    setError(null);

    // Helper function to create a delay
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    Promise.all([
      fetch("http://54.174.253.200:8000/predict-temperature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ date }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        }),
      delay(4000), // Minimum wait of 4 seconds
    ])
      .then(([responseData]) => {
        setData(responseData as WeatherPredictionResponse);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return { data, isLoading, error, predictWeather };
};


function App() {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  });

  const { data, isLoading, predictWeather } = useGetWeatherPrediction();

  useEffect(() => {
    predictWeather(selectedDate);
  }
  , [selectedDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="App">
      <div className="date-picker">
        <label className="date" htmlFor="date">Select Date: </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {isLoading && <LoaderWithMessages />}

      {data && (
        <Forecast isLoading={isLoading} weather={data} />
      )}
    </div>
  );
}

export default App;
