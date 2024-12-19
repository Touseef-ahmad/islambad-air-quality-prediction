import ReactAnimatedWeather from "react-animated-weather";
import { WeatherPredictionResponse } from "../types";

type ForecastProps = {
  isLoading: boolean;
  weather: WeatherPredictionResponse;
};

const Forecast: React.FC<ForecastProps> = ({ weather, isLoading }) => {
  const data = weather;

  const getCurrentDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  const truncateAfterDecimal = (value: string): string => {
    return value.split(".")[0];
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          Islamabad, <span>Pakistan</span>
        </h2>
      </div>
      <div className="date">
        <span>Predicted weather conditions!</span>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      {!isLoading && (
        <>
          <div className="temp">
            <ReactAnimatedWeather icon="PARTLY_CLOUDY_DAY" size={140} />
            {truncateAfterDecimal(data.predicted_temperature)}
            <sup className="temp-deg">°C</sup>
          </div>

          <div className="temp">
          <ReactAnimatedWeather icon="FOG" size={140} />
            To be done...
            <sup className="temp-deg">AQI</sup>
          </div>
          <div className="weather-info">
    
            <div className="col">
              <div>
                <p className="humidity">
                  {truncateAfterDecimal(data.avg_humidity)}%
                </p>
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
