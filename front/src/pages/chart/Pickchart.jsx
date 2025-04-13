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
import axios from "axios";

const Pickchart = ({ selectedCountry }) => {
  const [pickRate, setPickRate] = useState([]);

  useEffect(() => {
    axios.get("/dummy/pickrate.json").then((res) => {
      const dataTemp = res.data.filter((data) => {
        return data.country === selectedCountry;
      });
      setPickRate([...dataTemp]);
    });
  }, [selectedCountry]);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={pickRate}
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
          domain={[0, 10]}
        />
        <Tooltip
          formatter={(tick) => {
            return `${tick}%`;
          }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="픽률"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Pickchart;
