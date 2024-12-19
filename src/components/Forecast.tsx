import { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import LoaderWithMessages from "./Loader";

type WeatherCondition = {
  icon_url: string;
  description: string;
};

type WeatherData = {
  city: string;
  country: string;
  temperature: {
    current: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  condition: WeatherCondition;
};

type ForecastDay = {
  time: number;
  temperature: {
    minimum: number;
    maximum: number;
  };
  condition: WeatherCondition;
};

type ForecastProps = {
  weather: WeatherData;
};

const Forecast: React.FC<ForecastProps> = ({ weather }) => {
  const data = weather;
  const [loading, setLoading] = useState(true); // Manage loading state
  const [forecastData] = useState<ForecastDay[]>([
    /* Dummy data */
  ]);

  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit

  const formatDay = (dateString: number): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  const toggleTemperatureUnit = (): void => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature: number): number => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature: number): number => {
    return isCelsius
      ? Math.round(temperature)
      : convertToFahrenheit(temperature);
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.city}, <span>{data.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>Predicted weather conditions!</span>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      {loading && (
        <LoaderWithMessages />
      )}
      {!loading && (
        <>
          <div className="temp">
            {data.condition.icon_url && (
              <ReactAnimatedWeather icon="RAIN" size={140} />
            )}
            {renderTemperature(data.temperature.current)}
            <sup className="temp-deg" onClick={toggleTemperatureUnit}>
              {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
            </sup>
          </div>

          <div className="temp">
            290
            <sup className="temp-deg" onClick={toggleTemperatureUnit}>
              AQI
            </sup>
          </div>
          <p className="weather-des">{data.condition.description}</p>
          <div className="weather-info">
            <div className="col">
              <ReactAnimatedWeather icon="WIND" size={40} />
              <div>
                <p className="wind">{data.wind.speed}m/s</p>
                <p>Wind speed</p>
              </div>
            </div>
            <div className="col">
              <ReactAnimatedWeather icon="RAIN" size={40} />
              <div>
                <p className="humidity">{data.temperature.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Forecast;
