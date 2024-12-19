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