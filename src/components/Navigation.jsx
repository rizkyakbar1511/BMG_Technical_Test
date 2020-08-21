import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import DesktopMenu from "./Menu/DesktopMenu";
import MobileMenu from "./Menu/MobileMenu";

export default function Navigation() {
  const [anchorEl, setAnchorEl] = useState(null);
  const pageSize = useWindowWidth();
  const classes = useStyles();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.root} position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container directon="row" alignItems="center">
            <Grid item xs md>
              <Typography variant="h6">
                <Link className={classes.navLink} to="/">
                  <span style={{ color: "#FF7314" }}>Kasumi</span>DB
                </Link>
              </Typography>
            </Grid>
            {pageSize > 1000 && (
              <DesktopMenu
                handleClick={handleClick}
                handleClose={handleClose}
                anchorEl={anchorEl}
                classes={classes}
              />
            )}
            {pageSize < 1000 && <MobileMenu />}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#22211F",
  },
  typography: {
    padding: theme.spacing(2),
  },
  navRightItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navMidItem: {
    display: "flex",
    justifyContent: "flex-start",
  },
  navItemWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 700,
  },
  navLink: {
    color: "#F4F4F4",
    textDecoration: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchResult: {
    width: 1280,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    position: "absolute",
    top: 64,
    right: "-25px",
    zIndex: 1000,
    overflow: "auto",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
