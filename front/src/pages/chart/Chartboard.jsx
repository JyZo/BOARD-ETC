import React, { useEffect, useState } from "react";
import Pickchart from "./pickchart";
import Winchart from "./Winchart";
import Banchart from "./Banchart";

const Chartboard = () => {
  const countries = ["Global", "Korea", "Europe", "Japan"];
  const [selectedCountry, setSelectedCountry] = useState("Global");

  return (
    <>
      <div className="flex items-center pt-5">
        <select
          onChange={(e) => setSelectedCountry(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="min-h-screen mx-auto px-2">
        <div className="pt-10 pb-10">
          <span>승률</span>
          <Winchart selectedCountry={selectedCountry} />
        </div>
        <div className="pt-10 pb-10">
          <span>픽률</span>
          <Pickchart selectedCountry={selectedCountry} />
        </div>
        <div className="pt-10 pb-10">
          <span>밴율</span>
          <Banchart selectedCountry={selectedCountry} />
        </div>
      </div>
    </>
  );
};

export default Chartboard;
