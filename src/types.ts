export type WeatherCondition = {
    icon_url: string;
    description: string;
};
  
export type WeatherData = {
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


export type WeatherPredictionResponse = {
    date: string; // The date of the prediction in YYYY-MM-DD format
    predicted_temperature: string; // Predicted temperature with unit (e.g., "21.63 °C")
    avg_humidity: string; // Average humidity with unit (e.g., "50.56 %")
    avg_no2: string; // Average NO2 levels with unit (e.g., "17.80 µg/m³")
    avg_so2: string; // Average SO2 levels with unit (e.g., "22.73 µg/m³")
    avg_pm25: string; // Average PM2.5 levels with unit (e.g., "99.18 µg/m³")
  };
  
  
export type ForecastDay = {
    time: number;
    temperature: {
        minimum: number;
        maximum: number;
    };
    condition: WeatherCondition;
};
  
export type ForecastProps = {
    weather: {
        data: WeatherData;
    };
};