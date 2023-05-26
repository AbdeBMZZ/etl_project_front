import React, { useEffect, useState } from "react";
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
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Box, CircularProgress, Divider } from "@mui/material";
import { ITransformationRule } from "../lib/interfaces/ITransformationRule";
import { UseQueryResult, useQuery } from "react-query";
import { getHistory } from "../services/rulesHandler";

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

  const [rulesData, setRulesData] = useState<ITransformationRule[]>([]);

  const [chartData, setChartData] = useState<DataPoint[][]>([]);

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const {
    status,
    error,
    data: apiRulesData,
  }: UseQueryResult<ITransformationRule[], Error> = useQuery<
    ITransformationRule[],
    Error
  >("api/transformation-rules");

  useEffect(() => {
    if (status === "success" && apiRulesData) {
      console.log(apiRulesData);
      setRulesData(apiRulesData);
    }
  }, [status, error, apiRulesData]);

  const handleHistory = async (rule: ITransformationRule) => {
    setSelectedValue(rule.name);
    const res = await getHistory(rule.id);
    setChartData(res.map((item: any) => item.data));
  };

  return (
    <div className={classes.chartContainer}>
      <Typography
        variant="h6"
        style={{
          textAlign: "center",
        }}
      >
        Merchant-wise Transactions
      </Typography>

      <Divider light />

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <Typography
          variant="body1"
          style={{
            flex: 0.6,
          }}
        >
          Select a csv transformation rule to view the transaction history
        </Typography>
        <FormControl
          style={{
            flex: 0.2,
          }}
        >
          <Select
            displayEmpty
            renderValue={() =>
              selectedValue ? selectedValue : "Select an option"
            }
            labelId="select-label"
            onChange={(e) => {
              handleHistory(e.target.value);
            }}
          >
            {rulesData.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6">Merchant-wise Transactions</Typography>

      <Box
        style={{
          marginTop: "2rem",
          display: "grid",
          placeItems: "center",
          height: "50vh",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {chartData.length > 0 &&
          chartData.map((chart, index) => (
            <div key={index}>
              <Typography variant="h6">{chart["Merchant Name"]}</Typography>
              <BarChart
                width={400}
                height={300}
                data={chart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Transaction Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Amount" fill="#8884d8" />
              </BarChart>
            </div>
          ))}
      </Box>
    </div>
  );
};

export default Analytics;
