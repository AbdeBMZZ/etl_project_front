import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Typography, makeStyles } from "@material-ui/core";
interface DataPoint {
  "Transaction ID": number;
  "Transaction Date": string;
  Amount: number | string;
  "Merchant Name": string;
}

interface ChartData {
  name: string;
  value: number;
}

const useStyles = makeStyles(() => ({
  chartContainer: {
    padding: "1rem",
  },
}));

const Analytics: React.FC = () => {
  const classes = useStyles();

  const data: DataPoint[] = [
    {
      "Transaction ID": 123456,
      "Transaction Date": "2022-04-01",
      Amount: 60.0,
      "Merchant Name": "Acme Retail",
    },
    {
      "Transaction ID": 123457,
      "Transaction Date": "2022-04-01",
      Amount: 85.25,
      "Merchant Name": "XYZ Gas",
    },
    {
      "Transaction ID": 123458,
      "Transaction Date": "2022-04-02",
      Amount: 20.0,
      "Merchant Name": "Acme Retail",
    },
    {
      "Transaction ID": 123459,
      "Transaction Date": "2022-04-02",
      Amount: "---",
      "Merchant Name": "ABC Pharmacy",
    },
    {
      "Transaction ID": 123460,
      "Transaction Date": "2022-04-02",
      Amount: "---",
      "Merchant Name": "ABC Pharmacy",
    },
    {
      "Transaction ID": 123461,
      "Transaction Date": "2022-04-03",
      Amount: 40.0,
      "Merchant Name": "Acme Retail",
    },
    {
      "Transaction ID": 123461,
      "Transaction Date": "2022-04-03",
      Amount: 40.0,
      "Merchant Name": "---",
    },
  ];

  // Prepare chart data by grouping transactions by merchant name
  const chartData: ChartData[] = data.reduce(
    (acc: ChartData[], curr: DataPoint) => {
      const existingIndex = acc.findIndex(
        (item) => item.name === curr["Merchant Name"]
      );
      if (existingIndex !== -1) {
        acc[existingIndex].value +=
          typeof curr.Amount === "number" ? curr.Amount : 0;
      } else {
        acc.push({
          name: curr["Merchant Name"],
          value: typeof curr.Amount === "number" ? curr.Amount : 0,
        });
      }
      return acc;
    },
    []
  );

  return (
    <div className={classes.chartContainer}>
      <Typography variant="h6">Merchant-wise Transactions</Typography>
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Analytics;
