import React from "react";
import Pickchart from "./pickchart";
import Winchart from "./Winchart";
import Banchart from "./Banchart";

const Chartboard = () => {
  return (
    <>
      <div className="min-h-screen mx-auto px-2">
        <div className="pt-10 pb-10">
          <span>승률</span>
          <Winchart />
        </div>
        <div className="pt-10 pb-10">
          <span>픽률</span>
          <Pickchart />
        </div>
        <div className="pt-10 pb-10">
          <span>밴율</span>
          <Banchart />
        </div>
      </div>
    </>
  );
};

export default Chartboard;
