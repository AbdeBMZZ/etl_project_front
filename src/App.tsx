import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@material-ui/core";
import { Home, Inbox, Mail } from "@material-ui/icons";

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

const App: React.FC = () => {
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
      <RouterProvider router={router} />
    </>
  );
};

export default App;
