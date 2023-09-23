import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeandLocation from "./components/TimeandLocation";
import TemperatureandDetails from "./components/TemperatureandDetails";
import formatForecastWeather from "./services/hourly_daily";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";

function App() {
  const [query, setQuery] = useState({ q: "Chennai" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [weather2, setWeather2] = useState(null);

  // useEffect(() => {
  const fetchWeather = async () => {
    const message = query.q ? query.q : "current location.";
    toast.info("Fetching weather for " + message);
    await getFormattedWeatherData({ ...query, units }).then(async (data) => {
      toast.success(
        `Successfully fetched weather for ${data.name}, ${data.country}.`
      );
      setWeather(data);
      const data2 = await formatForecastWeather(data.lat, data.lon);
      console.log(data2);
      setWeather2(data2);
    });
  };

  useEffect(() => {
    fetchWeather();
    // fetchWeather();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, units]);

  // console.log(weather2.daily);

  const { daily, hourly } = { ...weather2 };
  console.log(hourly);

  // const formatBackground = () => {
  //   if (!weather) return "from-cyan-600 to-blue-600 ";
  //   const threshold = units === "metric" ? 27 : 60;
  //   if (weather.temp <= threshold) return "from-cyan-600 to-blue-600 ";

  //   return "from-orange-500 to-yellow-500";
  // };

  return (
    <>
      <div
        className=" bg-cover bg-center-center bg-no-repeat grid p-16 "
        style={{ backgroundImage: `url(${require("./Images/bg.jpg")})` }}
      >
        <div
          className={
            "  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-100 mx-auto mt-auto mb-auto py-6 px-32 bg-white bg-opacity-5 backdrop-blur-lg rounded drop-shadow-lg"
          }
          id="form"
        >
          <TopButtons setQuery={setQuery} />
          <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

          {weather && (
            <div>
              <TimeandLocation weather={weather} />
              <TemperatureandDetails weather={weather} />
              <Forecast title="Hourly Forecast" items={hourly} />
              <Forecast title="Daily Forecast" items={daily} />
            </div>
          )}
        </div>
        <ToastContainer autoClose={1000} theme="colored" newestOnTop={true} />
      </div>
    </>
  );
}

export default App;
