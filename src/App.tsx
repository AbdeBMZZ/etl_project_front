import React from "react";

import { Typography } from "@mui/material";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import FileUploader from "./components/FileUploader";
import Nav from "./components/Nav";
import TransformationRules from "./components/TransformationRules";
import { AppContext } from "./context/AppContext";
import { ITableData } from "./lib/interfaces/ITableData";
import { ITransformationRule } from "./lib/interfaces/ITransformationRule";

const App: React.FC = () => {
  const [data, setData] = React.useState<ITableData>({
    headers: [],
    rows: [],
    message: "",
    csv_file_ID: 0,
  });

  const [transformedData, setTransformedData] = React.useState<ITableData>({
    headers: [],
    rows: [],
    message: "",
    csv_file_ID: 0,
  });

  const [TransformationRulesData, setTransformationRulesData] = React.useState<
    ITransformationRule[]
  >([]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Nav />}>
        <Route path="csv-upload" element={<FileUploader />} />
        <Route path="transformation-rules" element={<TransformationRules />} />
        <Route path="analytics" element={<Typography>Analytics</Typography>} />
      </Route>
    )
  );

  return (
    <>
      <AppContext.Provider
        value={{
          data,
          setData,
          transformedData,
          setTransformedData,
          TransformationRulesData,
          setTransformationRulesData,
        }}
      >
        <RouterProvider router={router} />
      </AppContext.Provider>
    </>
  );
};

export default App;
