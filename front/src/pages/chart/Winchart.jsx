import React, { PureComponent, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Axios from "../../utils/Axios";
import axios from "axios";

const Winchart = ({ selectedCountry }) => {
  const [winRate, setWinRate] = useState([]);

  useEffect(() => {
    axios.get("/dummy/winrate.json").then((res) => {
      const dataTemp = res.data.filter((data) => {
        return data.country === selectedCountry;
      });
      setWinRate([...dataTemp]);
    });
  }, [selectedCountry]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={winRate}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="version" />
        <YAxis
          tickFormatter={(tick) => {
            return `${tick}%`;
          }}
          domain={[40, 60]}
        />
        <Tooltip
          formatter={(tick) => {
            return `${tick}%`;
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="승률"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Winchart;
