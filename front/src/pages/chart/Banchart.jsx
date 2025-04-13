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

const Banchart = ({ selectedCountry }) => {
  const [banRate, setBanRate] = useState([]);

  useEffect(() => {
    axios.get("/dummy/banrate.json").then((res) => {
      const dataTemp = res.data.filter((data) => {
        return data.country === selectedCountry;
      });
      setBanRate([...dataTemp]);
    });
  }, [selectedCountry]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={banRate}
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
          domain={[5, 0]}
        />
        <Tooltip
          formatter={(tick) => {
            return `${tick}%`;
          }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="밴율"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Banchart;
