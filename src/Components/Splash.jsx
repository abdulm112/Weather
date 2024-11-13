import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Splash = () => {
  const [weather, setWeather] = useState();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getRealWeather(params) {
    params.preventDefault();

    if (!state || !country) {
      return toast.error("All fields are required!");
    }

    try {
      setIsLoading(true);

      const base = `https://api.openweathermap.org/data/2.5/weather?q=${country},${state}&appid=ab380d33c3d0abee6e15c6f2de77337f`;
      const response = await fetch(base);
      if (response.ok) {
        const responseData = await response.json();
        setWeather(responseData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }

      // console.log(responseData.weather);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 max-sm:px-5">
       <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">

          Real Time Weather App
        </h1>

        {weather ? (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Your current location weather says:
            </h2>
            <span className="text-blue-500 text-xl">
              {weather.weather[0].description}
            </span>
            <h2 className="text-lg font-semibold text-gray-700 mt-4">
              You're checking weather from:
            </h2>
            <div className="flex justify-around items-center w-full">

            <span className="text-gray-500">{weather.sys.country}</span>
            <button className="text-green-500 px-5 py-2" onClick={()=>{window.location.href = "/"}}>Recheck</button>
            </div>
          </div>
        ) : (
          <form onSubmit={getRealWeather} className="flex flex-col gap-5">
            <input type="text" value={country} onChange={(e) => {setCountry(e.target.value);
            }}
            placeholder="Enter state e.g Kwara" className="border border-gray-300 outline-none rounded-lg p-2 "/>
            <input type="text" value={state} onChange={(e) => {setState(e.target.value);
            }}
              placeholder="Loc Govt e.g ilorin" className="border border-gray-300 outline-none rounded-lg p-2 "/>
            <button type="submit" className={`bg-blue-500 text-white rounded-lg p-2 ${isLoading ? "cursor-not-allowed": "cursor-pointer"}`}> {isLoading ? "Please wait .." : "Check Weather"}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Splash;
