import React from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Link, Outlet } from "react-router-dom";
type Props = {};

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#ffffff",
    color: "#000000",
    boxShadow: "none",
  },
  drawer: {
    width: "240px",
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  listItemIcon: {
    color: "#000000",
  },
  listItemText: {
    color: "#000000",
  },
}));

function Nav({}: Props) {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box className={classes.drawer}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6">ETL Tool</Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Link to="/csv-upload" style={{ textDecoration: "none" }}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}>
                <FileUploadIcon />
              </ListItemIcon>
              <ListItemText
                primary="Upload a CSV file"
                className={classes.listItemText}
              />
            </ListItem>
          </Link>
          <Link to="/transformation-rules" style={{ textDecoration: "none" }}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}>
                <AlignHorizontalLeftIcon />
              </ListItemIcon>
              <ListItemText
                primary="Transformation Rules"
                className={classes.listItemText}
              />
            </ListItem>
          </Link>
          <Link to="/analytics" style={{ textDecoration: "none" }}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon}>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Transformed Data"
                className={classes.listItemText}
              />
            </ListItem>
          </Link>
        </List>
      </Box>
      <Box
        style={{
          paddingLeft: "64px",
          paddingTop: "64px",
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}

export default Nav;
