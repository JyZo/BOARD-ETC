import React, { PureComponent, useEffect } from "react";
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

const data = [
  {
    name: "24.1",
    승률: 52,
  },
  {
    name: "24.2",
    승률: 49,
  },
  {
    name: "24.3",
    승률: 51,
  },
  {
    name: "24.4",
    승률: 50,
  },
  {
    name: "24.5",
    승률: 55,
  },
];

const Winchart = () => {
  useEffect(() => {
    fetchData();
    onSubmit();
  }, []);

  const onSubmit = async () => {
    try {
      const response = await axios.get(
        `https://www.op.gg/champions/gangplank/trends`,
        { withCredentials: true }
      );

      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    console.log("fetch");
    try {
      const response = await axios.get(
        "https://www.op.gg/champions/gangplank/trends",
        { withCredentials: true }
      );
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
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
        {/* <Legend /> */}
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
